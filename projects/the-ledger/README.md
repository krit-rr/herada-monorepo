# The Ledger

A private, local-only log of a health story: four record types
(symptom, visit, test, treatment) entered through one small form,
rendered three ways —

- **The log:** every entry in one chronological feed, newest first,
  grouped by month — the story so far.
- **The one-pager:** a live summary (ongoing now / visits newest first /
  tests and checks / resolved or stopped) that prints on one portrait
  page and copies as plain text for a portal message.
- **The backup file:** download/restore the whole ledger as a JSON file;
  with a passphrase it is encrypted in the browser first (AES-GCM, key
  derived via PBKDF2-SHA-256, 150k iterations) so it can move between
  devices without ever touching a server.

Framed everywhere as **"a personal log, not a medical record"** — in
the notice strip, the clinician line, and the printout's footer.
Visit entries record "what they said" in the user's own words; the
"who" field is the user's own label.

## Data

None external, and no clinical content — the Ledger holds only what the
user types, so it carries no pending-review flag. State lives in
`localStorage` (`herada-ledger-v1`, try/catch-wrapped; the page works
without storage, in memory). Nothing is sent anywhere; Clear all
removes it (and suggests saving a backup first). The record model
extends the Visit Kit's and is the shape Journey Submissions would
aggregate later.

## Files

- `public/index.html` — the whole tool, self-contained (inline CSS and
  JS). Deploys to `/projects/the-ledger/` via the Pages workflow.
