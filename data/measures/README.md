# Measures

Two files: the HEDIS measure map (`hedis-map.json`) and the Minnesota Medicaid
preventive-services rules behind the medical boarding pass (`mn-medicaid.json`).

# HEDIS measure map

Herada's internal crosswalk from six HEDIS measures to sections of the
Women's Health Bible and to candidate plain-language messages. It is a
mapping of definitions and sources, not a dataset of people.

## What the file is

- `hedis-map.json`: one record per measure (CCS-E, BCS-E, PPC, PDS-E,
  CHL, OMW) with Herada's plain-language description, age band,
  population, reporting method, recent changes, the NCQA public page it
  was checked against, the Bible sections it maps to (`teens`,
  `reproductive`, `pregnancy`, `midlife`, `later`, plus `essentials` and
  `advocacy`), and unreviewed message candidates. `bible_section_index`
  inverts the mapping; `verification` and `could_not_verify` separate
  what NCQA's public pages confirm from what they do not.

## Not NCQA content

HEDIS is a registered trademark of NCQA and the measure specifications
are NCQA's copyright. This file reproduces no specification text:
measure names and abbreviations are NCQA's, every description is
Herada's paraphrase from NCQA's public measure pages, blog posts and
memos, and each record links NCQA's public page. The HEDIS Volume 2
text itself was not consulted. Check the current Volume 2 before relying
on any detail.

## Source

- NCQA public pages: the HEDIS Measure Library pages for the six
  measures, the "What's New, What's Changed, What's Retired" posts for
  MY 2025, MY 2026 and MY 2027, the ECDS reporting page, the MY 2025
  trending memo and measure-description table, the February 2026
  notification-of-changes memo, and the 2026 Health Plan Ratings measure
  list. Each is listed with its URL in `sources_checked`.
- Message candidates also cite healthcare.gov, medicare.gov,
  medicaid.gov, the USPSTF and the Women's Preventive Services
  Initiative.
- Pulled 2026-11-15 by hand from the public web (no API, no login).
- License: NCQA pages are copyright NCQA and are linked, not copied;
  federal government pages are public domain.

## Measurement year

MY 2026 (HEDIS MY 2026 Volume 2 with the March 31, 2026 Technical
Update). NCQA's public MY 2027 summary and memo were checked and list no
change to these six measures.

## Synthetic or personal rows

None. The file holds no data about people, real or invented. Message
candidates stay marked "candidate, unreviewed" until a clinical and
legal read clears them; none makes a diagnosis or recommends treatment.

## How to update

1. Each August NCQA publishes the next measurement year's Volume 2 with
   a "What's New, What's Changed, What's Retired" post, and around
   March 31 it publishes a Technical Update. Re-check both every autumn,
   plus the ECDS reporting page for measures moving to ECDS-only.
2. For each measure, re-read the page in `source_url`, update
   `recent_changes`, `reporting` and `source_checked`, and move anything
   newly confirmed out of `could_not_verify`.
3. Validate: `python3 -I -m json.tool data/measures/hedis-map.json`.
   House style: no em dashes.

# Minnesota Medicaid preventive rules (`mn-medicaid.json`)

The rules the medical boarding pass reads (`projects/boarding-pass/public/data.json`
is a copy; copy it across after editing). Scope: Minnesota Medical Assistance
and MinnesotaCare, adult women 18 and over, preventive services only. Twenty
service rows, each with the age band, the interval, the plan types, the
coverage basis (USPSTF grade, HRSA guideline via the WPSI, CDC schedule,
Minnesota statute, State Plan Amendment or MHCP Provider Manual section) with
a URL and the date checked, two plain sentences on what the visit involves,
the sentence to say when booking, Spanish strings, billing-code hints for the
EOB check, a `verified` flag with a note on what the sources confirm, and a
`placement` display hint. Two plan rows carry the cost-sharing answer and the
managed-care note.

- Source: public pages only, pulled by hand on 2026-11-19: mn.gov/dhs and
  the MHCP Provider Manual, revisor.mn.gov, the USPSTF, womenspreventivehealth.org,
  cdc.gov, medicaid.gov, healthcare.gov; the full list with URLs is in
  `sources_checked`, and `could_not_verify` lists what the pages did not settle
  (MinnesotaCare copay amounts rest on search excerpts because DHS consumer
  pages sit behind a bot wall; whether its radiology copay touches a screening
  scan; the 2026 county-plan list).
- License: government pages are public domain or are linked, not copied.
- Synthetic or personal rows: none; it is a rules file, not data about people.
- Status: draft, pending clinical and plan-quality review. The Spanish is a
  first draft pending a reviewer. No row is a diagnosis or a treatment.
- Re-check each January (MinnesotaCare copays change with the year) and when
  the MHCP manual sections cited show a new revision date. From October 1,
  2028, Minnesota adds small copays for expansion adults above 100 percent of
  poverty on nonpreventive care; preventive rows are unaffected by definition.
