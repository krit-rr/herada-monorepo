# Trial Gap data

Sex-disaggregated clinical-trial enrollment for ten conditions whose
affected populations are predominantly female.

## Source

- **ClinicalTrials.gov API v2** (https://clinicaltrials.gov/data-api/api).
  US government work, public domain. Interventional studies only; sex
  counts read from each study's posted baseline "Sex: Female, Male"
  measure (studies reporting sex another way are counted as unparsed).
- **Pulled: 2026-10-20** by `pull_trials.py` (run it from the repo root;
  it resumes from `cache/` if interrupted — the cache is gitignored).
- Prevalence sex-ratio figures are approximations from published reviews;
  the citation for each condition is in `pull_trials.py` (CONDITIONS) and
  shown on the project page.

## Files

- `pull_trials.py` — the pull and aggregation script.
- `trial_gap_raw.json` — one row per trial (NCT id, parsed female/male
  counts), for checking the aggregation.
- Output read by the site: `projects/diagnostic-detour/public/trial-gap.json`
  (the Trial Gap Explorer merged into the Diagnostic Detour, Oct 2026).

## Synthetic rows

None. Every number is from the public registry; no rows are invented and
nothing identifies a person (counts only, aggregated by the sponsor
before posting).
