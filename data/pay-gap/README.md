# Procedure pay gap data

What Medicare assigns to matched procedures on female and male anatomy,
from the public physician fee schedule. Feeds the Procedure Pay Gap
Explorer (`projects/pay-gap-explorer/`).

## Source

- **CMS PFS Relative Value Files**, National Physician Fee Schedule
  Relative Value File (the `PPRRVU` table). US government work, public
  domain. https://www.cms.gov/medicare/payment/fee-schedules/physician/pfs-relative-value-files
- **Release used:** RVU26D, the October 2026 release of the 2026 schedule
  (released 2026-08-26), non-QPP table. `pull_pfs.py --release rvu26a`
  rebuilds from the January release instead.
- **Conversion factor:** read from the file (33.4009 for 2026, the
  non-qualifying APM participant factor). Payments on the page are
  national amounts: total RVU times the conversion factor, with every
  geographic index set to 1.
- CPT codes and descriptors are copyright of the American Medical
  Association; the page shows codes plus Herada's plain-language labels,
  and the CMS short descriptors are kept in `pfs_rows.json` for checking.

## The pairs

`pairs.json` is the hand-edited source of truth. Each pair has a female
and a male side (one CPT code each, or two codes averaged where the
published analysis did that), a plain-language label, a `group` and a
`match` strength:

- `same`: one operation whose CPT code names the sex (urethra and sling
  codes). Same specialty, same setting, same operation.
- `published`: the 12 pairs of Goff, Muntz and Cain (1997) as re-used by
  Polan and Barber (2021). Matched by the original authors.
- `proposed`: Herada's own anatomically matched pairs, each with a
  `strong` or `moderate` match and the reason. **Not yet reviewed by a
  clinician.**
- `popular`: a comparison that circulates but is not a fair pair
  (vasectomy vs. laparoscopic tubal sterilization), shown so the
  mismatch is visible.

`literature` lists the four published analyses the page cites, with
PMIDs and DOIs checked against PubMed on 2026-11-03.

## Rebuilding

From the repository root:

```
python3 data/pay-gap/pull_pfs.py
```

Downloads the zip into `cache/` (gitignored), reads the table, joins it
to `pairs.json`, and writes `projects/pay-gap-explorer/public/pay-gap.json`
(what the page reads) and `data/pay-gap/pfs_rows.json` (the raw rows for
every code used). Standard library only. It prints a table of every pair
and warns about any code missing from the file.

## Review before publishing

1. Pair review against Penn et al. (2025), whose 55 verified pairs are in
   the paper, not here. Add, drop or re-match pairs in `pairs.json`.
2. A clinician's check of every `proposed` pair and of the plain-language
   labels.
3. Re-run the script, re-read the page, then move the held-back entry
   from `projects/_entries-for-projects-page.html` into the projects page.

## Synthetic rows

None. Every number is read from the CMS file; nothing is invented and
nothing identifies a person.
