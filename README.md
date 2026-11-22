# Herada

Everything Herada makes, in one place: the website, the Women's Health Bible,
and each project or prototype.

    site/        the public website (joinherada.com), plain HTML and CSS
    bible/       Women's Health Bible notes; the draft lives in a Google Doc for now
    projects/    one folder per project or prototype
    .github/     the workflow that publishes the site

## How publishing works

Every push to `main` publishes:

- `site/` to the root of the website
- `projects/<name>/public/` to `/projects/<name>/`

There is no build tool. Editing a page means editing its HTML file.

## Previewing on your computer

From this folder:

    python3 -m http.server 8000 --directory site

Then open http://localhost:8000.

## Where to start

1. `projects/README.md`: how to add a project.
