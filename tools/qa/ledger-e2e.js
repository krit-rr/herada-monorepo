// The Ledger, end to end, in headless Chromium: legacy Visit Kit import, every
// record type through the form, validation, the picker, copy, PNG export, plain
// and encrypted backups, Clear all, wrong passphrase, junk file, restore, and
// the page with storage blocked. Exits 1 if any check fails.
//
// Usage, with the assembled site served somewhere:
//   node tools/qa/ledger-e2e.js http://127.0.0.1:8080/projects/the-ledger/ [--out <dir>]
// Downloads, screenshots and a results.json land in --out (default: a temp dir).
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path'); const os = require('os');
const args = process.argv.slice(2);
const BASE = args.find(a => !a.startsWith('--'));
if (!BASE) { console.error('usage: node ledger-e2e.js <ledger URL> [--out <dir>]'); process.exit(2); }
const outIdx = args.indexOf('--out');
const OUT = outIdx !== -1 ? args[outIdx + 1] : fs.mkdtempSync(path.join(os.tmpdir(), 'herada-ledger-'));
fs.mkdirSync(OUT, { recursive: true });
const ORIGIN = new URL(BASE).origin;
// Local runs behind a proxy need it for the Google Fonts requests; CI does not.
function launchOptions() {
  return {
    executablePath: process.env.CHROMIUM_PATH || undefined,
    proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: '127.0.0.1,localhost' } : undefined
  };
}
const results = [];
function rec(name, ok, detail) { results.push({ name, ok, detail }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? '  :: ' + detail : '')); }
async function run(width) {
  const browser = await chromium.launch(launchOptions());
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, ignoreHTTPSErrors: !!process.env.HTTPS_PROXY, acceptDownloads: true });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: ORIGIN });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  let promptAnswer = null; const dialogs = [];
  page.on('dialog', async d => { dialogs.push(d.type() + ': ' + d.message().slice(0, 80)); if (d.type() === 'prompt') { if (promptAnswer == null) await d.dismiss(); else await d.accept(promptAnswer); } else await d.accept(); });
  const W = '[' + width + '] ';

  // 1. Legacy Visit Kit migration
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('herada-visit-kit-v1', JSON.stringify({
      symptoms: [{ name: 'Fatigue, all day', start: '2025-11-03', severity: 3 }, { name: 'Night sweats', start: '2026-01-10', end: '2026-02-20', severity: 2 }, { name: 'bad', start: 'not-a-date' }],
      events: [{ text: 'Moved house', date: '2025-12-01' }],
      tested: { tsh: { done: true, when: '2026-01', result: 'normal, no number' }, ferritin: { done: false }, bogus: { done: true } },
      otherTests: [{ name: 'Celiac panel', when: '2026-02', result: 'negative' }],
      picks: ['fatigue', 'not-a-real-id'], want: 'A plan, not reassurance.', questions: ['Q one', '', 'Q three']
    }));
  });
  await page.reload({ waitUntil: 'networkidle' });
  const mig = await page.evaluate(() => ({
    oldKey: localStorage.getItem('herada-visit-kit-v1'),
    data: JSON.parse(localStorage.getItem('herada-ledger-v1') || 'null'),
    logItems: document.querySelectorAll('#log li').length,
    pressed: [...document.querySelectorAll('#symChips button[aria-pressed="true"]')].map(b => b.getAttribute('data-id')),
    want: document.getElementById('want').value,
    q: [...document.querySelectorAll('[data-q]')].map(i => i.value),
  }));
  rec(W + 'migration removes old key', mig.oldKey === null);
  rec(W + 'migration imports 5 valid records (2 symptoms, 1 event, 1 tested, 1 other test)', mig.data && mig.data.records.length === 5 && mig.logItems === 5, 'records=' + (mig.data && mig.data.records.length) + ' logItems=' + mig.logItems + ' types=' + (mig.data && mig.data.records.map(r => r.type).join(',')));
  rec(W + 'migration keeps valid picks only', JSON.stringify(mig.pressed) === JSON.stringify(['fatigue']), JSON.stringify(mig.pressed));
  rec(W + 'migration carries want + questions', mig.want === 'A plan, not reassurance.' && mig.q[0] === 'Q one' && mig.q[2] === 'Q three', JSON.stringify(mig.q));
  const tshRow = await page.evaluate(() => { const rows = [...document.querElementsBySelectorAll ? [] : document.querySelectorAll('#testedGroups *')]; const r = rows.find(x => /Thyroid panel/.test(x.textContent) && x.children.length && x.textContent.length < 900); return r ? r.outerHTML.slice(0, 700) : null; });
  fs.writeFileSync(path.join(OUT, `tsh-row-after-migration-${width}.html`), tshRow || 'none');
  rec(W + 'tested list reflects migrated TSH (manual check of saved row html)', !!tshRow, tshRow ? tshRow.replace(/\s+/g, ' ').slice(0, 160) : 'no row');

  // 2. Add every record type through the UI
  async function add(type, fields) {
    await page.click(`#types button[data-type="${type}"]`);
    for (const [f, v] of Object.entries(fields)) {
      const sel = `#fields [data-f="${f}"]`;
      const tag = await page.$eval(sel, el => el.tagName);
      if (tag === 'SELECT') await page.selectOption(sel, v); else await page.fill(sel, v);
    }
    await page.click('#addBtn');
  }
  const before = await page.$$eval('#log li', l => l.length);
  await add('symptom', { name: 'Brain fog, afternoons', date: '2026-03-02', severity: '3' });
  await add('visit', { who: 'PCP · Dr. S', date: '2026-03-15', said: 'probably stress; come back in 3 months', next: 'labs ordered' });
  await add('test', { name: 'Ferritin', date: '2026-03-20', result: '11 ng/mL', status: 'abnormal' });
  await add('treatment', { name: 'Sertraline 50mg', date: '2026-04-01', outcome: 'no change after 3 months' });
  await add('event', { name: 'Changed jobs', date: '2026-05-01' });
  const after = await page.evaluate(() => ({ n: document.querySelectorAll('#log li').length, fog: document.querySelector('#symChips button[data-id="fog"]') && document.querySelector('#symChips button[data-id="fog"]').getAttribute('aria-pressed'), months: [...document.querySelectorAll('#log .lg-month h3')].map(h => h.textContent) }));
  rec(W + 'five UI-added records appear in the log', after.n === before + 5, `before=${before} after=${after.n}`);
  rec(W + 'new symptom lights matching picker chip (fog)', after.fog === 'true', 'fog pressed=' + after.fog);
  rec(W + 'log grouped newest-first by month', after.months[0] === 'May 2026', after.months.join(' | '));
  const ferRow = await page.evaluate(() => { const r = [...document.querySelectorAll('#testedGroups *')].find(x => /Ferritin and iron/.test(x.textContent) && x.children.length && x.textContent.length < 900); return r ? r.textContent.replace(/\s+/g, ' ').trim().slice(0, 220) : null; });
  rec(W + 'consider-list ticks Ferritin from the logged test (manual check)', !!ferRow && /11 ng\/mL|Mar 2026|Mar 20/.test(ferRow || ''), ferRow);

  // 3. Validation: empty required field, swapped dates
  await page.click('#types button[data-type="symptom"]');
  await page.fill('#fields [data-f="date"]', '2026-01-01');
  await page.click('#addBtn');
  const err = await page.evaluate(() => { const e = document.getElementById('err'); return { shown: e.classList.contains('show'), text: e.textContent, visible: getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0 }; });
  rec(W + 'missing required field shows an error', err.shown && err.visible && /Symptom is needed/.test(err.text), JSON.stringify(err));
  await add('symptom', { name: 'Swapped dates', date: '2026-06-10', end: '2026-06-01', severity: '1' });
  const swapped = await page.evaluate(() => JSON.parse(localStorage.getItem('herada-ledger-v1')).records.find(r => r.name === 'Swapped dates'));
  rec(W + 'end-before-start dates are swapped, not rejected', swapped && swapped.date === '2026-06-01' && swapped.end === '2026-06-10', JSON.stringify(swapped));

  // 4. Remove an entry
  const n1 = await page.$$eval('#log li', l => l.length);
  await page.click('#log button[data-rm]');
  const n2 = await page.$$eval('#log li', l => l.length);
  rec(W + 'remove button deletes one entry', n2 === n1 - 1, `${n1} -> ${n2}`);

  // 5. Picker interaction
  const condBefore = await page.$eval('#condResult', e => e.textContent.trim().length);
  await page.click('#symChips button[data-id="fog"]'); // toggles off
  await page.click('#symChips button[data-id="fog"]'); // back on
  const condAfter = await page.$eval('#condResult', e => e.textContent.trim().length);
  rec(W + 'picker renders condition results for pressed chips', condAfter > 50, `len before=${condBefore} after=${condAfter}`);

  // 6. Today's visit: want + a suggestion chip
  await page.fill('#want', 'A plan for the fatigue.');
  const qchip = await page.$('#qChips button');
  if (qchip) { await qchip.click(); }
  const q0 = await page.$eval('[data-q="0"]', i => i.value);
  const q1 = await page.$eval('[data-q="1"]', i => i.value);
  rec(W + 'suggestion chip fills the first EMPTY question slot (slot 2 here) and leaves written ones alone', !!qchip && q0 === 'Q one' && q1.length > 5, 'q0=' + q0 + ' q1=' + q1);
  const persisted = await page.evaluate(() => JSON.parse(localStorage.getItem('herada-ledger-v1')));
  rec(W + 'want + questions persist to storage', persisted.want === 'A plan for the fatigue.' && persisted.questions[0] === q0 && persisted.questions[1] === q1);

  // Populated screenshots + print PDF
  await page.screenshot({ path: path.join(OUT, `ledger-populated-${width}.png`), fullPage: true });
  const dates = await page.evaluate(() => { window.dispatchEvent(new Event('beforeprint')); return ['printDate1', 'printDate3', 'printDate4'].map(id => (document.getElementById(id) || {}).textContent || ''); });
  rec(W + 'print date stamps are filled at print time', dates.every(d => /\d{4}/.test(d)), JSON.stringify(dates));
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(OUT, `ledger-populated-print-${width}.pdf`), format: 'Letter', printBackground: true });
  await page.emulateMedia({ media: 'screen' });

  // 7. Copy the kit as text
  await page.click('#copyKit');
  await page.waitForTimeout(300);
  const clip = await page.evaluate(() => navigator.clipboard.readText().catch(e => 'ERR ' + e.message));
  const copiedVis = await page.$eval('#copied', e => getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).opacity !== '0' || e.classList.contains('show'));
  rec(W + 'copy kit writes clipboard text starting with the kit header', typeof clip === 'string' && clip.startsWith('THE VISIT KIT'), (clip || '').slice(0, 80).replace(/\n/g, ' / '));
  rec(W + 'copied confirmation is shown', copiedVis);
  fs.writeFileSync(path.join(OUT, `kit-text-${width}.txt`), clip || '');

  // 8. PNG export
  const [dlPng] = await Promise.all([page.waitForEvent('download', { timeout: 15000 }).catch(() => null), page.click('#exportPng')]);
  if (dlPng) { const p = path.join(OUT, `timeline-${width}.png`); await dlPng.saveAs(p); const b = fs.readFileSync(p); rec(W + 'timeline PNG export downloads a real PNG', b.length > 2000 && b[0] === 0x89 && b[1] === 0x50, `${b.length} bytes, name=${dlPng.suggestedFilename()}`); } else rec(W + 'timeline PNG export downloads a real PNG', false, 'no download event');

  // 9. Backup: unencrypted, encrypted, clear, restore, wrong passphrase, junk file
  const recCount = persisted.records.length - 1 + 1; // after remove + swapped add; recompute from storage
  const countNow = await page.evaluate(() => JSON.parse(localStorage.getItem('herada-ledger-v1')).records.length);
  const [dl1] = await Promise.all([page.waitForEvent('download', { timeout: 15000 }), page.click('#saveBackup')]);
  const plainPath = path.join(OUT, `backup-plain-${width}.json`); await dl1.saveAs(plainPath);
  const plain = JSON.parse(fs.readFileSync(plainPath, 'utf8'));
  rec(W + 'unencrypted backup has the expected shape and record count', plain.herada_ledger === 1 && plain.encrypted === false && plain.data.records.length === countNow, `records=${plain.data && plain.data.records.length} vs ${countNow}; file=${dl1.suggestedFilename()}`);
  await page.fill('#passphrase', 'correct horse battery');
  const [dl2] = await Promise.all([page.waitForEvent('download', { timeout: 20000 }), page.click('#saveBackup')]);
  const encPath = path.join(OUT, `backup-enc-${width}.json`); await dl2.saveAs(encPath);
  const enc = JSON.parse(fs.readFileSync(encPath, 'utf8'));
  rec(W + 'encrypted backup has salt/iv/ciphertext and no plaintext', enc.encrypted === true && enc.salt && enc.iv && typeof enc.data === 'string' && !/Brain fog/.test(fs.readFileSync(encPath, 'utf8')));
  const passCleared = await page.$eval('#passphrase', i => i.value);
  rec(W + 'passphrase field cleared after encrypted save', passCleared === '');
  await page.click('#clearAll');
  const cleared = await page.evaluate(() => ({ key: localStorage.getItem('herada-ledger-v1'), items: document.querySelectorAll('#log li').length, empty: !!document.querySelector('#log .lg-empty') }));
  rec(W + 'clear all empties the log and storage', cleared.key === null && cleared.items === 0 && cleared.empty, JSON.stringify(cleared));
  promptAnswer = 'wrong pass';
  await page.setInputFiles('#loadBackup', encPath); await page.waitForTimeout(800);
  const stillEmpty = await page.$$eval('#log li', l => l.length);
  rec(W + 'wrong passphrase refuses the backup', stillEmpty === 0 && dialogs.some(d => /didn.t unlock/.test(d)), dialogs.slice(-1)[0]);
  promptAnswer = 'correct horse battery';
  await page.setInputFiles('#loadBackup', encPath); await page.waitForTimeout(1200);
  const restored = await page.evaluate(() => ({ n: document.querySelectorAll('#log li').length, s: JSON.parse(localStorage.getItem('herada-ledger-v1') || 'null') }));
  rec(W + 'encrypted backup restores all records', restored.n === countNow && restored.s && restored.s.records.length === countNow, `restored=${restored.n} expected=${countNow}`);
  const junk = path.join(OUT, 'junk.json'); fs.writeFileSync(junk, JSON.stringify({ hello: 'world' }));
  await page.setInputFiles('#loadBackup', junk); await page.waitForTimeout(500);
  rec(W + 'junk file is rejected with a message', dialogs.some(d => /look like a Ledger backup/.test(d)), dialogs.slice(-1)[0]);
  const nAfterJunk = await page.$$eval('#log li', l => l.length);
  rec(W + 'junk file leaves data intact', nAfterJunk === countNow);
  await page.setInputFiles('#loadBackup', plainPath); await page.waitForTimeout(800);
  rec(W + 'plain backup load asks before replacing, then replaces', dialogs.some(d => /Replace the \d+ entries/.test(d)) && (await page.$$eval('#log li', l => l.length)) === countNow);

  // 10. Blocked storage: page must still work in memory
  const ctx2 = await browser.newContext({ viewport: { width, height: 900 }, ignoreHTTPSErrors: !!process.env.HTTPS_PROXY });
  await ctx2.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); });
  const p2 = await ctx2.newPage(); const errs2 = [];
  p2.on('pageerror', e => errs2.push(e.message));
  await p2.goto(BASE, { waitUntil: 'networkidle' });
  await p2.click('#types button[data-type="event"]'); await p2.fill('#fields [data-f="name"]', 'In-memory only'); await p2.fill('#fields [data-f="date"]', '2026-02-02'); await p2.click('#addBtn');
  const memN = await p2.$$eval('#log li', l => l.length);
  rec(W + 'with storage blocked the page still renders and accepts entries', errs2.length === 0 && memN === 1, `errors=${errs2.join(' | ')} items=${memN}`);
  await ctx2.close();

  rec(W + 'no page errors or console errors during the whole flow', errors.length === 0, errors.slice(0, 5).join(' | '));
  fs.writeFileSync(path.join(OUT, `dialogs-${width}.txt`), dialogs.join('\n'));
  await browser.close();
}
(async () => {
  for (const w of [390, 1280]) await run(w);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 1));
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} passed (artifacts in ${OUT})`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(1); });
