#!/usr/bin/env python3
"""Trial Gap Explorer: pull sex-disaggregated enrollment from ClinicalTrials.gov.

For a set of conditions whose affected populations are predominantly female,
pull every interventional study with posted results and read the baseline
"Sex: Female, Male" measure. Aggregate per condition:

  - total interventional trials registered (the denominator)
  - trials with posted results
  - trials whose baseline sex measure we could parse
  - participants total / female across parsed trials

Writes:
  data/trial-gap/trial_gap_raw.json           (per-trial rows, for checking)
  projects/trial-gap-explorer/public/data.json (aggregates the page reads)

API: https://clinicaltrials.gov/api/v2/studies (public domain, no key).
Run from the repo root: python3 data/trial-gap/pull_trials.py
"""

import json
import time
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

API = "https://clinicaltrials.gov/api/v2/studies"
REPO = Path(__file__).resolve().parents[2]

# Female share of the affected population, from published reviews.
# These are approximations of commonly cited sex ratios; each source is
# shown on the page. prev_source_label / prev_source_url cite the review.
CONDITIONS = [
    {
        "slug": "sle",
        "name": "Lupus (SLE)",
        "query": "systemic lupus erythematosus",
        "female_prev_share": 0.90,
        "prev_note": "≈9:1 female-to-male",
        "prev_source_label": "Rees et al., Rheumatology 2017 (global epidemiology review)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/28859312/",
    },
    {
        "slug": "sjogren",
        "name": "Sjögren's syndrome",
        "query": "sjogren syndrome",
        "female_prev_share": 0.91,
        "prev_note": "≈10:1 female-to-male",
        "prev_source_label": "Qin et al., Ann Rheum Dis 2015 (meta-analysis)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/24938285/",
    },
    {
        "slug": "hashimoto",
        "name": "Hashimoto's thyroiditis",
        "query": "hashimoto thyroiditis",
        "female_prev_share": 0.85,
        "prev_note": "≈5–10:1 female-to-male",
        "prev_source_label": "McLeod & Cooper, Endocrine 2012 (epidemiology review)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/22417564/",
    },
    {
        "slug": "graves",
        "name": "Graves' disease",
        "query": "graves disease",
        "female_prev_share": 0.80,
        "prev_note": "≈4–5:1 female-to-male",
        "prev_source_label": "Smith & Hegedüs, NEJM 2016 (review)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/27797318/",
    },
    {
        "slug": "ra",
        "name": "Rheumatoid arthritis",
        "query": "rheumatoid arthritis",
        "female_prev_share": 0.70,
        "prev_note": "≈2–3:1 female-to-male",
        "prev_source_label": "Cross et al., Ann Rheum Dis 2014 (Global Burden of Disease)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/24550173/",
    },
    {
        "slug": "ms",
        "name": "Multiple sclerosis",
        "query": "multiple sclerosis",
        "female_prev_share": 0.75,
        "prev_note": "≈3:1 female-to-male",
        "prev_source_label": "Walton et al., Mult Scler 2020 (Atlas of MS)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/33174475/",
    },
    {
        "slug": "migraine",
        "name": "Migraine",
        "query": "migraine",
        "female_prev_share": 0.75,
        "prev_note": "≈3:1 female-to-male",
        "prev_source_label": "Lipton et al., Neurology 2007 (AMPP study)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/17261680/",
    },
    {
        "slug": "fibromyalgia",
        "name": "Fibromyalgia",
        "query": "fibromyalgia",
        "female_prev_share": 0.80,
        "prev_note": "≈2:1 in surveys; ~80% of the diagnosed — the share used here",
        "prev_source_label": "Wolfe et al., PLoS ONE 2018 (diagnosis and sex)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/30212526/",
    },
    {
        "slug": "pots",
        "name": "POTS",
        "query": "postural orthostatic tachycardia syndrome",
        "female_prev_share": 0.85,
        "prev_note": "≈80–90% of the diagnosed",
        "prev_source_label": "Shaw et al., J Intern Med 2019 (registry survey)",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/30861229/",
    },
    {
        "slug": "mecfs",
        "name": "ME/CFS",
        "query": "chronic fatigue syndrome",
        "female_prev_share": 0.75,
        "prev_note": "≈3:1 female-to-male",
        "prev_source_label": "Institute of Medicine, 2015 report",
        "prev_source_url": "https://pubmed.ncbi.nlm.nih.gov/25695122/",
    },
]

INTERVENTIONAL = "AREA[StudyType]INTERVENTIONAL"
FIELDS = ",".join([
    "protocolSection.identificationModule.nctId",
    "resultsSection.baselineCharacteristicsModule",
])


def get(params, attempts=8):
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "herada-trial-gap/1.0 (joinherada.com)"})
    for i in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as err:
            if i == attempts - 1:
                raise
            print(f"   retry {i + 1} after {type(err).__name__}")
            time.sleep(2 * (i + 1))


