# Rule-Out Checklist

One page, two layers, one knowledge base — this project absorbed The
Overlap (Oct 2026) so a single clinician review covers everything.

**The interactive layer (optional):** pick from 20 symptoms; see which of
10 midlife conditions share them, ranked, each with the check that
separates it and an "Ask:" line — plus look-alike notes for the pairs
people get stuck between. Conditions link down to the checklist item
that covers their check; the items that fit your picks get a raspberry
edge and a "fits your picks" tag.

**The checklist layer:** before a perimenopause or anxiety explanation
settles (context: NICE NG23 allows a symptoms-only diagnosis over 45),
the consider-list, split **routine** (TSH/fT4/TPO, ferritin + iron, CBC,
CMP, vitamin D + B12, hs-CRP/ESR, cardiovascular risk calculation) vs
**symptom-triggered** (ANA with reflex — false-positive rate in the
why-line per Tan 1997; orthostatic vitals; adult-ADHD screener). Every
item carries one line on why and a source link (AAFP 2023, CDC ME/CFS,
EMAS 2024, ACC/AHA 2019, Tan 1997, Skoglund 2024).

**Framing rule:** the ask is "was this considered?", never "demand these
tests" — a visible "this is not an order sheet" box carries AAFP's
broad-panels-are-low-yield caveat. Print shows the checklist alone on
one portrait page (the picker is screen-only); the printout keeps the
draft flag.

**Pending clinical review:** the knowledge base is the three structures
at the top of the page's script (CONDITIONS with itemKey mappings,
SYMPTOMS, PAIRS) plus the ten checklist items — one review covers the
lot. The flag stays until Krit confirms the review and removes it.

## Data

None external. Picks and ticks are kept together in `localStorage`
(wrapped in try/catch; the page works without storage). Copy-to-notes
includes the picked symptoms and marks which items fit them.

## Files

- `public/index.html` — the whole tool, self-contained (inline CSS and JS).
  Deploys to `/projects/rule-out-checklist/` via the Pages workflow.

No `data.json` and no build step.
