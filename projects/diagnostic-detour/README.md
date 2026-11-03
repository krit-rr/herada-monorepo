# The Diagnostic Detour

The thesis with numbers, narrowed (Oct 2026) to midlife-relevant
conditions — thyroid/autoimmune, cardiac, ADHD, Sjögren's, sleep apnea,
POTS: how long they take to diagnose in women, how often the first label
is wrong, and how that compares to men, every figure graded by source
strength (registry / claims / cohort / survey / review / secondary).
It also absorbed the Trial Gap Explorer: whether clinical trials enroll
women at the rate conditions affect them.

The page renders, from the data alone:

- two headline findings at the top: the MINAP heart-attack misdiagnosis
  odds (Wu et al. 2018) and the Stockholm ADHD gap (Skoglund et al.
  2024), both driven by `headline` / `headline_2` finding ids;
- a dot plot of time-based delays in years, one row per study, with the
  source grade on the row, women/men/both dots, medians as hollow dots
  where the mean is skewed, and review ranges as segments — registry and
  claims markers solid, cohorts/reviews lighter, surveys faintest;
- stat sections for sex gaps (counter-evidence labelled as such),
  misdiagnosis and psychosomatic attribution, and visits/cost before
  diagnosis;
- the trial gap (`#trial-gap`): women among patients vs. women among
  trial participants for ten female-majority conditions, bubble chart
  plus exact-numbers table, from ClinicalTrials.gov posted results;
- the evidence gaps (including the thesis's central hole: nobody has
  measured perimenopause misattribution);
- "what you've heard that doesn't hold up" — widely repeated figures
  that trace to no primary source, with what to cite instead.

The project is two pages. The second, **the money** (`public/pay-gap/`,
also known as the Procedure Pay Gap Explorer), compares what Medicare
assigns to matched procedures on female and male anatomy, from the public
2026 physician fee schedule: physician work RVUs and the national facility
payment, pair by pair, with the gap shown female relative to male. A
chapter strip on both pages ties them together. The money chapter is
**held back**: reachable by its address, carrying a `noindex` tag and a
draft notice, and not linked from the chapter strip until the pair review
against Penn et al. (2025) and a clinician's check are done.

## Build rules (Krit, Oct 2026)

1. The top lines always come from `headline.finding_id` and
   `headline_2.finding_id` — never pick a headline figure any other way.
2. A finding graded `secondary`, or flagged `untraceable`, is never shown
   as a data point (no chart, no stat row). It may appear only in the
   "what you've heard that doesn't hold up" section. The page enforces
   this in `isData()`.
3. Scope: a finding renders only if `midlife: true` or its `direction`
   marks it counter-evidence (`inScope()`); out-of-scope findings stay
   in the data file.

Figures flagged `verify: true` in the data render with a "being
verified" mark; the page is titled **Draft** until those checks are done.

Rules for the money chapter:

4. Pairs come only from `data/pay-gap/pairs.json`; the chapter never adds
   a pair on its own and shows every pair's `group` (same-operation,
   published, proposed, popular) and `match` strength.
5. A pair whose global periods differ is marked, because a 90-day code
   includes three months of follow-up care and a 10-day code does not.
6. Proposed pairs stay labelled unreviewed until a clinician has checked
   them, and the chapter stays unlinked until then. To publish it, make
   "The money" a link in the chapter strip (the HTML comment says how)
   and drop the `noindex` meta tag.

## Data

- Source of truth: `data/diagnostic-delay/findings.json` (see its README
  for the flags). Compiled by Krit from published literature, 2026-10-21;
  scoped to midlife 2026-10-27.
- `public/data.json` is a copy of that file; after editing findings.json,
  re-copy it:

```
cp data/diagnostic-delay/findings.json projects/diagnostic-detour/public/data.json
```

- `public/trial-gap.json` — trial-enrollment aggregates, written by
  `python3 data/trial-gap/pull_trials.py` (run from the repo root).
  Source, license and pull date: `data/trial-gap/README.md`.
- `public/pay-gap/pay-gap.json`: the money chapter's data, written by
  `python3 data/pay-gap/pull_pfs.py` (run from the repo root) from the
  hand-edited pair list `data/pay-gap/pairs.json` and the CMS relative
  value file. Source, release and formula: `data/pay-gap/README.md`.

## Files

- `public/index.html` — the page, self-contained; reads `data.json` and
  `trial-gap.json`. Deploys to `/projects/diagnostic-detour/` via the
  Pages workflow.
- `public/pay-gap/index.html`: the money chapter, self-contained; reads
  `pay-gap.json` beside it. Deploys to `/projects/diagnostic-detour/pay-gap/`
  with the rest of the folder, linked or not.
