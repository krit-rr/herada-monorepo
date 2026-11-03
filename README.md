# Herada

Everything Herada makes, in one place: the website, the Women's Health Bible,
and each project or prototype.

    site/        the public website (joinherada.com), plain HTML and CSS
    bible/       Women's Health Bible notes; the draft lives in a Google Doc for now
    projects/    one folder per project or prototype
    docs/        design system, WordPress migration checklist, reference files
    .github/     the workflow that publishes the site

## How publishing works

Every push to `main` publishes:

- `site/` to the root of the website
- `projects/<name>/public/` to `/projects/<name>/`
- a `sitemap.xml` listing those pages, dated from their last commits

There is no build tool. Editing a page means editing its HTML file. The
workflow copies folders, writes the sitemap in a few lines of shell, and
refuses to deploy if an internal link points nowhere.

## Previewing on your computer

From this folder:

    python3 -m http.server 8000 --directory site

Then open http://localhost:8000.

## Where to start

1. `docs/wordpress-migration.md`: the checklist for moving off WordPress.
2. `projects/README.md`: how to add a project.
3. `docs/design-system.md`: colors, type and rules to keep the site consistent.
