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
