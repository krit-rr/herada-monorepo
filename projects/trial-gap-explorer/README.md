# Trial Gap Explorer

For ten conditions whose patients are mostly women (lupus, Sjögren's,
Hashimoto's, Graves', rheumatoid arthritis, multiple sclerosis, migraine,
fibromyalgia, POTS, ME/CFS): what share of clinical-trial participants
are women, and does it match the share of patients who are?

A bubble chart plots women-among-patients (published prevalence reviews)
against women-among-participants (ClinicalTrials.gov posted results),
with a parity diagonal; below the line, women are underrepresented
relative to the patient population. A table carries the exact numbers,
the per-condition prevalence citation, and the denominator (how many
registered trials actually post results — most don't).

First result (Oct 2026 pull): a mixed and honest picture — multiple
sclerosis, ME/CFS, Graves' and Hashimoto's enroll women below their
patient share; RA, migraine, fibromyalgia and POTS at or above it.

## Data

- `public/data.json` — precomputed aggregates the page reads.
- Regenerate: `python3 data/trial-gap/pull_trials.py` from the repo root
  (public API, no key; resumes from a cache if interrupted). Source,
  license and pull date: `data/trial-gap/README.md`.

## Files

- `public/index.html` — chart + table, self-contained page.
- `public/data.json` — the aggregates (pull date embedded and shown).
