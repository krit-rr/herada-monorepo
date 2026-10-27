# Pop Quiz

One tap-through quiz engine, many quizzes — the hub lists what's live
and what's coming (clinical ones marked "will ship after clinical
review"). Nothing is stored or sent; state lives on the open page only.

Live:

- **Myth or measured?** (graded, 8 rounds) — circulating women's-health
  stats; the player calls whether each traces to a real study. Every
  reveal carries the verdict, the honest version of the number, and the
  source — drawn from the Diagnostic Detour's graded dataset, including
  its refused-numbers list. Teaches source-grading as a game.
- **What's your appointment style?** (archetype, 7 questions) — four
  exam-room archetypes (Preparer, Minimizer, Researcher, Advocate), each
  result with a strength, a watch-out, two curiosity-phrased scripts,
  and a link to the matching tool. Explicitly labeled a
  communication-style quiz that knows nothing about the player's health.

Coming (content pending): perimenopause knowledge (check against the
Bible before shipping); workup-completeness and who-should-I-see
(clinical — flagged and review-gated before they go live).

Adding a quiz = adding a definition object (`kind: "graded"` with
answer/verdict/why/src per question, or `kind: "archetype"` with
option→key mappings and a results table) to the QUIZZES array in
`public/index.html`, and removing its "coming soon" card.

## Data

No external data files; the Myth quiz's claims and sources mirror
`data/diagnostic-delay/findings.json` — keep them in sync if findings
change. No storage of any kind. Copy-my-result writes to the clipboard
on-device.

## Files

- `public/index.html` — hub + engine + quiz definitions, self-contained.
  Deploys to `/projects/quizzes/` via the Pages workflow.
