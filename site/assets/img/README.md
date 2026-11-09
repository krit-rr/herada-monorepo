# Images

- `full-logo-white.png`: the full wordmark (script h + HERADA) in white. The
  site paints it in any color with a CSS mask (`.hr-logo` in `herada.css`),
  raspberry on paper pages and paper on the home page, so no recolored
  wordmark files are needed.
- `herada-monogram-lavender.png`: the script-h mark in the original lavender
  `#A98BB5`, 512 px, used as the favicon on every page. Cut from the white
  wordmark and recolored, Nov 2026.
- `herada-monogram-tile.png`: the same mark in paper on a raspberry rounded
  tile, 512 px, used as the Apple touch icon (home-screen icons need an
  opaque background).
- `og-default.png`: the 1200 by 630 share image, wordmark and mission line on
  radicchio.
- `news/`: the photos for the news tiles.

Every page carries, inside `<head>`:

    <link rel="icon" type="image/png" href="/assets/img/herada-monogram-lavender.png">
    <link rel="apple-touch-icon" href="/assets/img/herada-monogram-tile.png">
