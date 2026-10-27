# The Visit Kit

One client-side tool, three printable pages — the merger of the Symptom
Timeline, the Handoff Packet's intent, and the appointment-questions
idea (per the reshaped Oct 21 brief, which retired those as standalones).

- **Page 1 — the timeline:** dated symptoms (name, start, end or
  ongoing, severity 1–3) and life events, rendered as one horizontal SVG
  timeline (bars by severity, raspberry for ongoing only, event
  markers, month ticks). From remembered history, not daily logging.
  PNG export generated on-device.
- **Page 2 — already tested:** the ten Rule-Out Checklist items as
  checkboxes with "when" and "result as told" fields. Unticked boxes
  print as their own message.
- **Page 3 — today's visit:** what I want from today, three questions
  with tone-graded suggestion chips (Gentle / Direct — curiosity
  phrasing only; per the brief, never "document it in my chart"), and a
  small who-sees-what routing card ("the referral is your clinician's
  call").

The pitch on the page is "saves you retelling the story," not "proven
to change care." Print produces the three pages with page breaks;
copy-as-text produces the whole kit for a portal message.

**Flag:** Draft — the tested list mirrors the Rule-Out Checklist, which
is pending clinical review; the kit inherits that status.

## Data

None external. One `localStorage` record (`herada-visit-kit-v1`,
try/catch-wrapped; works without storage) holding symptoms, events,
tested state, the want-line and the three questions — a data model The
Ledger can extend later. Nothing is sent anywhere; Clear all removes it.

## Files

- `public/index.html` — the whole tool, self-contained (inline CSS and
  JS). Deploys to `/projects/visit-kit/` via the Pages workflow.
