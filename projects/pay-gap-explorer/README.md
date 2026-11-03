# Procedure Pay Gap Explorer

**Status:** Draft, held back. Unpublished until the pair review against
Penn et al. (2025) and a clinician's check are done. The entry for the
projects page waits in `projects/_entries-for-projects-page.html`.

Compares what Medicare assigns to matched procedures on female and male
anatomy, using the public 2026 physician fee schedule: physician work
RVUs and the national payment amount, side by side, for every pair.

The page renders, from the data alone:

- two headline counts: how many of the "same operation, two codes" pairs
  value the female code lower, and how many of the published pairs carry
  less physician work and a lower national payment for the female-anatomy
  procedure;
- the five same-operation pairs (urethra and sling codes) as a table;
- a dumbbell chart plus table for the 12 published pairs, switchable
  between physician work and facility payment;
- the same for Herada's proposed pairs, each with its match strength;
- the comparison people quote that is not a fair pair (sterilization);
- the four published analyses from 1997 to 2025 with their findings;
- how the numbers are built, with the file, release and conversion factor.

## Build rules

1. Pairs come only from `data/pay-gap/pairs.json`; the page never adds a
   pair on its own and shows every pair's `group` and `match`.
2. A pair whose global periods differ is marked, because a 90-day code
   includes three months of follow-up care and a 10-day code does not.
3. Proposed pairs are always labelled unreviewed until a clinician has
   checked them; the notice at the top stays while the page is held back.

## Data

- Source of truth: `data/pay-gap/pairs.json` (hand-edited) joined to the
  CMS relative value file by `data/pay-gap/pull_pfs.py`. See
  `data/pay-gap/README.md` for the source, release and formula.
- `public/pay-gap.json` is the script's output. After editing pairs.json,
  re-run from the repo root:

```
python3 data/pay-gap/pull_pfs.py
```

## Files

- `public/index.html`: the page, self-contained; reads `pay-gap.json`.
  Deploys to `/projects/pay-gap-explorer/` via the Pages workflow once
  merged, whether or not the projects page links to it. Rename the folder
  to `_pay-gap-explorer` if it should stay off the site after merging.
