/* v42 守門測試（2026-10-22 對齊）
 * 目的：把今次 11 回合嘅成果鎖死，唔好日後改返舊樣：
 *   - 官方綱要主入口／版本句
 *   - 制服示意圖一定收喺 <details>（非官方）
 *   - 分批（興趣章／工作紙 12）
 *   - 意見回報 data-app 唔可以用單一支部名
 *   - 預快取核心 ≤ 2MB、圖全部入 CACHE_EXTRA
 *   - 24 場時間合約（呼叫 tools/meeting-audit.mjs --strict）
 *   - App.wrap 登記處
 *   - 文件齊（docs/）
 * 跑法：node tests/v42.mjs（npm test 會自動跑）
 */
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
let fail = 0;
const ok = (cond, msg) => { console.log((cond ? '✓ ' : '✗ FAIL ') + msg); if (!cond) fail++; };
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));

/* ── 1. 官方連結／版本 ── */
const dataSrc = read('js/data.js');
ok(dataSrc.includes("url: 'https://scoutsinfohub.org.hk/ScoutTrainingScheme/FullVersion-zh.pdf'"),
  '綱要主入口＝童軍資訊站全本 PDF');
ok(!dataSrc.includes('prog.scouting.org.hk/scouts/ScoutTrainingScheme/FullVersion-zh.pdf'),
  '已移除會 302 去首頁嘅舊 PDF 死鏈');
