# The Medical Boarding Pass

One page, built in the browser from three answers: age, state and plan type.
It lists the four to six preventive services she is owed this year, what each
visit involves in two sentences, that it is free with her plan, and the words
to book it ("Free · say: ..."). A second section, used after the visit, takes
the pasted text of an Explanation of Benefits or a bill and flags preventive
care that was billed with a charge. English and Spanish, at about a
sixth-grade reading level.

First scope: Minnesota Medicaid only (Medical Assistance and MinnesotaCare),
adult women. Other states are listed as coming.

**Status:** Drafting. Draft, pending clinical and plan-quality review (flag at
the top of the page, on the pass itself and in the footer). A Build @ Deerfield
project: Krit (lead), Maya Jain (product, runs the user sessions), Ali
Brueggemann (design).

## What it is not

It is a page she reads, not a record she keeps. No accounts, no history, no
`localStorage` at all: the three answers live in the open page only. The EOB
check is text paste only, never an upload, and reads the text on the page
without sending it anywhere. Nothing on the page is a diagnosis or a
recommendation; every line is "this is covered, this is what happens, this is
what to say."

## Data

`public/data.json` is a copy of `data/measures/mn-medicaid.json`, which is the
source of truth. After editing the source:

    cp data/measures/mn-medicaid.json projects/boarding-pass/public/data.json

Each service row carries: the age band, the interval, the plan types it applies
to, its coverage basis (USPSTF grade, HRSA guideline, Minnesota DHS or MHCP
page) with a URL and the date checked, the two "what happens" sentences, the
"say" sentence, the Spanish strings, billing-code hints for the EOB check, and
a `verified` flag with a note on what the sources confirm. An optional
`placement` field ("headline", "checkup" or "conditional") decides where the
page shows the row; without it, rows with `conditions` go under "If this is
you" and the rest are headline items, capped at six, with the overflow joining
"At your checkup, also ask for".

## How the page decides

A row fits when the age is inside its band and the chosen plan is in its
`plan_types`. "I'm not sure which" is treated as Medical Assistance, and the
page says so. No health questions are asked: services that depend on history
(smoking, sexual activity, weight) render as "If this is you" lines with the
question to ask, instead of being asked for up front.

## The EOB check

Plain text only. Each line is scanned for a known billing code or a service
name, then for a dollar amount next to words like "you owe", "patient
responsibility" or "copay". A match with an amount above zero is flagged; a
preventive line with an amount but without those words is shown as "check
this line". It is a first draft that can miss things or flag the wrong line,
and the page says so.

## Files

- `public/index.html`: the page, self-contained (inline CSS and JS). Deploys
  to `/projects/boarding-pass/` via the Pages workflow. Carries a `noindex`
  tag like the other project pages while the projects are hidden.
- `public/data.json`: copy of the rules (see Data).
- `WRITEUP.md`: headings only, for Krit.

## Open

- The deck's mock design was not available when the first page was built;
  the raspberry header band, ruled items and "Free · say:" line follow the
  brief's description and the design system. Ali's design wins where they
  differ.
- Spanish strings are a first draft, pending a reviewer.
- Other states: the data file is per state; a second file and a state switch
  are the whole change.
