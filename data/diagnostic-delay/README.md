# Diagnostic delay findings

Literature figures on diagnostic delay, misdiagnosis, psychosomatic
attribution, visits and pre-diagnosis cost, by sex, for conditions that
disproportionately affect women. Compiled by Krit in a research run
completed 2026-10-21.

## Source

Every finding row carries its own source: title, year, URL, population,
and a `source_type` grade (registry / claims / cohort / survey / review /
secondary). All sources are published papers, reports or pages; no
individual-level data, nothing identifying a person, no synthetic rows.

Flags inside the data:

- `verify: true` — figure taken from a press summary, abstract or
  secondary source; to be checked against the full paper before outreach.
- `untraceable: true` — a widely repeated figure that could not be traced
  to a primary source; listed on the page under "numbers we refused to
  use" and never charted.
- `gaps` — conditions where no delay evidence was found at all, including
  the thesis's central evidence hole (perimenopause misattribution).

## Files

- `findings.json` — the dataset (source of truth, edited by hand).
- Published copy read by the site:
  `projects/diagnostic-detour/public/data.json`. After editing
  findings.json, re-copy it there:

```
cp data/diagnostic-delay/findings.json projects/diagnostic-detour/public/data.json
```
