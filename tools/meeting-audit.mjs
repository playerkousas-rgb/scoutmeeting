#!/usr/bin/env node
/* 集會欄位／時間統一檢查（零依賴，改 data 後即刻可跑）
 *
 *   node tools/meeting-audit.mjs          逐場列表
 *   node tools/meeting-audit.mjs --strict 有問題 exit 1（合併／部署前用）
 *   node tools/meeting-audit.mjs --json   出 JSON 俾其他工具用
 *
 * 規則（同 App 實際 render 嘅格式一致）：
 *   1. tid c01–c24 唔可以重複；n/month/badge/venue/form/duration/goal/evidence/gap 齊
 *   2. data.program 9 段，每段有標題，分鐘係 ≥0 嘅數字
 *   3. Σ(程序分鐘) + (buffer||0) = duration（buffer = 報到／小息／收場等無逐段列出嘅時間）
 *   4. bag ≥3、data.bag ≥3、家長通知（字串或 items 清單）、safety ≥3、practical 齊
 *   5. worksheet 有 prompts 或 fields（≥3 題）；observation 有 items（≥3 條）
 * 工作紙兩種格式（prompts／fields）同觀察兩種格式（array／{items}）都算合格，因為
 * App.worksheetHtml 同 renderMeeting 兩邊都有分支處理。
 */
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of fs.readdirSync(path.join(root, 'js')).filter(f => /^c\d\d-/.test(f)).sort()) {
  vm.runInContext(fs.readFileSync(path.join(root, 'js', f), 'utf8'), ctx, { filename: f });
}
vm.runInContext(fs.readFileSync(path.join(root, 'js', 'data.js'), 'utf8'), ctx, { filename: 'data.js' });
const DATA = ctx.DATA;

const rows = [];
const seen = new Set();
for (const m of DATA.meetings) {
  const issues = [];
  if (!/^c\d\d$/.test(m.tid || '')) issues.push('tid 格式');
  if (seen.has(m.tid)) issues.push('tid 重複');
  seen.add(m.tid);
  for (const k of ['n', 'month', 'badge', 'venue', 'form', 'goal', 'evidence', 'gap']) {
    if (!m[k] || !String(m[k]).trim()) issues.push('缺 ' + k);
  }
  if (!(Number(m.duration) > 0)) issues.push('duration 唔係正數');

  const d = m.data || {};
  const prog = d.program;
  if (!Array.isArray(prog) || prog.length !== 9) issues.push('程序唔係 9 段（' + (prog ? prog.length : 0) + '）');
  let sum = 0, badMin = 0;
  (prog || []).forEach((p, i) => {
    const v = typeof p.n === 'string' ? p.t : p.min;   /* 兩種寫法：{n:1,min} 同 {n:'步驟',t} */
    if (typeof v !== 'number' || !isFinite(v) || v < 0) badMin++;
    else sum += v;
    if (!(p.label || p.n)) issues.push('第 ' + (i + 1) + ' 段冇名');
  });
  if (badMin) issues.push(badMin + ' 節分鐘唔係數字');
  const buffer = Number(m.buffer || 0);
  if (!isFinite(buffer) || buffer < 0) issues.push('buffer 唔係非負數');
  if (sum + buffer !== Number(m.duration)) issues.push('時間唔啱：' + sum + ' + ' + buffer + ' ≠ ' + m.duration);

  if (!Array.isArray(m.bag) || m.bag.length < 3) issues.push('執袋清單少過 3 項');
  if (!Array.isArray(d.bag) || d.bag.length < 3) issues.push('data.bag 少過 3 項');
  const nt = d.notice;
  const ntOk = typeof nt === 'string' ? nt.trim().length >= 80 : !!(nt && Array.isArray(nt.items) && nt.items.length >= 3);
  if (!ntOk) issues.push('家長通知唔齊');
  if (!Array.isArray(d.safety) || d.safety.length < 3) issues.push('安全注意少過 3 條');
  if (!d.practical) issues.push('缺實戰後備');

  const ws = d.worksheet || {};
  const wsN = (ws.prompts || ws.fields || []).length;
  if (wsN < 3) issues.push('工作紙題目少過 3 題');
  const ob = d.observation;
  const obItems = Array.isArray(ob) ? ob : (ob && ob.items) || [];
  if (obItems.length < 3) issues.push('觀察記錄少過 3 條');

  rows.push({ tid: m.tid, n: m.n, dur: Number(m.duration), sum, buffer, segs: (prog || []).length, issues });
}

const bad = rows.filter(r => r.issues.length);
if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ total: rows.length, ok: rows.length - bad.length, bad, rows }, null, 2));
} else {
  console.log('場次  全場  程序+預留  段數  狀態');
  for (const r of rows) {
    console.log(r.tid.padEnd(5), String(r.dur).padStart(4), '  ' + (r.sum + '+' + r.buffer).padEnd(10), String(r.segs).padStart(2), '  ' + (r.issues.length ? '❌ ' + r.issues.join('；') : '✅'));
  }
  console.log('\n共 ' + rows.length + ' 場；' + (rows.length - bad.length) + ' 場齊全' + (bad.length ? '；' + bad.length + ' 場有問題' : '。'));
}
if (process.argv.includes('--strict') && bad.length) process.exit(1);
