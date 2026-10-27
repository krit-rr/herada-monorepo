# Herada redesign — WordPress.com setup guide (lavender mist palette)

Everything here works on your Personal/Premium plan. No plugins needed. Budget ~30–45 minutes. Do it on a draft page first so the live site never looks broken.

## What you're installing

1. **`herada-additional-css.css`** — the whole visual identity (colors, type, spacing). Pasted once, styles the entire site.
2. **`herada-page-blocks.html`** — the homepage layout as native WordPress blocks. Pasted once into the page editor.
3. **Two fonts** — Fraunces (headlines) and Newsreader (body), both free Google Fonts. If you skip this everything falls back to Georgia, which still looks decent — but Fraunces is what makes it feel designed.

## Step 1 — Switch to a clean block theme

Appearance → Themes → activate **Twenty Twenty-Five** (free, made by WordPress). Older "classic" themes fight custom CSS; don't use one.

## Step 2 — Install the fonts

1. Go to **Appearance → Editor → Styles** (the half-moon icon) **→ Typography**.
2. Fonts panel → **Manage fonts → Install Fonts** (the Font Library, includes Google Fonts).
3. Install **Fraunces** (Regular 400, Medium 500, SemiBold 600, plus italics) and **Newsreader** (Regular 400, Medium 500, italic).
4. In Styles → Typography, set **Headings → Fraunces** and **Text → Newsreader**. Save.

## Step 3 — Paste the CSS

1. **Appearance → Additional CSS** (or Site Editor: Styles → ⋮ menu → Additional CSS).
2. Paste the entire contents of `herada-additional-css.css`. Save.

## Step 4 — Rebuild the homepage

1. Open your homepage in the editor (Pages → Home → Edit). **Duplicate it first** for a safety net.
2. ⋮ menu (top right) → **Code editor**.
3. Delete the existing content and paste the entire contents of `herada-page-blocks.html`.
4. Switch back to Visual editor — hero, periwinkle quote strip, three columns, three steps, dark contact band, all editable as normal blocks.
5. Preview, then Publish.

Every word is a normal block — click any text to edit it. The classes (like `hr-hero`) in each block's Advanced → Additional CSS class field connect the layout to the stylesheet; don't remove them.

## Step 5 — Logos, header, and footer

Upload your logo files to **Media → Library** (ask Claude for freshly recolored versions — raspberry `#AD1457` or violet-black `#2B2733` for light backgrounds, near-white for the dark band; the lavender monogram works as the Site Icon).

Then in **Appearance → Editor**, open the **Header** template part:
- Two things only: a **Site Logo** block on the left (the CSS sizes it to 34px tall), **Navigation** block on the right (Product, News, Contact).
- Delete anything else the theme put there. No search icon, no button in the nav.

**Dark band logo** (optional): add an **Image** block above the "EARLY ACCESS" kicker with the light logo, and set its Advanced → Additional CSS class to `hr-logo-band`.

**Footer**: an Image block with the dark logo (CSS class `hr-logo`, sized to 22px), the same nav links, an Instagram link, and "© 2026 Herada". Nothing else.

**Site Icon** (browser tab): Settings → General → Site Icon → the lavender monogram.

## Step 6 — Point the CTA somewhere real

The "Request early access" button links to `#contact` (the dark band). The band's button is a mailto. If you have an actual early-access form (Google Form, Tally, etc.), swap the link.

## The design rules (for future edits)

- **Colors**: paper `#FDFCFE`, periwinkle `#B7B5E4` (the quote strip — one big moment per page), violet-black ink `#2B2733`, raspberry `#AD1457` (hover `#8A0E45`), hairlines `#CFCCD6`, muted periwinkle labels `#6B68A0`, dark-band muted text `#BBC2E2`. That's the whole palette — resist adding more.
- **Type**: Fraunces for anything big, Newsreader for reading text, system sans only for small labels/buttons.
- **No** drop shadows, no rounded cards, no gradients, no pill buttons (2px radius max), no animations. Structure comes from thin rules and whitespace, like a magazine.
- **Buttons**: one raspberry button per section, maximum. Secondary actions are plain text links with an arrow.
- New sections: duplicate an existing group block and edit it rather than building from scratch.

## If something looks off

- Background didn't change → the CSS didn't save, or a classic (non-block) theme is active.
- Headlines look like Times New Roman → fonts not installed or not assigned in Styles → Typography (Step 2.4).
- Blocks show "This block contains unexpected content" → the paste into Code editor was partial; re-paste the whole file.
