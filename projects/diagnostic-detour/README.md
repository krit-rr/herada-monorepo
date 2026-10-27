# The Diagnostic Detour

The thesis with numbers: how long women wait for a diagnosis, how often
the first label is wrong, and how that compares to men — for conditions
that disproportionately affect women, every figure graded by source
strength (registry / claims / cohort / survey / review / secondary).

The page renders, from the data alone:

- the Danish registry headline (Westergaard et al., Nature
  Communications 2019) at the top;
- a dot plot of time-based delays in years, one row per study, with the
  source grade on the row, women/men/both dots, medians as hollow dots
  where the mean is skewed, and review ranges as segments;
- stat sections for sex gaps (counter-evidence labelled as such),
  misdiagnosis and psychosomatic attribution, and visits/cost before
  diagnosis;
- the evidence gaps (including the thesis's central hole: nobody has
  measured perimenopause misattribution);
- "what you've heard that doesn't hold up" — widely repeated figures
  that trace to no primary source, with what to cite instead.

## Build rules (Krit, Oct 2026)

1. The top line always comes from `headline.finding_id` — never pick a
   headline figure any other way.
2. A finding graded `secondary`, or flagged `untraceable`, is never shown
   as a data point (no chart, no stat row). It may appear only in the
   "what you've heard that doesn't hold up" section. The page enforces
   this in `isData()`.

Figures flagged `verify: true` in the data render with a "being
verified" mark; the page is tiled **Draft** until those checks are done.

## Data

- Source of truth: `data/diagnostic-delay/findings.json` (see its README
  for the flags). Compiled by Krit from published literature, 2026-10-21.
- `public/data.json` is a copy of that file; after editing findings.json,
  re-copy it:

```
cp data/diagnostic-delay/findings.json projects/diagnostic-detour/public/data.json
```

## Files

- `public/index.html` — the page, self-contained; reads `data.json`.
  Deploys to `/projects/diagnostic-detour/` via the Pages workflow.
