# Design system: minimal (Oct 2026)

Implemented in `site/assets/css/herada.css`. All classes are prefixed `hr-`.
A static-site port of the "minimal" design Krit applied to the live WordPress
site on Oct 8, 2026 (originals in `docs/wordpress-export/minimal/`); it keeps
the lavender-mist palette and supersedes that design's paper-ground layout.

## Layout

- Homepage: radicchio ground with paper type; hero holds only the mission
  line. Below it one flipped section (paper ground, radicchio type) with the
  pivot note and the projects as small square tiles whose colors cycle
  radicchio, periwinkle, violet-black. Since Nov 15, 2026 there are three
  tiles, the Women's Health Bible, the Rule-Out Checklist and the Diagnostic
  Detour, and each links to its page. The hero headline and lede are the
  Nov 15 positioning lines, verbatim; the lede's dash became a colon because
  site copy carries no em dashes.
- Learn (`/learn/`): the coming-soon page for the Learning Library. Kicker,
  h1, lede, prose; then a two-up sign-up (`hr-cols2`: one raspberry button
  each side, both `mailto:` links, no form); then "Two problems, one evidence
  base" with ids `problem-1` and `problem-2` (the Detour and the Checklist
  link to `#problem-2`); then the Misrouting Registry as a section with id
  `registry`. Secondary actions are text links with an arrow.
- Bible (`/bible/`): the four parts, then one block per life stage, each
  opening with a "What's covered" callout (`hr-callout`): a kicker, a short
  sourced list, and an `hr-flag` reading "pending billing review" until the
  coverage lines are checked. Prose under each stage is Krit's and arrives
  later.
- Project pages (`/projects/<name>/`) are self-contained and inline this
  system; the Rule-Out Checklist reuses the Ledger's bracket kickers, 3px
  section rules and 1px item rules, with native checkboxes in raspberry.
- News: paper ground, a grid of square photo tiles (image, date, title).
- Posts: title, date, content; nothing else.
- Contact: statement, large email button, three bordered columns.
- Header links are uppercase; the current page gets an underline.
- Footer on every page: logo, email, Instagram, Learn, Privacy, and the
  about line "Solo founder. Evidence published, never sold. Nothing you enter
  leaves your device."; pinned to the bottom of the window on short pages.

## Palette

| Name | Hex | Use |
| --- | --- | --- |
| Paper | `#FDFCFE` | Page background (near-white, lavender hint) |
| Periwinkle | `#B7B5E4` | Mission strip — the one big color moment per page |
| Violet-black ink | `#2B2733` | Text, dark band |
| Soft ink | `#5B5666` | Secondary text |
| Raspberry | `#AD1457` | Accent: buttons, links, step numbers |
| Dark raspberry | `#8A0E45` | Hover |
| Muted periwinkle | `#6B68A0` | Small uppercase labels (kickers) |
| Hairline | `#CFCCD6` | 1px rules |
| Band soft | `#BBC2E2` | Muted text inside the dark band |

Original brand lavender is `#A98BB5` (logo and favicon only). No other colors,
and no bright violets.

## Type

- Bricolage Grotesque: headlines and wordmark (weight 600)
- Figtree: body, labels and buttons (system sans fallback)
- Replaced Fraunces/Newsreader in Oct 2026. Bricolage has no true italic;
  the browser slants it for the few italic moments (hero em, mission strip).

## Rules

- No drop shadows, gradients, pill buttons (2px radius) or animations.
- Structure comes from 1px rules and whitespace.
- One raspberry button per section at most. Secondary actions are text links with →.
- No em dashes in site copy; a colon, comma or full stop does the join.
- Flags and notices use the bracket style: `[Draft]`, `[ pending billing
  review ]`, `[ The checklist ]`, with the brackets in raspberry.

## Components added Nov 2026

| Class | Where | What |
| --- | --- | --- |
| `hr-cols2` | Learn | Two-up split with a 2px ink rule above each half; stacks below 900px. |
| `hr-callout` | Bible | 1px ink box, kicker, list of short lines each with a `small` source line. |
| `hr-flag` | Bible, project pages | Small uppercase label in muted periwinkle inside raspberry brackets. |
| `hr-evidence` | Projects index | The one-line opener on each entry: a bold uppercase learner tag ("For women", "For clinicians", "For women and clinicians", "Frozen", "Origin") then "Evidence of …". |

## Logo

Kritika's own design: full wordmark (script h + HERADA) and a script "h"
monogram. Files and sizes are listed in `site/assets/img/README.md`.
