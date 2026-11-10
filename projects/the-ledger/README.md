# The Ledger

The portfolio's one interactive record tool, after the Oct 27 merger:
the Ledger absorbed the Visit Kit (which had itself absorbed the
Rule-Out Checklist and, before that, the Symptom Timeline, Handoff
Packet and Script Builder ideas). You log once; everything else is
derived.

**The log** is the only place data is entered: five record types —
symptom (start/end/severity), visit (who/said/next), test
(name/date/result-as-told/status), treatment (start/stop/outcome), and
life event — shown newest-first, grouped by month.

**The picker** (screen only): logged symptom names keyword-match a
20-symptom vocabulary and light up chips; adjusting them shows which of
10 midlife conditions share the picture, with separating checks,
curiosity-phrased ask-lines and look-alike pair notes.

**The Visit Kit** is the Ledger's printable output — four pages, every
one derived from the log:

1. **The timeline** — symptoms as severity-weighted bars (raspberry =
   ongoing), visits and life events as markers. On screen it compresses
   its month scale to fit the container when that leaves at least 18px
   per month, thins the month labels, packs event labels into up to three
   rows and shortens any label that has no room (the full text stays in a
   tooltip); otherwise it keeps its natural width and scrolls sideways
   with a hint. The PNG export and the printout always use the natural
   width.
2. **The one-pager** — ongoing now / visits / tests / resolved, the
   handover summary (its own print and copy buttons, too).
3. **Tested & worth asking** — the ten-check consider-list (7 routine,
   3 symptom-triggered), each check ticked iff a matching test is in
   the log (newest match supplies date and result); "log it" prefills
   the test form for the rest; unmatched tests print as "other tests in
   your log"; reasoning and per-item sources under "why · source";
   not-an-order-sheet caveat.
4. **Today's visit** — what I want from today, three questions with
   tone-graded suggestion chips (Gentle / Direct — curiosity phrasing
   only, never "document it in my chart"), who-sees-what routing card.

"Print the Visit Kit" prints all four pages; the one-pager's own button
prints just that page.

**Flag:** Draft — **pending clinical review.** The symptom map,
consider-list and separating checks are one knowledge base, reviewed
together (inherited from the Rule-Out Checklist via the Visit Kit).

## Data

None external. One `localStorage` record (`herada-ledger-v1`,
try/catch-wrapped; works without storage): `records[]` plus the Kit's
`picks`, `want` and `questions`.

**Sample ledger (demo mode).** The empty log offers "see it filled in
with a sample ledger": a fictional patient, 47, with about a year of
records across all five types, dated relative to today. It is generated
in memory by `sampleData()` and guarded by the `sampleMode` flag: while
it is shown, `save()` does nothing, the entry form and the backup
buttons are disabled, "log it" is hidden, and print, copy, the image
and the picker keep working, with the printouts and copied text saying
it is a sample. "Clear the sample" (or "Clear all") restores whatever
is in storage. If a real log exists, loading the sample asks first and
never overwrites it. On first load it imports the retired
standalone Visit Kit's state (`herada-visit-kit-v1`) — symptoms, events
and tested rows become ordinary log records — then removes that key.
Backup file save/load, optionally encrypted in the browser (AES-GCM,
PBKDF2-SHA-256 at 150k iterations); old backups load fine. Nothing is
sent anywhere; Clear all removes everything.

## Files

- `public/index.html` — the whole tool, self-contained (inline CSS and
  JS). Deploys to `/projects/the-ledger/` via the Pages workflow.
