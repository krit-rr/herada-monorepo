# QA tools

Dev-only tooling. The site itself has no build step; these scripts check it.
The deploy workflow uses the first three, and the QA workflow runs all of
them on every pull request (`.github/workflows/qa.yml`).

- `assemble.sh`: copies `site/` and every `projects/<name>/public/` into one
  folder, the way GitHub Pages serves them.
- `sitemap.sh`: writes `sitemap.xml` for that folder, skipping `404.html`
  and any page with a robots `noindex` tag.
- `linkcheck.py`: fails if any href, src or CSS url() points at a file that
  is not there, if the sitemap does not parse, or if robots.txt is missing.
- `sweep.js`: opens every page in headless Chromium at 360, 390, 768 and
  1280 wide and fails on a script error, a console error, sideways scrolling,
  or an axe-core violation of impact serious or critical. Moderate and minor
  findings are reported, not fatal. Pages are discovered from the assembled
  folder, so a new page is covered the moment it exists.
- `ledger-e2e.js`: drives the Ledger end to end (import, every record type,
  backups, print stamps, blocked storage) and fails on any failed check.

## Running it locally

From the repository root, once (installs the pinned Playwright and axe-core
into `tools/qa/node_modules`; nothing lands in the root):

    (cd tools/qa && npm ci && npx playwright install chromium)

Then:

    bash tools/qa/assemble.sh _site && bash tools/qa/sitemap.sh _site && python3 tools/qa/linkcheck.py _site
    python3 -m http.server 8080 --directory _site &
    node tools/qa/sweep.js http://127.0.0.1:8080 --root _site
    node tools/qa/ledger-e2e.js http://127.0.0.1:8080/projects/the-ledger/

Add `--shots <dir>` to the sweep to keep full-page screenshots, and `--out
<dir>` to the Ledger run to keep its downloads and screenshots. If Chromium is
installed somewhere else, point `CHROMIUM_PATH` at the binary.
