# Herada

Everything Herada makes, in one place: the website and each project or
prototype.

    site/        the public website (joinherada.com), plain HTML and CSS
    projects/    one folder per project or prototype
    data/        source datasets and analysis scripts, a README per dataset
    data/measures/  the internal map from Bible sections to HEDIS measures (not NCQA content)
    cme/         outline and accreditation notes for "How It Presents in Women"; no content yet
    .github/     the workflow that publishes the site

## How publishing works

Every push to `main` publishes:

- `site/` to the root of the website
- `projects/<name>/public/` to `/projects/<name>/`
- a `sitemap.xml` listing those pages, dated from their last commits

There is no build tool. Editing a page means editing its HTML file. The
workflow copies folders, writes the sitemap in a few lines of shell, and
refuses to deploy if an internal link points nowhere. Those scripts live in
`tools/qa/`, together with the checks that run on every pull request: every
page opened in headless Chromium at phone, tablet and desktop widths, plus the
Ledger end to end. See `tools/qa/README.md` to run them locally.

## Previewing on your computer

From this folder:

    python3 -m http.server 8000 --directory site

Then open http://localhost:8000.

## Where to start

1. `projects/README.md`: how to add a project.
