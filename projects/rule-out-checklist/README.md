# Rule-Out Checklist

One printable page. Before accepting a perimenopause or anxiety explanation
for fatigue, brain fog, joint pain or palpitations, these ten checks should
have been considered. Seven are routine (thyroid panel with free T4 and TPO
antibodies; ferritin and iron panel; CBC; CMP; vitamin D and B12; hs-CRP or
ESR; a cardiovascular risk calculation) and three are symptom-triggered (ANA
with reflex, with its false-positive rate stated; orthostatic vitals; a
validated adult-ADHD screener). Every item carries one line on why and a
source link.

The framing is "ask whether this was considered", never "demand these
tests": the page says so in a boxed caveat, because family-medicine guidance
warns that broad panels are low-yield. The NICE NG23 context line sits above
the list: perimenopause is diagnosed in women over 45 from symptoms alone,
and this list is what should be weighed before that label settles.

**Status:** Reviewing. Draft, pending clinical review (flag on the page and
in the footer; keep the wording the same as the Ledger's).

## How it relates to the Ledger

The ten items, their reasoning and their sources are the same knowledge base
the Ledger uses on its "tested and worth asking" page (`ITEMS` in
`projects/the-ledger/public/index.html`). When one changes, change the other
in the same commit so the two pages never disagree. The checklist page links
to the Ledger ("check these against your own history"); the Ledger links
back ("printable on its own").


## Privacy

Nothing is stored or sent. Ticked boxes live on the open page only. "Copy to
notes" writes plain text to the clipboard on the device; printing goes to the
browser's print dialog. There is no `localStorage`, no form and no script
from anywhere else.

## Files

- `public/index.html`: the page, self-contained (inline CSS and JS). Deploys
  to `/projects/rule-out-checklist/` via the Pages workflow. Carries a
  `noindex` tag like the other project pages while the projects are hidden.
- `WRITEUP.md`: headings only, for Krit.

No data files.
