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
  claims markers solid, cohorts/reviews lighter, surveys faintest. The
  plot draws to the width of its box and redraws on resize: on a phone
  the year scale compresses and a long row label takes two lines, so
  nothing scrolls sideways;
- stat sections for sex gaps (counter-evidence labelled as such),
  misdiagnosis and psychosomatic attribution, and visits/cost before
  diagnosis;
- the trial gap (`#trial-gap`): women among patients vs. women among
  trial participants for ten female-majority conditions, bubble chart
  plus exact-numbers table, from ClinicalTrials.gov posted results. Under
  about 600px the chart switches to a taller layout with numbered bubbles
  and a key below, because the names collide at that width;
- the evidence gaps (including the thesis's central hole: nobody has
  measured perimenopause misattribution);
- "what you've heard that doesn't hold up" — widely repeated figures
  that trace to no primary source, with what to cite instead.

The page also prints as a handout: an `@media print` block drops the
header, notice and footer, forces paper colors in every color scheme,
scales both charts to the page, sets the stat rows in two columns, keeps
each row on one page, and stamps the top with where and when it was
printed (a `beforeprint` listener fills it in). About seven Letter pages
as of Nov 2026, down from twelve.

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

## Files

- `public/index.html` — the page, self-contained; reads `data.json` and
  `trial-gap.json`. Deploys to `/projects/diagnostic-detour/` via the
  Pages workflow.