def count_total(condition_query):
    data = get({
        "query.cond": condition_query,
        "query.term": INTERVENTIONAL,
        "countTotal": "true",
        "pageSize": 1,
        "fields": "protocolSection.identificationModule.nctId",
    })
    return data.get("totalCount", 0)


def iter_results_studies(condition_query):
    token = None
    while True:
        params = {
            "query.cond": condition_query,
            "query.term": INTERVENTIONAL,
            "aggFilters": "results:with",
            "countTotal": "true",
            "pageSize": 50,
            "fields": FIELDS,
        }
        if token:
            params["pageToken"] = token
        data = get(params)
        for study in data.get("studies", []):
            yield study, data.get("totalCount")
        token = data.get("nextPageToken")
        if not token:
            break
        time.sleep(0.3)


def parse_sex(study):
    """Return (female, male) totals from the baseline sex measure, or None."""
    module = study.get("resultsSection", {}).get("baselineCharacteristicsModule")
    if not module:
        return None
    groups = module.get("groups", [])
    total_ids = [g["id"] for g in groups if g.get("title", "").strip().lower() == "total"]
    for measure in module.get("measures", []):
        title = measure.get("title", "").strip().lower()
        if title not in ("sex: female, male", "sex/gender, customized: sex: female, male"):
            if not title.startswith("sex: female, male"):
                continue
        counts = {"female": 0, "male": 0}
        found = False
        for cls in measure.get("classes", []):
            for cat in cls.get("categories", []):
                cat_title = cat.get("title", "").strip().lower()
                if cat_title not in counts:
                    continue
                for m in cat.get("measurements", []):
                    gid = m.get("groupId")
                    if total_ids and gid not in total_ids:
                        continue
                    try:
                        counts[cat_title] += int(float(m.get("value", "0")))
                        found = True
                    except (TypeError, ValueError):
                        pass
        if found:
            return counts["female"], counts["male"]
    return None


def pull_condition(cond):
    """Pull one condition, with a cache file so crashed runs resume."""
    cache = REPO / "data" / "trial-gap" / "cache" / f"{cond['slug']}.json"
    if cache.exists():
        cached = json.loads(cache.read_text())
        print(f"   (cached) {cached['total_trials']} trials, {cached['with_results']} with results")
        return cached
    total_trials = count_total(cond["query"])
    with_results = 0
    rows = []
    for study, total_count in iter_results_studies(cond["query"]):
        with_results = total_count or with_results
        nct = (study.get("protocolSection", {})
                    .get("identificationModule", {})
                    .get("nctId", ""))
        sex = parse_sex(study)
        row = {"condition": cond["slug"], "nctId": nct, "parsed": bool(sex)}
        if sex:
            row["female"], row["male"] = sex
        rows.append(row)
    result = {"total_trials": total_trials, "with_results": with_results, "rows": rows}
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps(result))
    return result


def main():
    pulled = date.today().isoformat()
    raw_rows = []
    aggregates = []

    for cond in CONDITIONS:
        print(f"== {cond['name']}")
        data = pull_condition(cond)
        total_trials = data["total_trials"]
        with_results = data["with_results"]
        parsed = 0
        female = 0
        enrolled = 0
        for row in data["rows"]:
            if row.get("parsed"):
                parsed += 1
                female += row["female"]
                enrolled += row["female"] + row["male"]
            raw_rows.append(row)
        aggregates.append({
            "slug": cond["slug"],
            "name": cond["name"],
            "query": cond["query"],
            "femalePrevShare": cond["female_prev_share"],
            "prevNote": cond["prev_note"],
            "prevSourceLabel": cond["prev_source_label"],
            "prevSourceUrl": cond["prev_source_url"],
            "trialsTotal": total_trials,
            "trialsWithResults": with_results,
            "trialsParsed": parsed,
            "participants": enrolled,
            "participantsFemale": female,
            "femaleEnrollShare": round(female / enrolled, 4) if enrolled else None,
        })
        print(f"   {total_trials} interventional trials, {with_results} with results, "
              f"{parsed} parsed, {enrolled} participants ({female} female)")
        time.sleep(0.5)

    out_raw = REPO / "data" / "trial-gap" / "trial_gap_raw.json"
    out_raw.write_text(json.dumps({"pulled": pulled, "rows": raw_rows}, indent=1))

    out_page = REPO / "projects" / "trial-gap-explorer" / "public" / "data.json"
    out_page.parent.mkdir(parents=True, exist_ok=True)
    out_page.write_text(json.dumps({
        "pulled": pulled,
        "source": "ClinicalTrials.gov API v2, interventional studies with posted results",
        "sourceUrl": "https://clinicaltrials.gov/data-api/api",
        "conditions": aggregates,
    }, indent=1))
    print(f"\nWrote {out_raw} and {out_page}")


if __name__ == "__main__":
    main()
