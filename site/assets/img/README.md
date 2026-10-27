# Images

Logo files still needed (the Aug 25 recolors used the old plum palette; ask
Claude to recolor the original lavender PNGs for the Oct 2026 palette):

- `herada-logo-raspberry.png` — full wordmark in `#AD1457` (header at 34px, footer at 22px)
- `herada-logo-paper.png` — full wordmark in `#FDFCFE` (dark band at 40px)
- `herada-monogram-lavender.png` — script-h mark in original `#A98BB5` (favicon)

Each page has an HTML comment showing where to swap the text wordmark for the image.
For the favicon, add this inside `<head>` on each page:

    <link rel="icon" href="/assets/img/herada-monogram-lavender.png">
