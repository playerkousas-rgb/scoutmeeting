/* runtime：用 DOM stub 將全部版面（同分頁）render 一次，捉 runtime error／undefined 漏出畫面。
 * 載入次序必須係：c01–c24 lessons → data → 其餘模組 → app（否則 data.js 會 ReferenceError: C01 is not defined）
 * 執行：node tests/runtime.mjs（或 npm run test:runtime）
 */
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
let fail = 0;
const ok = (c, msg) => { console.log((c ? '✓ ' : '✗ FAIL ') + msg); if (!c) fail++; };

/* ── 極簡 DOM stub（夠 render 用）── */
function el(tag){
  const o = {
    tagName: (tag || 'div').toUpperCase(), innerHTML: '', className: '', textContent: '', value: '', href: '', id: '', title: '',
    style: {}, dataset: {}, children: [], parentNode: null, attrs: {},
    classList: { _s: new Set(),
      add(...c){ c.forEach(x => this._s.add(x)); }, remove(...c){ c.forEach(x => this._s.delete(x)); },
      toggle(c, v){ if (v === undefined) v = !this._s.has(c); v ? this._s.add(c) : this._s.delete(c); }, contains(c){ return this._s.has(c); } },
    appendChild(c){ if (c) { if (c.parentNode) c.parentNode.children.splice(c.parentNode.children.indexOf(c), 1); c.parentNode = o; o.children.push(c); } return c; },
    insertBefore(c){ return o.appendChild(c); },
    removeChild(c){ const i = o.children.indexOf(c); if (i >= 0) { o.children.splice(i, 1); c.parentNode = null; } return c; },
    setAttribute(k, v){ o.attrs[k] = v; if (k === 'id') o.id = v; if (k === 'class') o.className = v; if (k.startsWith('data-')) o.dataset[k.slice(5)] = v; },
    getAttribute(k){ return o.attrs[k] !== undefined ? o.attrs[k] : null; },
    removeAttribute(k){ delete o.attrs[k]; }, addEventListener(){}, focus(){}, click(){}, remove(){}, matches(){ return false; },
    cloneNode(){ const c = el(o.tagName); c.innerHTML = o.innerHTML; c.className = o.className; return c; },
    _all(out){ (o.children || []).forEach(c => { out.push(c); if (c._all) c._all(out); }); return out; },
    querySelectorAll(sel){ const cls = sel.replace(/^\./, '');
      return o._all([]).filter(c => (' ' + (c.className || '') + ' ').includes(' ' + cls + ' ')); },
    querySelector(sel){ return o.querySelectorAll(sel)[0] || null; },
    closest(){ return null; }
  };
  return o;
}
const mem = {};
const body = el('body');
const sb = {
  console,
  localStorage: { getItem: k => (k in mem ? mem[k] : null), setItem: (k, v) => { mem[k] = String(v); }, removeItem: k => { delete mem[k]; }, clear: () => { for (const k in mem) delete mem[k]; } },
  location: { hash: '#plan', href: '', replace(){}, assign(){} },
  navigator: { onLine: true, serviceWorker: { register: () => Promise.resolve() } },
  setTimeout: () => 0, clearTimeout(){}, setInterval: () => 0, clearInterval(){},
  addEventListener(){}, scrollTo(){}, confirm: () => true, matchMedia: () => ({ matches: false, addEventListener(){} }),
  fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve({}) }),
  document: Object.assign(el('document'), {
    documentElement: el('html'), body,
    createElement: t => el(t),
    getElementById: id => body._all([]).find(x => x.id === id) || null,
    querySelector: s => body.querySelector(s), querySelectorAll: s => body.querySelectorAll(s),
    addEventListener(){}, head: el('head')
  })
};
sb.window = sb; sb.globalThis = sb;
vm.createContext(sb);

const lessons = fs.readdirSync(path.join(root, 'js')).filter(f => /^c\d\d-/.test(f)).sort().map(f => 'js/' + f);
const files = lessons.concat(['js/data.js', 'js/interests.js', 'js/ceremony.js', 'js/uniform.js', 'js/diagrams.js', 'js/svg-kit.js', 'js/songs.js', 'js/figs.js', 'js/projector.js', 'js/app.js']);
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sb, { filename: f });
ok(true, '載入次序正確：c01–c24 → data → 模組 → app（' + files.length + ' 個檔案）');

const App = sb.App, DATA = sb.DATA;
ok(!App.__err, 'app.js 載入冇 throw');

/* 全部頁面 render 一次 */
const pages = ['plan', 'play', 'skills', 'uniform', 'ceremony', 'book', 'badges', 'print', 'songs', 'search'];
for (const p of pages) {
  if (typeof App.pages[p] !== 'function') { ok(false, 'pages.' + p + ' 唔存在'); continue; }
  try { const node = App.pages[p](); ok(!!node, 'pages.' + p + ' render'); }
  catch (e) { ok(false, 'pages.' + p + ' render：' + e.message); }
}

/* 分頁版 render（sub 路由） */
for (const s of ['rope', 'care', 'map', 'pack', 'camp', 'pioneer', 'track', 'field', 'aid']) {
  try { App.pages.skills(s); ok(true, 'skills/' + s + ' render'); } catch (e) { ok(false, 'skills/' + s + '：' + e.message); }
}
for (const s of ['land', 'sea', 'air', 'badge', 'acc', 'check']) {
  try { App.pages.uniform(s); ok(true, 'uniform/' + s + ' render'); } catch (e) { ok(false, 'uniform/' + s + '：' + e.message); }
}
for (const c of sb.CEREMONY.cards) {
  try { App.pages.ceremony(c.k); ok(true, 'ceremony/' + c.k + ' render'); } catch (e) { ok(false, 'ceremony/' + c.k + '：' + e.message); }
}
for (const s of sb.SONGS.sheets) {
  try { App.pages.songs(s.k); ok(true, 'songs/' + s.k + ' render'); } catch (e) { ok(false, 'songs/' + s.k + '：' + e.message); }
}

/* 24 場教案全部 render（分頁化之後每節都要落到 pane） */
for (const m of DATA.meetings) {
  try {
    const node = App.renderMeeting(m.tid);
    const panes = node.querySelectorAll('.tabpane');
    ok(panes.length >= 1, m.tid + ' 教案 render（' + panes.length + ' 版）');
  } catch (e) { ok(false, m.tid + '：' + e.message); }
}

/* 畫面唔應該漏 undefined */
let undef = 0;
for (const p of pages) {
  try { const node = App.pages[p](); if (String(node.innerHTML).includes('undefined')) undef++; } catch (e) {}
}
ok(undef === 0, '全部頁面 HTML 冇漏 "undefined"');

/* 清 agent 字句（app 內可見字句） */
const appSrc = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
for (const bad of ['搵今日集會', '黑箱作業', '一版講一個遊戲', '🅰️', '🅱️']) {
  ok(!appSrc.includes(bad), 'app.js 冇「' + bad + '」字句');
}

console.log(fail === 0 ? '\n🎉 runtime 全部通過' : '\n❌ runtime 有 ' + fail + ' 項失敗');
process.exit(fail === 0 ? 0 : 1);