ok(/version:\s*'2026-06-06 版（2026-08-15 生效/.test(dataSrc), '版本句寫 2026-06-06 版＋生效日');

const appSrc = read('js/app.js');
ok(!appSrc.includes('2026 第十版'), '制服頁唔再寫錯「第十版」');
ok(appSrc.includes('第四版'), '制服頁寫「第四版」');
ok((appSrc.match(/App\.figFold/g) || []).length >= 8, '制服示意圖用 App.figFold 收起（≥8 處）');
ok(appSrc.includes('示意圖・非官方'), '示意圖摘要明寫「示意圖・非官方」');

/* ── 2. 精簡／列印 ── */
ok(appSrc.includes('App.openAllDetails'), '有 App.openAllDetails()');
ok(appSrc.includes("addEventListener('beforeprint'") || appSrc.includes('addEventListener("beforeprint"'), '有 beforeprint 自動開 details');
ok(appSrc.includes('afterprint'), '有 afterprint 還原');
ok(appSrc.includes('cer-fold') && appSrc.includes('game-more') && appSrc.includes('ws-fold') && appSrc.includes('fig-fold'),
  '四類摺疊元件齊（儀式／遊戲／工作紙／示意圖）');

/* ── 3. 分批 ── */
ok(appSrc.includes('App.badgeBatch = 12'), '興趣章首批 12');
ok(appSrc.includes('App.wsBatch = 12'), '工作紙首批 12');
ok(appSrc.includes('睇多啲'), '有「睇多啲」按鈕');

/* ── 4. 集會目錄／續帶 ── */
for (const t of ['continue-card', 'done-btn', 'plan-result', "App.store.set('last'", "App.store.set('done'", 'App.toggleDone']) {
  ok(appSrc.includes(t), '集會目錄有 ' + t);
}

/* ── 5. 意見回報 ── */
const indexSrc = read('index.html');
ok(indexSrc.includes('https://scout-admin-blue.vercel.app/widget.js'), 'index.html 有官方 widget');
ok(indexSrc.includes('data-app="童軍集會"'), 'data-app＝童軍集會');
ok(/data-app="童軍集會"[^>]*defer|defer[^>]*data-app="童軍集會"/.test(indexSrc), 'widget 有 defer');
ok(!/data-app="童軍"/.test(indexSrc), '冇用單一支部名「童軍」做 data-app');
ok(appSrc.includes("app: '童軍集會'"), 'App.FEEDBACK.app＝童軍集會');
ok(appSrc.includes('report.html?app='), '有網頁版表單 URL');
ok(appSrc.includes('唔好填小朋友姓名、班別、地址或相片'), '模板有私隱界線句');
ok(appSrc.includes('App.feedbackCard') && appSrc.includes('App.copyFeedback'), '有離線後備（卡片／複製）');
ok(read('css/app.css').includes('#scoutw-fab'), '有 widget 浮動掣 CSS（避開 tabbar）');

/* ── 6. Service Worker：核心／背景拆開 ── */
const swSrc = read('sw.js');
const assets = [...(swSrc.match(/var ASSETS = \[([\s\S]*?)\];/)[1].matchAll(/"([^"]+)"/g))].map(m => m[1]);
const extra = [...(swSrc.match(/var CACHE_EXTRA = \[([\s\S]*?)\];/)[1].matchAll(/"([^"]+)"/g))].map(m => m[1]);
let coreBytes = 0, extraBytes = 0;
for (const a of assets) { const f = path.join(root, a.replace('./', '')); if (fs.existsSync(f) && fs.statSync(f).isFile()) coreBytes += fs.statSync(f).size; }
for (const a of extra) { const f = path.join(root, a.replace('./', '')); if (fs.existsSync(f)) extraBytes += fs.statSync(f).size; else fail++; }
ok(assets.length >= 30 && assets.length <= 60, '核心預快取 ' + assets.length + ' 檔（目標 30–60）');
ok(coreBytes < 2 * 1024 * 1024, '核心預快取 ' + (coreBytes / 1048576).toFixed(2) + ' MB（<2MB）');
ok(!assets.some(a => a.startsWith('./img/')), '核心 ASSETS 冇圖片（全部改背景補）');
ok(extra.length >= 120 && extra.every(a => a.startsWith('./img/')), 'CACHE_EXTRA 全部圖片（' + extra.length + ' 張）');
ok(swSrc.includes('CACHE_EXTRA') && swSrc.includes('CACHE_READY'), 'SW 收到 CACHE_EXTRA 會背景補＋回報 CACHE_READY');
ok(swSrc.includes('status: 404'), '圖片 miss 老實回 404（唔回 index.html 扮圖）');
const cacheVer = (swSrc.match(/scout-v(\d+)-c24-(\d+)/) || [])[1];
ok(cacheVer === '42', 'CACHE 版號 v42（實際 v' + cacheVer + '）');
ok(read('README.md').includes('scout-v' + cacheVer + '-c24'), 'README cache 版號同步');

/* ── 7. 24 場時間合約（用官方工具，避免測試自己再寫一套） ── */
const audit = spawnSync(process.execPath, [path.join(root, 'tools/meeting-audit.mjs'), '--strict'], { encoding: 'utf8' });
ok(audit.status === 0, 'tools/meeting-audit.mjs --strict exit 0（24 場齊全）');
if (audit.status !== 0) console.log(audit.stdout, audit.stderr);

/* ── 8. App.wrap 登記處 ── */
const mem = {};
const el = () => ({
  innerHTML: '', textContent: '', className: '', style: {}, dataset: {}, children: [],
  classList: { add(){}, remove(){}, toggle(){}, contains(){ return false; } },
  setAttribute(){}, getAttribute(){ return null; }, removeAttribute(){}, appendChild(){},
  insertBefore(){}, querySelector(){ return null; }, querySelectorAll(){ return []; },
  addEventListener(){}, focus(){}, click(){}, closest(){ return null; }
});
const sb = {
  console,
  localStorage: { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; } },
  location: { hash: '#plan', href: '', replace(){}, assign(){} },
  navigator: { onLine: true, serviceWorker: null },
  setTimeout: () => 0, clearTimeout(){}, setInterval: () => 0, clearInterval(){},
  addEventListener(){}, scrollTo(){}, confirm: () => true,
  document: Object.assign(el(), { getElementById(){ return null; }, createElement(){ return el(); }, querySelector(){ return null; }, querySelectorAll(){ return []; }, addEventListener(){}, body: el(), documentElement: el() })
};
sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);
vm.runInContext(appSrc, sb, { filename: 'app.js' });
const App = sb.App;
ok(typeof App.wrap === 'function' && typeof App.wrapOn === 'function', '有 App.wrap／App.wrapOn');
let threw = false;
try { App.wrap('doesNotExist', 'x', function(){}); } catch (e) { threw = true; }
ok(threw, 'App.wrap 對唔存在嘅 method 會 throw（唔會靜靜失敗）');
App.__probe = function (n) { return n + 1; };
App.wrap('__probe', 'test-layer', function (prev, args) { return prev.apply(this, args) * 10; });
ok(App.__probe(4) === 50, 'App.wrap 包裝後仍然行到原 method（4 → 5 → 50）');
ok(App._wrapChain.__probe.length === 1 && App._wrapChain.__probe[0].id === 'test-layer', '包裝層有記入 App._wrapChain');

/* ── 9. 文件齊 ── */
for (const f of ['docs/dialogue-align-20261022.md', 'docs/feedback-system.md', 'docs/app-scorecard-20261022.md', 'docs/meeting-upgrade-guide-20261022.md', 'tools/meeting-audit.mjs']) {
  ok(exists(f), '文件／工具存在：' + f);
}
const align = read('docs/dialogue-align-20261022.md');
ok((align.match(/^## 第 \d+ 回合/gm) || []).length === 11, '對齊文件有 11 回合');
for (const k of ['## A. 內容層', '## B. 介面層', '## C. 系統層', '## D. 文件層', '## ⚠️ 共通「唔可以改」']) {
  ok(align.includes(k), '對齊文件有 ' + k);
}

console.log('\n' + (fail ? '❌ v42 守門：' + fail + ' 項 FAIL' : '🎉 v42 守門全部通過'));
process.exit(fail ? 1 : 0);
