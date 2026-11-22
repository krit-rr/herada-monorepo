// Sweeps every page of the assembled site in headless Chromium at phone,
// tablet and desktop widths and fails on what a visitor would notice:
// an uncaught script error, a console error, a page that scrolls sideways,
// or an axe-core violation of impact serious or critical. Moderate and
// minor axe findings and failed requests to other hosts are reported only.
//
// Usage, with the assembled site served somewhere:
//   node tools/qa/sweep.js http://127.0.0.1:8080 --root _site [--widths 360,390,768,1280] [--shots <dir>]
// Pages are discovered from the assembled tree (every index.html plus
// 404.html), so a new page is covered the moment it exists.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const base = (args.find(a => !a.startsWith('--')) || '').replace(/\/$/, '');
function opt(name, fallback) { const i = args.indexOf(name); return i !== -1 ? args[i + 1] : fallback; }
const root = opt('--root', '_site');
const widths = opt('--widths', '360,390,768,1280').split(',').map(Number);
const shots = opt('--shots', null);
if (!base) { console.error('usage: node sweep.js <baseURL> --root <assembled dir>'); process.exit(2); }
if (!fs.existsSync(root)) { console.error(`assembled site not found at ${root}; run tools/qa/assemble.sh first`); process.exit(2); }
if (shots) fs.mkdirSync(shots, { recursive: true });

const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const FATAL_IMPACT = new Set(['serious', 'critical']);

function pages(dir) {
  const out = [];
  (function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name === 'index.html') out.push('/' + path.relative(dir, path.dirname(p)).split(path.sep).filter(Boolean).join('/') + '/');
      else if (entry.name === '404.html' && path.dirname(p) === dir) out.push('/404.html');
    }
  })(dir);
  return out.map(u => u.replace('//', '/')).sort();
}

// Local runs behind a proxy need it for the Google Fonts requests; CI does not.
function launchOptions() {
  return {
    executablePath: process.env.CHROMIUM_PATH || undefined,
    proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1,localhost' } : undefined
  };
}

(async () => {
  const list = pages(root);
  const browser = await chromium.launch(launchOptions());
  const rows = [];
  let fatal = 0;
  for (const url of list) {
    for (const w of widths) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1, ignoreHTTPSErrors: !!process.env.HTTPS_PROXY });
      const page = await ctx.newPage();
      const pageErrors = [], consoleErrors = [], failedExternal = [], failedInternal = [];
      page.on('pageerror', e => pageErrors.push(String(e && e.message || e)));
      page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
      page.on('requestfailed', r => (r.url().startsWith(base) ? failedInternal : failedExternal).push(r.url()));
      page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(base)) failedInternal.push(`${r.status()} ${r.url()}`); });
      let status = null;
      try {
        const resp = await page.goto(base + url, { waitUntil: 'networkidle', timeout: 60000 });
        status = resp && resp.status();
      } catch (err) {
        const resp = await page.goto(base + url, { waitUntil: 'load', timeout: 60000 }).catch(() => null);
        status = resp && resp.status();
      }
      await page.waitForTimeout(300);
      const m = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        title: document.title
      }));
      let violations = [];
      try {
        await page.addScriptTag({ content: AXE });
        violations = await page.evaluate(async () => {
          const r = await window.axe.run(document, { resultTypes: ['violations'] });
          return r.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, targets: v.nodes.slice(0, 3).map(n => n.target.join(' ')) }));
        });
      } catch (err) {
        pageErrors.push('axe could not run: ' + err.message);
      }
      if (shots) await page.screenshot({ path: path.join(shots, `${url.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'home'}-${w}.png`), fullPage: true });
      await ctx.close();

      // A console error that only echoes a failed request to another host is
      // that host's problem, not the page's.
      const ownConsoleErrors = consoleErrors.filter(t => !(failedExternal.length && /Failed to load resource/i.test(t)));
      const overflow = m.scrollWidth > m.clientWidth;
      const fatalAxe = violations.filter(v => FATAL_IMPACT.has(v.impact));
      const minorAxe = violations.filter(v => !FATAL_IMPACT.has(v.impact));
      const problems = [];
      if (status && status >= 400 && url !== '/404.html') problems.push(`HTTP ${status}`);
      if (pageErrors.length) problems.push(`page errors: ${pageErrors.join(' | ')}`);
      if (ownConsoleErrors.length) problems.push(`console errors: ${ownConsoleErrors.join(' | ')}`);
      if (failedInternal.length) problems.push(`failed requests: ${failedInternal.join(' | ')}`);
      if (overflow) problems.push(`scrolls sideways: ${m.scrollWidth} > ${m.clientWidth}`);
      if (fatalAxe.length) problems.push('axe: ' + fatalAxe.map(v => `${v.impact} ${v.id} x${v.nodes} (${v.targets.join(', ')})`).join('; '));
      const notes = [];
      if (minorAxe.length) notes.push('axe minor: ' + minorAxe.map(v => `${v.impact} ${v.id} x${v.nodes}`).join(', '));
      if (failedExternal.length) notes.push(`external requests failed: ${failedExternal.length}`);
      if (problems.length) fatal += 1;
      rows.push({ url, w, status, problems, notes });
      console.log(`${problems.length ? 'FAIL' : 'ok  '} ${url.padEnd(70)} ${String(w).padStart(4)}  ${problems.join('  ') || 'clean'}${notes.length ? '  [' + notes.join('; ') + ']' : ''}`);
    }
  }
  await browser.close();
  console.log(`\n${list.length} pages x ${widths.length} widths: ${rows.length - fatal} clean, ${fatal} with problems`);
  process.exit(fatal ? 1 : 0);
})().catch(err => { console.error('SWEEP ERROR', err); process.exit(1); });
