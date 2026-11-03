#!/usr/bin/env python3
"""Build the Procedure Pay Gap Explorer's data from the CMS physician fee schedule.

Downloads one release of the CMS "PFS Relative Value File" (public domain,
https://www.cms.gov/medicare/payment/fee-schedules/physician/pfs-relative-value-files),
reads the national RVU table it contains, joins it to the matched pairs in
pairs.json and writes:

  projects/pay-gap-explorer/public/pay-gap.json   what the page reads
  data/pay-gap/pfs_rows.json                      the raw rows for every code used, for checking

Run from the repository root:

  python3 data/pay-gap/pull_pfs.py                 # latest 2026 release listed below
  python3 data/pay-gap/pull_pfs.py --release rvu26a
  python3 data/pay-gap/pull_pfs.py --zip path/to/rvu26d.zip   # a file you already have

The zip is cached in data/pay-gap/cache/ (gitignored). Standard library only.
"""
import argparse, csv, datetime, io, json, os, re, sys, urllib.request, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HERE = os.path.join(ROOT, "data", "pay-gap")
OUT_PAGE = os.path.join(ROOT, "projects", "pay-gap-explorer", "public", "pay-gap.json")
OUT_ROWS = os.path.join(HERE, "pfs_rows.json")
DEFAULT_RELEASE = "rvu26d"   # October 2026 release of the 2026 schedule
CMS_ZIP = "https://www.cms.gov/files/zip/{release}.zip"
CMS_PAGE = "https://www.cms.gov/medicare/payment/fee-schedules/physician/pfs-relative-value-files/{release}"

# Column positions in the PPRRVU csv (the header row that starts with HCPCS).
COL = {"code": 0, "mod": 1, "desc": 2, "status": 3, "work": 5, "nonfac_pe": 6, "nonfac_na": 7,
       "fac_pe": 8, "fac_na": 9, "mp": 10, "nonfac_total": 11, "fac_total": 12, "global": 14, "cf": 25}


def fetch_zip(release, zip_path):
    if zip_path:
        return open(zip_path, "rb").read(), os.path.basename(zip_path)
    cache = os.path.join(HERE, "cache")
    os.makedirs(cache, exist_ok=True)
    cached = os.path.join(cache, release + ".zip")
    if os.path.exists(cached):
        return open(cached, "rb").read(), release + ".zip"
    url = CMS_ZIP.format(release=release)
    req = urllib.request.Request(url, headers={"User-Agent": "herada-pay-gap-explorer/1.0 (data pull; joinherada.com)"})
    with urllib.request.urlopen(req, timeout=180) as resp:
        data = resp.read()
        final = resp.geturl()
    open(cached, "wb").write(data)
    return data, os.path.basename(final)


def read_table(zip_bytes):
    """Return (rows_by_code, meta) from the non-QPP national RVU csv in the zip."""
    zf = zipfile.ZipFile(io.BytesIO(zip_bytes))
    names = [n for n in zf.namelist() if re.search(r"PPRRVU.*\.csv$", n, re.I)]
    pick = [n for n in names if "nonqpp" in n.lower()] or [n for n in names if "qpp" not in n.lower()] or names
    if not pick:
        sys.exit("no PPRRVU csv in the zip; members: " + ", ".join(zf.namelist()))
    member = pick[0]
    text = zf.read(member).decode("utf-8", errors="replace")
    reader = csv.reader(io.StringIO(text))
    meta = {"member": member, "title": None, "released": None}
    rows = {}
    header_seen = False
    for r in reader:
        if not header_seen:
            joined = " ".join(r)
            if "Relative Value File" in joined and not meta["title"]:
                meta["title"] = next(c for c in r if "Relative Value File" in c).strip()
            m = re.search(r"RELEASED\s+(\d{2})/(\d{2})/(\d{4})", joined)
            if m:
                meta["released"] = "%s-%s-%s" % (m.group(3), m.group(1), m.group(2))
            if r and r[0].strip() == "HCPCS":
                header_seen = True
            continue
        if len(r) <= COL["cf"] or r[COL["mod"]].strip():
            continue          # modifier rows (TC/26/53) are not whole-procedure values
        code = r[COL["code"]].strip()
        rows[code] = {
            "code": code, "cms_short_descriptor": r[COL["desc"]].strip(), "status": r[COL["status"]].strip(),
            "work_rvu": float(r[COL["work"]]), "nonfac_pe_rvu": float(r[COL["nonfac_pe"]]),
            "nonfac_na": r[COL["nonfac_na"]].strip() == "NA", "fac_pe_rvu": float(r[COL["fac_pe"]]),
            "fac_na": r[COL["fac_na"]].strip() == "NA", "mp_rvu": float(r[COL["mp"]]),
            "nonfac_total_rvu": float(r[COL["nonfac_total"]]), "fac_total_rvu": float(r[COL["fac_total"]]),
            "global_days": r[COL["global"]].strip(), "conversion_factor": float(r[COL["cf"]]),
        }
    return rows, meta


