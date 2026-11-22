# Projects

One folder per project or prototype. On every push to `main`, the deploy
workflow publishes each `projects/<folder>/public/` to
`https://joinherada.com/projects/<folder>/`. Folders whose name starts with
`_` are skipped.

## Adding a project

1. Make `projects/<folder>/` with two things in it:
   - `README.md`: what it is, where its data comes from, how the files fit
     together, and a `**Status:**` line.
   - `public/index.html`: the page, self-contained (inline CSS and JS), so it
     stands alone at `/projects/<folder>/`. Copy the `<head>` of an existing
     project page to get the fonts, palette, metadata and dark mode.
2. Link it from the site, in both places:
   - `site/projects/index.html`: one `<li>` in the `hr-list`, with a status
     span, the title linking to `/projects/<folder>/`, and a one-line
     description.
   - `site/index.html` carries three tiles only (the Bible, the Rule-Out
     Checklist and the Diagnostic Detour, since Nov 15, 2026), each linking
     to its page. A new project goes on the projects page, not the home
     tiles, unless Krit says otherwise.
3. Push to `main`. The workflow copies the folder, writes `sitemap.xml`,
   checks every internal link, and deploys.

A project that needs a server (a database, an API key) cannot be hosted
here: GitHub Pages serves static files only. Link to its repository instead,
as `her-health-advocate/` does.

## Statuses

One vocabulary on the home tiles and the projects page, in pipeline order:

- **Drafting**: being built, not ready to read yet.
- **Reviewing**: complete enough to read; figures or claims are being checked.
- **Polishing**: content settled; layout, copy and edge cases being tidied.
- **Almost There**: ready apart from a named blocker.
- **Prototype**: a retired direction, kept as a case study.

A finished one-off is labelled by its event and year instead
("Hackathon, 2023").

The Rule-Out Checklist and the Ledger share one knowledge base (the ten
checks, their reasoning and sources). Change both in the same commit.

Anything that touches clinical content (a symptom map, a checklist, a quiz
that gives health information) carries a **Draft, pending clinical review**
flag on the page and in its README until a clinician has reviewed it. Keep
the wording as it is on the Ledger so it reads the same everywhere.

## Data

Data lives under `data/<topic>/` with its own README naming the source,
licence and pull date. The page reads a copy inside `public/`, so after
editing the source, copy it across. The Diagnostic Detour's step:

    cp data/diagnostic-delay/findings.json projects/diagnostic-detour/public/data.json

Scripts that pull data (`data/trial-gap/pull_trials.py`) run from the repo
root and write straight into the project's `public/` folder.

## Held-back entries

`_entries-for-projects-page.html` keeps the `<li>` blocks for projects that
are written but blocked, with the blocker noted in a comment. The live
projects page is the source of truth for everything published; when a
blocker clears, paste the entry back into `site/projects/index.html`.
