# Design system: minimal (Oct 2026)

Implemented in `site/assets/css/herada.css`. All classes are prefixed `hr-`.
A static-site port of the "minimal" design Krit applied to the live WordPress
site on Oct 8, 2026 (originals in `docs/wordpress-export/minimal/`); it keeps
the lavender-mist palette and supersedes that design's paper-ground layout.

## Layout

- Homepage: radicchio ground with paper type; hero holds only the mission
  line. Below it one flipped section (paper ground, radicchio type) with the
  pivot note and the projects as small square tiles whose colors cycle
  radicchio, periwinkle, violet-black. Tiles show status and name, no links.
- News: paper ground, a grid of square photo tiles (image, date, title).
- Posts: title, date, content; nothing else.
- Contact: statement, large email button, three bordered columns.
- Header links are uppercase; the current page gets an underline.
- Footer on every page: logo, email, Instagram; pinned to the bottom of the
  window on short pages.

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

## Logo

Kritika's own design: full wordmark (script h + HERADA) and a script "h"
monogram. Files and sizes are listed in `site/assets/img/README.md`.