def side(rows, spec, cf, missing):
    codes = spec["codes"]
    found = [rows[c] for c in codes if c in rows]
    for c in codes:
        if c not in rows:
            missing.append(c)
    if not found:
        return None

    def mean(key):
        return round(sum(x[key] for x in found) / len(found), 4)
    nonfac_ok = all(not x["nonfac_na"] for x in found)
    out = {
        "codes": codes, "plain": spec["plain"],
        "cms_short_descriptors": [x["cms_short_descriptor"] for x in found],
        "status": sorted(set(x["status"] for x in found)),
        "global_days": sorted(set(x["global_days"] for x in found)),
        "work_rvu": mean("work_rvu"), "mp_rvu": mean("mp_rvu"), "fac_pe_rvu": mean("fac_pe_rvu"),
        "fac_total_rvu": mean("fac_total_rvu"),
        "fac_payment": round(mean("fac_total_rvu") * cf, 2),
        "nonfac_total_rvu": mean("nonfac_total_rvu") if nonfac_ok else None,
        "nonfac_payment": round(mean("nonfac_total_rvu") * cf, 2) if nonfac_ok else None,
        "averaged": len(found) > 1,
    }
    return out


def gap(f, m):
    return None if f is None or m is None or not m else round((f - m) / m, 4)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--release", default=DEFAULT_RELEASE, help="CMS release name, e.g. rvu26a, rvu26d")
    ap.add_argument("--zip", help="use this local zip instead of downloading")
    a = ap.parse_args()

    pairs = json.load(open(os.path.join(HERE, "pairs.json"), encoding="utf-8"))
    zip_bytes, zip_name = fetch_zip(a.release, a.zip)
    rows, meta = read_table(zip_bytes)
    cfs = sorted(set(r["conversion_factor"] for r in rows.values()))
    if len(cfs) != 1:
        sys.exit("expected one conversion factor in the file, found %s" % cfs)
    cf = cfs[0]

    missing = []
    out_pairs = []
    used = set()
    for p in pairs["pairs"]:
        f = side(rows, p["female"], cf, missing)
        m = side(rows, p["male"], cf, missing)
        used.update(p["female"]["codes"]); used.update(p["male"]["codes"])
        if not f or not m:
            print("SKIPPED %s: a code is missing from the file" % p["id"], file=sys.stderr)
            continue
        out_pairs.append({
            "id": p["id"], "group": p["group"], "match": p["match"], "label": p["label"],
            "note": p.get("note"), "female": f, "male": m,
            "gap_work": gap(f["work_rvu"], m["work_rvu"]),
            "gap_fac_payment": gap(f["fac_payment"], m["fac_payment"]),
            "gap_nonfac_payment": gap(f["nonfac_payment"], m["nonfac_payment"]),
            "global_mismatch": f["global_days"] != m["global_days"],
        })
    if missing:
        print("codes not found in %s: %s" % (meta["member"], ", ".join(sorted(set(missing)))), file=sys.stderr)

    today = datetime.date.today().isoformat()
    page = {
        "title": pairs["title"], "lede": pairs["lede"], "status": pairs["status"], "compiled_by": pairs["compiled_by"],
        "as_of": today, "groups": pairs["groups"], "literature": pairs["literature"],
        "source": {
            "name": meta["title"] or "CMS National Physician Fee Schedule Relative Value File",
            "release": a.release.upper(), "file": zip_name, "table": meta["member"], "released": meta["released"],
            "url": CMS_PAGE.format(release=a.release), "conversion_factor": cf,
            "conversion_factor_note": "Non-qualifying APM participant conversion factor for 2026; qualifying participants use a factor about half a percent higher. Payments here are national amounts: RVUs times the conversion factor, before geographic adjustment.",
            "payment_formula": "payment = (work RVU + practice-expense RVU + malpractice RVU) x conversion factor, with every geographic index set to 1",
        },
        "pairs": out_pairs,
    }
    os.makedirs(os.path.dirname(OUT_PAGE), exist_ok=True)
    json.dump(page, open(OUT_PAGE, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    json.dump({"source": page["source"], "pulled": today, "rows": [rows[c] for c in sorted(used) if c in rows]},
              open(OUT_ROWS, "w", encoding="utf-8"), indent=1, ensure_ascii=False)

    print("%s (%s, released %s), conversion factor %s" % (page["source"]["name"], meta["member"], meta["released"], cf))
    print("%-30s %-6s %7s %7s %7s   %9s %9s %7s  %s" % ("pair", "group", "F work", "M work", "gap", "F fac $", "M fac $", "gap", "global F/M"))
    for p in out_pairs:
        print("%-30s %-6s %7.2f %7.2f %6.0f%%   %9.2f %9.2f %6.0f%%  %s/%s%s" % (
            p["id"][:30], p["group"][:6], p["female"]["work_rvu"], p["male"]["work_rvu"], p["gap_work"] * 100,
            p["female"]["fac_payment"], p["male"]["fac_payment"], p["gap_fac_payment"] * 100,
            "+".join(p["female"]["global_days"]), "+".join(p["male"]["global_days"]), "  <- global differs" if p["global_mismatch"] else ""))
    print("wrote %s and %s" % (os.path.relpath(OUT_PAGE, ROOT), os.path.relpath(OUT_ROWS, ROOT)))


if __name__ == "__main__":
    main()
