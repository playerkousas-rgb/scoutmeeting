import { readFileSync, existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { createContext, runInContext } from 'vm';
const root = new URL('..', import.meta.url).pathname;
const lessonFiles = ['js/c01-lesson.js','js/c02-lesson.js','js/c03-lesson.js','js/c04-lesson.js','js/c05-lesson.js','js/c06-lesson.js','js/c07-lesson.js','js/c08-lesson.js','js/c09-lesson.js','js/c10-lesson.js','js/c11-lesson.js','js/c12-lesson.js','js/c13-lesson.js','js/c14-lesson.js','js/c15-lesson.js','js/c16-lesson.js','js/c17-lesson.js','js/c18-lesson.js','js/c19-lesson.js','js/c20-lesson.js','js/c21-lesson.js','js/c22-lesson.js','js/c23-lesson.js','js/c24-lesson.js'];
const files = ['index.html','manifest.webmanifest','sw.js','css/app.css','js/data.js','js/interests.js','js/ceremony.js','js/uniform.js','js/diagrams.js','js/svg-kit.js','js/songs.js','js/figs.js','js/app.js','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png',
  'img/fig/cer-open.avif','img/fig/cer-close.avif','img/fig/cer-drill.avif','img/fig/cer-flag.avif',
  'img/fig/cer-oath.avif','img/fig/cer-salute.avif','img/fig/fire-circle.avif','img/fig/fire-song.avif',  'img/fig/game-ball.avif','img/fig/game-shape.avif','img/fig/game-tarp.avif','img/fig/game-pack.avif',
  'img/fig/game-relay-cards.avif','img/fig/game-tug.avif','img/fig/game-aid.avif','img/fig/game-orienteer.avif',
  'img/fig/game-beachflag.avif','img/fig/game-water.avif','img/fig/game-lineup.avif',
  'img/fig/skill-ropecare.avif','img/fig/skill-legend.avif','img/fig/skill-tent.avif',
  'img/fig/skill-stove.avif','img/fig/skill-rice.avif','img/fig/skill-lost.avif',
  'img/fig/skill-knife.avif','img/fig/skill-sos.avif', ...lessonFiles];
for (const f of files) {
  if (!existsSync(root + f)) { console.error('❌ Missing', f); process.exit(1); }
  console.log('✅', f);
}
const interestsSrc = readFileSync(root + 'js/interests.js', 'utf8');
const bm = interestsSrc.match(/k:'[a-z_]+',\s*en:'/g);
console.log('✅ 興趣章數：', bm ? bm.length : 0);
const html = readFileSync(root + 'index.html', 'utf8');
['scoutbadge.vercel.app','districtbadgesystem30.vercel.app','scout-circulars.vercel.app','1MhGE2LP3kiCEmyJAGUfIlLzL0Iq4fK33','js/ceremony.js','js/uniform.js','js/svg-kit.js','js/songs.js','js/figs.js', ...lessonFiles, 'icons/icon-192.png'].forEach(u => {
  if (!html.includes(u)) { console.error('❌ index.html 缺少', u); process.exit(1); }
});
if (html.includes('js/redesign.js')) { console.error('❌ index.html 仲有死引用 js/redesign.js'); process.exit(1); }
console.log('✅ index.html 外連同新 script 齊（redesign.js 死引用已清）');
if (!interestsSrc.includes('通告圖書館') || !interestsSrc.includes('訂閱')) { console.error('❌ 訓練班步驟未提及訂閱通告圖書館'); process.exit(1); }
console.log('✅ 訓練班程序包含「訂閱通告圖書館」');
if (!interestsSrc.includes('只係報考專科徽章用')) { console.error('❌ 未明確 districtbadgesystem30 只係報專章'); process.exit(1); }
// v19：興趣組＝團內考核，唔使自己入區系統
if (!interestsSrc.includes('團內考核')) { console.error('❌ interests.js 未改成團內考核流程'); process.exit(1); }
console.log('✅ 已標明 districtbadgesystem30 為專章系統＋興趣組團內考核');
const uniformSrc = readFileSync(root + 'js/uniform.js', 'utf8');
['www.scout.org.hk/uploads/member/Scout_B.1.jpg','www.scout.org.hk/uploads/member/Scout_G.1.jpg','uniform.scouting.org.hk','p013-23.pdf'].forEach(u => {
  if (!uniformSrc.includes(u)) { console.error('❌ 制服缺少官方圖/參考', u); process.exit(1); }
});
// v19：陸／海／空分支小分頁
if (!uniformSrc.includes('UNIFORM.branches') || !uniformSrc.includes("'sea'") || !uniformSrc.includes("'air'")) { console.error('❌ uniform.js 缺陸海空 branches'); process.exit(1); }
console.log('✅ 制服官網圖齊＋陸海空分支資料');
const ceremonySrc = readFileSync(root + 'js/ceremony.js','utf8');
['團集會儀式（開始）','團集會儀式（結束）','中式隊列基本動作','升旗禮','宣誓儀式','童軍三指敬禮','童軍團呼'].forEach(c => {
  if (!ceremonySrc.includes(c)) { console.error('❌ 儀式卡缺少', c); process.exit(1); }
});
// v19：儀式卡要附圖（fig 欄位）
if ((ceremonySrc.match(/fig:'/g)||[]).length < 6) { console.error('❌ 儀式卡 fig 圖解欄不足 6 套'); process.exit(1); }
console.log('✅ 7 套儀式卡存在（6 套附圖解）');

function checkLesson(file, tid, name, keys, expectedSegs){
  const src = readFileSync(root + file, 'utf8');
  keys.forEach(k=>{
    if (!src.includes(k)) { console.error('❌ '+tid+' 教案缺少', k); process.exit(1); }
  });
  const sandbox = {};
  createContext(sandbox);
  try { runInContext(src, sandbox, {filename:file}); }
  catch(e){ console.error('❌ '+tid+' parse error:', e.message); process.exit(1); }
  const obj = sandbox[tid];
  if (!obj || !Array.isArray(obj.program)) { console.error('❌ '+tid+' 無 program'); process.exit(1); }
  if (obj.program.length !== expectedSegs) { console.error('❌ '+tid+' program 應為'+expectedSegs+'段，實際', obj.program.length); process.exit(1); }
  if (!Array.isArray(obj.bag)) { console.error('❌ '+tid+' 缺 bag'); process.exit(1); }
  if (!Array.isArray(obj.safety)) { console.error('❌ '+tid+' 缺 safety'); process.exit(1); }
  console.log('✅ '+name+'：'+expectedSegs+'段程序齊');
}
checkLesson('js/c01-lesson.js','C01','c01',['加入小隊','立正','稍息','童軍動作','C01.program','C01.safety'],9);
checkLesson('js/c02-lesson.js','C02','c02',['貝登堡','白浪島','WOSM','百合花飾','C02.program'],9);
checkLesson('js/c03-lesson.js','C03','c03',['五星紅旗','保護自己三步','C03.scenarios','C03.program'],9);
checkLesson('js/c04-lesson.js','C04','c04',['義勇軍進行曲','三指敬禮','升旗','C04.program'],9);
checkLesson('js/c05-lesson.js','C05','c05',['我願以信譽為誓','C05.promise','C05.pledgeCard','C05.program'],9);
checkLesson('js/c06-lesson.js','C06','c06',['宣誓儀式','左手握手','C06.roles','C06.postCeremony','C06.trivia','C06.program'],9);
checkLesson('js/c07-lesson.js','C07','c07',['健康生活','小隊歡呼','21 天健康挑戰','C07.program'],9);
checkLesson('js/c08-lesson.js','C08','c08',['生態','自然筆記','家長同意書','Leave No Trace','C08.personalKit','C08.doNotBring','C08.roles','C08.postCeremony','C08.trivia','C08.program'],9);
checkLesson('js/c09-lesson.js','C09','c09',['1:25,000','等高線','圖例','執包三步','SOS','C09.trivia','C09.program'],9);
checkLesson('js/c10-lesson.js','C10','c10 一日郊野徒步',
  ['5 公里','安靜反思','撤退','Leave No Trace','中暑','C10.personalKit','C10.doNotBring','C10.postCeremony','C10.trivia','C10.roles','C10.program'],9);
checkLesson('js/c11-lesson.js','C11','c11 農曆新年團拜',
  ['揮春','團拜','鼓勵利是','左手握手','書法','年糕','過敏專區','哈姆立克','墨漬','C11.words','C11.roles','C11.postCeremony','C11.trivia','C11.worksheet','C11.program'],9);
checkLesson('js/c12-lesson.js','C12','c12 思善日',
  ['貝登堡','思善日','World Thinking Day','2 月 22','世界童軍','3 分鐘','電子蠟燭','捐款','自願','思善卡','誓詞','C12.countries','C12.roles','C12.postCeremony','C12.trivia','C12.worksheet','C12.bpMessage','C12.program'],9);
checkLesson('js/c13-lesson.js','C13','c13 先鋒工程（一）',
  ['平結','八字結','雙套結','半結','反手結','左壓右','婆婆結','接力賽','C13.knots','C13.trivia','C13.worksheet','C13.program'],9);
checkLesson('js/c14-lesson.js','C14','c14 先鋒工程（二）',
  ['稱人結','接繩結','繫木結','縮繩結','曳木結','收繩','保養','兔仔','拖木頭','十結小達人','C14.knots','C14.ropeCare','C14.trivia','C14.worksheet','C14.program'],9);
checkLesson('js/c15-lesson.js','C15','c15 營藝（一）',
  ['營藝','背囊','小刀','斧頭','手鋸','爐具','C15.trivia','C15.worksheet','C15.program'],9);
checkLesson('js/c16-lesson.js','C16','c16 小隊露營',
  ['露營','帳篷','營火','拔營','指南針','Leave No Trace','C16.personalKit','C16.doNotBring','C16.roles','C16.postCeremony','C16.trivia','C16.program'],9);
checkLesson('js/c17-lesson.js','C17','c17 七種急救',
  ['急救','流鼻血','燒傷','燙傷','抽筋','扭傷','割傷','刺傷','復原臥式','C17.firstaid','C17.trivia','C17.program'],9);
checkLesson('js/c18-lesson.js','C18','c18 母親節',
  ['母親節','康乃馨','心意卡','感恩','C18.roles','C18.postCeremony','C18.trivia','C18.program'],9);
checkLesson('js/c19-lesson.js','C19','c19 小隊會議',
  ['小隊會議','會議記錄','主席','小隊長','C19.trivia','C19.worksheet','C19.program'],9);
checkLesson('js/c20-lesson.js','C20','c20 頒發儀式',
  ['頒發儀式','探索獎章','證書','生活分享','C20.roles','C20.postCeremony','C20.trivia','C20.program'],9);
checkLesson('js/c21-lesson.js','C21','c21 暑期沙灘',
  ['暑期','沙灘','中暑','防曬','水上安全','淨灘','C21.personalKit','C21.doNotBring','C21.trivia','C21.program'],9);
checkLesson('js/c22-lesson.js','C22','c22 社區考察',
  ['社區','文化習俗','傳統節慶','訪問','C22.personalKit','C22.doNotBring','C22.trivia','C22.program'],9);
checkLesson('js/c23-lesson.js','C23','c23 游泳章',
  ['游泳','泳池','救生員','水上安全','踩水','HELP','C23.requirements','C23.roles','C23.trivia','C23.program'],9);
checkLesson('js/c24-lesson.js','C24','c24 模型製作',
  ['模型','STEAM','𠝹刀','膠水','C24.trivia','C24.worksheet','C24.program'],9);

const dataSrc = readFileSync(root+'js/data.js','utf8');
['sensitive:true','special:true','outdoor:true','personalKit'].forEach(t=>{
  if(!dataSrc.includes(t)){ console.error('❌ data 缺',t); process.exit(1); }
});
console.log('✅ data 標記齊');
const icon = readFileSync(root + 'icons/icon-192.png');
if (!(icon[0]===0x89 && icon[1]===0x50 && icon[2]===0x4E && icon[3]===0x47)) { console.error('❌ icon 非 PNG'); process.exit(1); }
{
  const i512 = readFileSync(root + 'icons/icon-512.png');
  const rd = (b)=>({w:b.readUInt32BE(16),h:b.readUInt32BE(20)});
  const a = rd(icon), b2 = rd(i512);
  if (a.w!==192||a.h!==192){ console.error('❌ icon-192 唔係 192×192，係', a.w+'x'+a.h); process.exit(1); }
  if (b2.w!==512||b2.h!==512){ console.error('❌ icon-512 唔係 512×512，係', b2.w+'x'+b2.h); process.exit(1); }
  const mask = readFileSync(root+'icons/icon-maskable-512.png');
  if (!(mask[0]===0x89 && mask[1]===0x50)){ console.error('❌ maskable icon 非 PNG'); process.exit(1); }
}
console.log('✅ v19 icon：192/512/maskable 齊晒（尺寸啱）');

const ctx={window:{addEventListener:()=>{},print:()=>{},scrollTo:()=>{}},document:{getElementById:()=>({appendChild:()=>{},innerHTML:'',classList:{add:()=>{},remove:()=>{},toggle:()=>{}},setAttribute:()=>{},onclick:null,style:{}}),querySelector:()=>null,querySelectorAll:()=>[],createElement:(t)=>({classList:{add:()=>{},remove:()=>{},toggle:()=>{}},setAttribute:()=>{},appendChild:()=>{},innerHTML:'',style:{}}),addEventListener:()=>{}},location:{hash:'',href:'',replace:()=>{}},navigator:{onLine:true,serviceWorker:{register:()=>new Promise(()=>{})}},addEventListener:()=>{},setTimeout:()=>0};
createContext(ctx);
['js/interests.js','js/ceremony.js','js/uniform.js','js/diagrams.js','js/svg-kit.js','js/songs.js','js/figs.js', ...lessonFiles, 'js/data.js','js/app.js'].forEach(f => {
  runInContext(readFileSync(root+f,'utf8'), ctx, {filename:f});
});
console.log('✅ JS 執行：', Object.keys(ctx.App.pages).join(','));
console.log('✅ 儀式卡',ctx.CEREMONY.cards.length,'制服類型',ctx.UNIFORM.types.length,'制服分支',ctx.UNIFORM.branches.length);
const codes=['C01','C02','C03','C04','C05','C06','C07','C08','C09','C10','C11','C12','C13','C14','C15','C16','C17','C18','C19','C20','C21','C22','C23','C24'];
for(let i=0;i<codes.length;i++){
  const c=codes[i];
  console.log('✅ '+c.toLowerCase(),'full=',ctx.DATA.meetings[i].full,'segs=',ctx[c].program.length);
}
console.log('✅ App.renderMeeting:',typeof ctx.App.renderMeeting);
for(let i=0;i<codes.length;i++){
  const tid=codes[i].toLowerCase();
  try{ ctx.App.renderMeeting(tid); }catch(e){ console.error('❌ renderMeeting('+tid+'):',e.message,e.stack.split('\n')[0]); process.exit(1); }
}
console.log('✅ renderMeeting(c01-c24) 正常');

// v17：遊戲庫＋現場工具
if(ctx.DATA.games.length!==12){ console.error('❌ 遊戲庫唔係 12 個'); process.exit(1); }
console.log('✅ 遊戲庫 12 個');
for (const f of ['patrolScore','drawLots','countdownStart','groupRandom']) {
  if(typeof ctx.App[f]!=='function'){ console.error('❌ 缺集會現場工具函數 '+f); process.exit(1); }
}
console.log('✅ 集會現場工具函數齊（已併入手冊）');
// v19：tab render——songs 取代 patrol；儀式/制服/手冊/技能帶 sub 都要 render 到
for (const p of ['print','play','skills','songs','badges','book','uniform','ceremony']) {
  try{ ctx.App.pages[p](); }catch(e){ console.error('❌ pages.'+p+':',e.message); process.exit(1); }
}
for (const s of ctx.CEREMONY.cards.map(c=>c.k)) { try{ ctx.App.pages.ceremony(s); }catch(e){ console.error('❌ pages.ceremony('+s+'):',e.message); process.exit(1); } }
for (const s of ['land','sea','air','badge','check']) { try{ ctx.App.pages.uniform(s); }catch(e){ console.error('❌ pages.uniform('+s+'):',e.message); process.exit(1); } }
for (const s of ['promise','patrol','tools','apply','course','refs']) { try{ ctx.App.pages.book(s); }catch(e){ console.error('❌ pages.book('+s+'):',e.message); process.exit(1); } }
for (const s of ['rope','care','map','pack','camp','pioneer','track','field','aid']) { try{ ctx.App.pages.skills(s); }catch(e){ console.error('❌ pages.skills('+s+'):',e.message); process.exit(1); } }
for (const sh of ctx.SONGS.sheets) { try{ ctx.App.pages.songs(sh.k); }catch(e){ console.error('❌ pages.songs('+sh.k+'):',e.message); process.exit(1); } }
console.log('✅ v19 全部 tab＋小分頁 render 正常');

const appSrc = readFileSync(root+'js/app.js','utf8');
for (const mk of ['工作紙','只印本節','game-card','小隊計分板','隨機分組','抽籤','倒數計時','歡呼庫','會議記錄表','追蹤符號','printSec','subnav','meet-row']) {
  if(!appSrc.includes(mk)){ console.error('❌ app.js 缺標記 '+mk); process.exit(1); }
}
// v19 要求：唔出繩結卡（素材庫）、 Interest tab 唔放區系統 CTA、整行可撳
if (appSrc.includes('列印繩結卡')) { console.error('❌ 素材庫仲有「列印繩結卡」（用戶要求移除）'); process.exit(1); }
if (appSrc.includes('前往區總部報章系統')) { console.error('❌ 興趣章仲有「前往區總部報章系統」連結（用戶要求移除）'); process.exit(1); }
if (!appSrc.includes('data-href')) { console.error('❌ 集會目錄冇整行可撳（data-href）'); process.exit(1); }
console.log('✅ v19：無繩結卡・無區系統CTA・整行可撳');

const cssSrc = readFileSync(root+'css/app.css','utf8');
if(!cssSrc.includes('.print-btn, .filters')){ console.error('❌ CSS 缺列印隱藏規則'); process.exit(1); }
for (const c of ['.subnav','.print-one','#printzone','.dgm-fig','.song-grid','.meet-row']) {
  if(!cssSrc.includes(c)){ console.error('❌ CSS 缺 v19 樣式 '+c); process.exit(1); }
}
console.log('✅ 列印 CSS＋v19 樣式齊');

// v19 圖解庫
if(!ctx.DIAGRAMS || !ctx.DIAGRAMS.compass || !ctx.DIAGRAMS.pack || Object.keys(ctx.DIAGRAMS.track).length!==6){ console.error('❌ DIAGRAMS 基礎圖缺'); process.exit(1); }
if(Object.keys(ctx.DIAGRAMS.cer).length<6){ console.error('❌ 儀式圖解不足 6 套'); process.exit(1); }
if(Object.keys(ctx.DIAGRAMS.game).length!==12){ console.error('❌ 遊戲場地圖唔係 12 張，實際', Object.keys(ctx.DIAGRAMS.game).length); process.exit(1); }
if(!ctx.DIAGRAMS.skillx || !ctx.DIAGRAMS.skillx.tent || !ctx.DIAGRAMS.skillx.rice || !ctx.DIAGRAMS.skillx.sos || !ctx.DIAGRAMS.skillx.lost){ console.error('❌ 技能圖解缺'); process.exit(1); }
if(!ctx.DIAGRAMS.fire || !ctx.DIAGRAMS.fire.circle || !ctx.DIAGRAMS.fire.flow){ console.error('❌ 營火圖缺'); process.exit(1); }
if(ctx.DIAGRAMS.reef || ctx.DIAGRAMS.bowline){ console.error('❌ 仲殘留繩結逐步圖（用戶要求移除）'); process.exit(1); }
console.log('✅ SVG 圖解庫齊（指南針/背囊/追蹤6＋儀式6/遊戲12/技能/營火；繩結圖已移除）');

// 搜尋頁
try{ ctx.App.pages.search('急救'); ctx.App.pages.search(); }catch(e){ console.error('❌ pages.search:',e.message); process.exit(1); }
console.log('✅ 搜尋頁 render 正常');
if(ctx.App.buildSearchIndex().length < 90){ console.error('❌ 搜尋索引太少：', ctx.App.buildSearchIndex().length); process.exit(1); }
console.log('✅ 搜尋索引', ctx.App.buildSearchIndex().length, '項');
for (const mk of ['義勇軍進行曲','searchGo','buildSearchIndex','全站搜尋']) {
  if(!appSrc.includes(mk)){ console.error('❌ app.js 缺標記 '+mk); process.exit(1); }
}
// 歌紙：必須係傳統童軍營火歌，唔可以留自創歌
const songsSrc = readFileSync(root+'js/songs.js','utf8');
for (const s of ['Skip to My Lou','Oh! Susanna','Home on the Range','My Bonnie Lies Over the Ocean','This Old Man','Ten Green Bottles',"Campfire's Burning",'Kookaburra']) {
  if(!songsSrc.includes(s)){ console.error('❌ songs.js 缺傳統營火歌 '+s); process.exit(1); }
}
if (appSrc.includes('Scout Hub 原創') || songsSrc.includes('原創歌詞')) { console.error('❌ 仲有「自創」歌（用戶明確禁止）'); process.exit(1); }
if (appSrc.includes('營火之夜') || appSrc.includes('小隊同心')) { console.error('❌ 素材庫仲殘留舊自創歌名'); process.exit(1); }
if (ctx.SONGS.sheets.length < 10) { console.error('❌ 歌紙不足 10 首'); process.exit(1); }
console.log('✅ 營火歌：11 首傳統公版歌紙＋必識十首歌單（無自創/無流行歌）');

// index.html 接線
const htmlSrc = readFileSync(root+'index.html','utf8');
if(!htmlSrc.includes('js/diagrams.js') || !htmlSrc.includes("#search'")){ console.error('❌ index.html 缺 diagrams/search 接線'); process.exit(1); }
if(!htmlSrc.includes('data-tab="songs"') || htmlSrc.includes('data-tab="patrol"')){ console.error('❌ index.html 底部 tab 未轉營火歌'); process.exit(1); }
console.log('✅ index.html 接線齊（🔥營火歌 tab）');

// manifest：分頁捷徑＋maskable icon
const mf = readFileSync(root+'manifest.webmanifest','utf8');
if(!mf.includes('icon-maskable-512.png') || !mf.includes('#songs')){ console.error('❌ manifest 缺 maskable icon 或營火歌 shortcut'); process.exit(1); }
console.log('✅ manifest：新 icon＋營火歌 shortcut');

// sw.js
const swSrc = readFileSync(root+'sw.js','utf8');
if(!swSrc.includes('scout-v26') || !swSrc.includes('c24-lesson.js')){ console.error('❌ sw.js 未升級 v26'); process.exit(1); }
if(!swSrc.includes('svg-kit.js') || !swSrc.includes('songs.js')){ console.error('❌ sw.js 未 cache v19 新檔'); process.exit(1); }
console.log('✅ sw.js cache 已升級（v26 含 28 張示意圖）');

// README
const rm = readFileSync(root+'README.md','utf8');
if(!rm.includes('c24')){ console.error('❌ README 缺 c24'); process.exit(1); }
// ── v26b：所有 SVG 圖解嘅文字都要喺 viewBox 內（手繪圖解冇得靠 AI，溢出就係睇唔到）──
{
  const D = ctx.DIAGRAMS;
  const est = (t)=>{ let w=0; for (const ch of t) { const c=ch.codePointAt(0); w += (c>0x2e80?1.0:(ch===' '?0.34:0.58)); } return w; };
  const keys = [];
  for (const grp of Object.keys(D)) { const g=D[grp]; if (g && typeof g==='object') for (const k of Object.keys(g)) if (typeof g[k]==='string') keys.push([grp,k]); }
  let n=0, bad=[];
  for (const [grp,k] of keys) {
    const src = D[grp][k]; const m = src.match(/viewBox="0 0 (\d+) (\d+)"/); if (!m) continue; n++;
    const W=+m[1], H=+m[2];
    const re=/<g transform="translate\(([-\d.]+),([-\d.]+)\)"[^>]*>|<\/g>|<text x="([-\d.]+)" y="([-\d.]+)" font-size="([-\d.]+)"[^>]*?text-anchor="(start|middle|end)"[^>]*>([^<]*)<\/text>/g;
    let mm, gx=0, over=[];
    while ((mm = re.exec(src))) {
      if (mm[0]==='</g>') { gx=0; continue; }
      if (mm[3]===undefined) { gx=+mm[1]; continue; }
      const fs=+mm[5], anc=mm[6], txt=mm[7]||''; if (!txt) continue;
      const w=est(txt)*fs, x=gx+ +mm[3];
      let l=x,r=x; if (anc==='start') r=x+w; else if (anc==='end') l=x-w; else { l=x-w/2; r=x+w/2; }
      if (l<-2 || r>W+2) over.push(txt.slice(0,14));
    }
    if (over.length) bad.push(grp+'.'+k+'：'+over.slice(0,2).join('、'));
  }
  if (bad.length) { console.error('❌ 下圖文字超出 viewBox（會俾人cut）：\n   '+bad.join('\n   ')); process.exit(1); }
  console.log('✅ '+n+' 張手繪圖解文字全部喺 viewBox 內（集隊手號七格＋行進間口令九格冇溢出）');
}
console.log('✅ README 提及 c24 同《步操手冊》');
// ═════════ v20：真圖示意插畫（AVIF），SVG 只做折疊後備 ═════════
const figSandbox = {}; createContext(figSandbox);
runInContext(readFileSync(root+'js/figs.js','utf8'), figSandbox, {filename:'js/figs.js'});
const FIGSJ = figSandbox.FIGS || {};
const figKeys = Object.keys(FIGSJ);
if (figKeys.length < 28) { console.error('❌ FIGS 不足 28 張，實際', figKeys.length); process.exit(1); }
if (figKeys.some(k => k === 'note' || typeof FIGSJ[k] === 'string')) { console.error('❌ FIGS 混咗非圖項目（note 應該用全域 FIGS_NOTE）'); process.exit(1); }
if (figSandbox.FIGS_NOTE !== undefined && !/唔代表制服標準/.test(figSandbox.FIGS_NOTE)) { console.error('❌ FIGS_NOTE 冇寫明唔代表制服標準'); process.exit(1); }
for (const k of figKeys) {
  if (/robe|uniform|scarf|制服|領巾|布章|章/.test(k)) { console.error('❌ FIGS 出咗制服／布章類插畫（用戶禁止，AI 會畫錯）：'+k); process.exit(1); }
  if (/帽章|布章|領巾|巾圈|旅巾/.test(FIGSJ[k].alt)) { console.error('❌ '+k+' alt 描述咗制服細節：', FIGSJ[k].alt); process.exit(1); }
  if (/杏色|草青|深綠軟帽|neckerchief|badge/i.test(FIGSJ[k].alt)) { console.error('❌ '+k+' alt 仲當住係制服圖'); process.exit(1); }
}
if (existsSync(root+'img/fig/fire-robe.avif')) { console.error('❌ fire-robe.avif 未移除（屬布章／制服範圍，唔准出插畫）'); process.exit(1); }
let figBytes = 0;
for (const k of figKeys) {
  const f = FIGSJ[k];
  if (!/^img\/fig\/[a-z0-9-]+\.avif$/.test(f.src)) { console.error('❌ FIGS.'+k+' src 唔係 img/fig/*.avif：', f.src); process.exit(1); }
  if (!existsSync(root+f.src)) { console.error('❌ FIGS.'+k+' 檔案唔存在：', f.src); process.exit(1); }
  const buf = readFileSync(root+f.src);
  figBytes += buf.length;
  const brand = buf.slice(4,12).toString('latin1');
  if (brand !== 'ftypavif') { console.error('❌ '+f.src+' 唔係 AVIF（brand='+brand+'）'); process.exit(1); }
  if (buf.length > 140*1024) { console.error('❌ '+f.src+' 太大：', Math.round(buf.length/1024)+'KB'); process.exit(1); }
  if (!(f.w>200 && f.h>200)) { console.error('❌ '+k+' 缺 w/h（會 layout shift）'); process.exit(1); }
  if (!f.alt || f.alt.length < 20) { console.error('❌ '+k+' alt 描述太短'); process.exit(1); }
  if (!f.cap || f.cap.length < 15) { console.error('❌ '+k+' 缺圖說'); process.exit(1); }
}
if (figBytes > 1200*1024) { console.error('❌ 插畫總容量過大（離線 PWA 上限 1.2MB）：', Math.round(figBytes/1024)+'KB'); process.exit(1); }
for (const k of figKeys) {
  if (/knot|reef|bowline|fig8|繩結|結/.test(k)) { console.error('❌ FIGS 出咗繩結圖（用戶明確禁止）：'+k); process.exit(1); }
}
console.log('✅ v21 插畫：'+figKeys.length+' 張 AVIF（'+Math.round(figBytes/1024)+'KB・無繩結圖・alt/cap 齊）');
const cerCardsWithFig = ctx.CEREMONY.cards.filter(c=>c.fig);
const missingImg = cerCardsWithFig.filter(c=>!FIGSJ['cer-'+c.fig]);
if (missingImg.length) { console.error('❌ 儀式卡冇插畫：', missingImg.map(c=>c.k).join(',')); process.exit(1); }
if (cerCardsWithFig.length < 6) { console.error('❌ 有圖儀式卡不足 6'); process.exit(1); }
const figHtml = ctx.App.cerFig(cerCardsWithFig[0]);
if (!figHtml.includes('class="ph-fig"')) { console.error('❌ 儀式圖未用 ph-fig 結構'); process.exit(1); }
if (!/img src="img\/fig\/cer-open\.avif"/.test(figHtml)) { console.error('❌ 儀式圖冇 AVIF <img>：', figHtml.slice(0,120)); process.exit(1); }
{ const f0 = FIGSJ[cerCardsWithFig[0].fig ? 'cer-'+cerCardsWithFig[0].fig : ''];
  if (!f0 || !figHtml.includes('width="'+f0.w+'"') || !figHtml.includes('height="'+f0.h+'"')) { console.error('❌ 儀式圖 w/h 屬性同 FIGS 資料唔一致（會 layout shift）'); process.exit(1); } }
for (const c of cerCardsWithFig) {
  const f = FIGSJ['cer-'+c.fig];
  const head = existsSync(root+f.src) ? readFileSync(root+f.src) : null;
  if (head) { const size = spawnSync('identify', ['-format','%wx%h', root+f.src], {encoding:'utf8'}).stdout.trim();
    if (size !== f.w+'x'+f.h) { console.error('❌ '+f.src+' 實際尺寸 '+size+' 唔等於 FIGS 記嘅 '+f.w+'x'+f.h); process.exit(1); } }
}
if (!figHtml.includes('<details class="dgm-alt no-print"')) { console.error('❌ 儀式圖冇折疊後備圖解'); process.exit(1); }
if (!figHtml.includes('onerror=')) { console.error('❌ 圖冇 onerror 後備'); process.exit(1); }
if (!figHtml.includes('ph-note') || !figHtml.includes('唔代表制服標準')) { console.error('❌ 圖說冇「唔代表制服標準」聲明'); process.exit(1); }
if (!appSrc.includes("App.ph('game-banner'")) { console.error('❌ 遊戲 tab 冇接封面插畫'); process.exit(1); }
if (appSrc.includes("App.ph('fire-robe'")) { console.error('❌ 營火袍仲用 AI 插畫（應該退回平面圖解）'); process.exit(1); }
if (figHtml.includes('undefined')) { console.error('❌ 儀式圖 markup 洩漏 undefined'); process.exit(1); }
const howlCard = ctx.CEREMONY.cards.find(c=>!c.fig);
if (ctx.App.cerFig(howlCard) !== '') { console.error('❌ 冇 fig 嘅卡唔應該硬出圖'); process.exit(1); }
console.log('✅ 儀式卡 6 張全部有 AVIF 插畫＋折疊平面圖解（無圖嘅團呼卡唔硬出）');
for (const mk of ["App.ph('fire-song'", "App.ph('fire-circle'"]) {
  if (!appSrc.includes(mk)) { console.error('❌ 營火/歌 page 未接插畫：'+mk); process.exit(1); }
}
if (!appSrc.includes("附示意插畫＋位置圖解")) { console.error('❌ 搜尋索引未反映有插畫'); process.exit(1); }
const cssSrc2 = readFileSync(root+'css/app.css','utf8');
if (!cssSrc2.includes('.ph-fig.imgfail') || !cssSrc2.includes('.ph-fig .dgm-alt')) { console.error('❌ CSS 缺 ph-fig 後備樣式'); process.exit(1); }
if (!/@media print\{[\s\S]*?\.ph-fig \.dgm-alt,\.ph-fig \.ph-fail\{display:none!important\}/.test(cssSrc2)) { console.error('❌ 列印未隱藏折疊圖解'); process.exit(1); }
for (const k of figKeys) {
  if (!swSrc.includes(FIGSJ[k].src)) { console.error('❌ sw.js 未預 cache：'+FIGSJ[k].src); process.exit(1); }
}
if (!swSrc.includes('./js/figs.js')) { console.error('❌ sw.js 未 cache figs.js'); process.exit(1); }
if (!swSrc.includes('c.add(a).catch')) { console.error('❌ sw install 未改逐個 add（一張圖miss會拖冧全部）'); process.exit(1); }
console.log('✅ 營火/歌插畫接線＋CSS 後備＋sw 預 cache（9 張）齊');
// ═════════ v22：批次 2 — 遊戲場地圖插畫 ═════════
const GF = figSandbox.GAME_FIG || {};
const gfKeys = Object.keys(GF);
if (gfKeys.length < 10) { console.error('❌ GAME_FIG 只覆蓋 '+gfKeys.length+' 個遊戲（應 10）'); process.exit(1); }
for (const nm of gfKeys) {
  if (!FIGSJ[GF[nm]]) { console.error('❌ GAME_FIG 指向冇圖嘅 key：'+nm+' → '+GF[nm]); process.exit(1); }
}
const noImg = ctx.DATA.games.filter(g => !GF[g.n]);
if (noImg.length !== 1 || noImg[0].n !== '大風吹') { console.error('❌ 仲未補圖嘅遊戲應該得「大風吹」，實際 '+noImg.map(g=>g.n).join(',')); process.exit(1); }
let phCnt = 0, dgmCnt = 0;
for (const g of ctx.DATA.games) {
  const gk = GF[g.n] || '';
  const cap = (gk && FIGSJ[gk]) ? FIGSJ[gk].cap : '場地擺位圖';
  const html = ctx.App.ph(gk, cap, ctx.DIAGRAMS.game[g.n]);
  if (gk) {
    if (!html.includes('class="ph-fig"') || !html.includes('img/fig/'+gk+'.avif')) { console.error('❌ 遊戲 '+g.n+' 冇用 AVIF 插畫'); process.exit(1); }
    if (!html.includes('dgm-alt')) { console.error('❌ 遊戲 '+g.n+' 冇保留平面擺位圖後備'); process.exit(1); }
    phCnt++;
  } else {
    if (!html.includes('class="dgm-fig"')) { console.error('❌ 遊戲 '+g.n+' 退回邏輯唔啱'); process.exit(1); }
    dgmCnt++;
  }
  if (html.includes('undefined')) { console.error('❌ 遊戲 '+g.n+' markup 洩漏 undefined'); process.exit(1); }
}
if (!(phCnt===11 && dgmCnt===1)) { console.error('❌ 遊戲插畫覆蓋異常：ph='+phCnt+' dgm='+dgmCnt); process.exit(1); }
for (const k of Object.keys(FIGSJ).filter(x=>x.indexOf('game-')===0)) {
  const f = FIGSJ[k];
  if (/帽章|領巾|布章|巾圈|旅巾|制服|團員|童軍帽/.test(f.alt)) { console.error('❌ '+k+' alt 描述咗制服／身份：', f.alt); process.exit(1); }
  if (/平結|稱人結|八[字字]結|水手結/.test(f.alt)) { console.error('❌ '+k+' alt 畫咗繩結打法（禁止）'); process.exit(1); }
}
if (!/唔出繩結逐步圖/.test(FIGSJ['game-relay-cards'].cap) || !/唔出結圖/.test(FIGSJ['game-tug'].cap)) { console.error('❌ 繩結相關遊戲冇寫明「唔出結圖」'); process.exit(1); }
if (!/絕對唔准衝向海邊/.test(FIGSJ['game-beachflag'].cap)) { console.error('❌ 沙灘旗圖冇寫海邊安全提示'); process.exit(1); }
for (const k of Object.keys(FIGSJ).filter(x=>x.indexOf('game-')===0)) {
  if (!swSrc.includes(FIGSJ[k].src)) { console.error('❌ sw.js 未 cache 遊戲圖：'+k); process.exit(1); }
}
try { ctx.App.pages.play(); } catch(e) { console.error('❌ pages.play 插畫接入後 render 失敗：', e.message); process.exit(1); }
console.log('✅ 遊戲插畫：11 張 AVIF 場地圖＋1 個退回平面圖（ph='+phCnt+'/dgm='+dgmCnt+'）・sw 預 cache 齊');

// ═════════ v23：批次 3 — 技能插畫 ＋ QA fail 名單（唔准回流） ═════════
const SF = figSandbox.SKILL_FIG || {};
if (Object.keys(SF).length < 6) { console.error('❌ SKILL_FIG 只覆蓋 '+Object.keys(SF).length+' 項技能（應 6）'); process.exit(1); }
for (const nm of Object.keys(SF)) { if (!FIGSJ[SF[nm]]) { console.error('❌ SKILL_FIG 指向冇圖嘅 key：'+nm); process.exit(1); } }
// QA fail 咗嘅三張（刀交接／SOS 節奏／凳數）絕唔准悄悄放返入 repo
for (const banned of ['game-chairs.avif']) {
  if (existsSync(root+'img/fig/'+banned)) { console.error('❌ '+banned+' 返咗入面（QA fail：凳數唔啱「少一張」）'); process.exit(1); }
}
if (!SF.knife || !SF.sos) { console.error('❌ knife/sos 應該已重出並入 SKILL_FIG（v24）'); process.exit(1); }
// v24 儀式圖 QA 修正：宣誓唔可以合十、旗唔可以插喺二人之間；敬禮邊格作準要講明；升旗戴帽／無帽條文要喺圖說
const capOath = FIGSJ['cer-oath'].cap + ' ' + ceremonySrc;
if (!/唔係合十/.test(capOath)) { console.error('❌ 宣誓圖冇交代「唔好合十／立正垂手」'); process.exit(1); }
if (!/中間唔准放嘢|唔可以插喺二人之間/.test(capOath)) { console.error('❌ 宣誓圖冇交代「旗唔准喺二人之間」'); process.exit(1); }
if (!/照<b>右格<\/b>數|照右格/.test(FIGSJ['cer-salute'].cap + ceremonySrc)) { console.error('❌ 敬禮圖冇講明手指數以邊格作準'); process.exit(1); }
if (!/右翼/.test(FIGSJ['cer-open'].cap)) { console.error('❌ 集隊圖冇講明右翼以邊個為準'); process.exit(1); }
if (!/制服不整齊|制服整唔整齊/.test(FIGSJ['cer-flag'].cap + ceremonySrc)) { console.error('❌ 升旗圖冇交代「以制服整齊與否決定舉手」（手冊§6.3）'); process.exit(1); }
if (FIGSJ['cer-open'].w*1 !== 1000 || FIGSJ['cer-open'].h === 747) { console.error('❌ cer-open 裁圖後 w/h 未更新（會 layout shift）'); process.exit(1); }
if (GF['大風吹']) { console.error('❌ 大風吹唔准入 GAME_FIG（凳數畫錯）'); process.exit(1); }
// 技能頁逐分頁 render：有圖用 ph-fig，冇圖退回 dgm-fig
for (const sub of ['care','map','camp','field','aid']) {
  try { ctx.App.pages.skills(sub); } catch(e) { console.error('❌ pages.skills('+sub+') 接入插畫後失敗：', e.message); process.exit(1); }
}
const figHtmlCamp = ctx.App.ph('skill-tent', FIGSJ['skill-tent'].cap, ctx.DIAGRAMS.skillx.tent);
if (!figHtmlCamp.includes('img/fig/skill-tent.avif') || !figHtmlCamp.includes('45 度')) { console.error('❌ 帳篷圖／圖說唔啱'); process.exit(1); }
const figHtmlRope = ctx.App.ph('skill-ropecare', FIGSJ['skill-ropecare'].cap, ctx.DIAGRAMS.skillx.ropecare);
if (!/圈繞.*照文字/.test(figHtmlRope)) { console.error('❌ 收繩圖冇寫明「步驟照文字」（唔准出結圖）'); process.exit(1); }
const figHtmlSos = ctx.App.ph('', 'SOS 哨音節拍（三短三長三短）', ctx.DIAGRAMS.skillx.sos);
if (!figHtmlSos.includes('class="dgm-fig"')) { console.error('❌ SOS 應該退回平面節拍圖'); process.exit(1); }
// 冇孤兒圖：img/fig 入面每張都要有 FIGS 項目＋喺 sw
const { readdirSync } = await import('fs');
const avifs = readdirSync(root+'img/fig').filter(f=>/\.avif$/.test(f));
const allSrc = figKeys.map(k=>FIGSJ[k].src.replace('img/fig/',''));
for (const f of avifs) {
  if (!allSrc.includes(f)) { console.error('❌ img/fig/'+f+' 冇喺 FIGS 入面（孤兒圖，要咪刪走咪補 entry）'); process.exit(1); }
  if (!swSrc.includes(f)) { console.error('❌ sw.js 漏 cache img/fig/'+f); process.exit(1); }
}
if (Object.keys(SF).length < 8) { console.error('❌ SKILL_FIG 得 '+Object.keys(SF).length+' 項（應 8：ropecare/legend/tent/stove/rice/lost/knife/sos）'); process.exit(1); }
for (const sub of ['camp','field']) { try { ctx.App.pages.skills(sub); } catch(e) { console.error('❌ pages.skills('+sub+') render 失敗：', e.message); process.exit(1); } }
console.log('✅ 技能插畫 8/8 齊（刀/SOS 已用硬指令重出通過 QA）・圖檔 28 張全數入 FIGS＋sw');
// ── v26：《步操手冊》第3–8章＋附錄全面落地（新卡 march／fallin／parade）──
{
  const byKey = ctx.CEREMONY.cards.reduce((a,c)=>{a[c.k]=c;return a;},{});
  if (ctx.CEREMONY.cards.length < 10) { console.error('❌ 儀式卡得 '+ctx.CEREMONY.cards.length+' 張（應 10 張：加咗快步行進／集隊手號／會操檢閱）'); process.exit(1); }
  for (const k of ['march','fallin','parade']) {
    if (!byKey[k]) { console.error('❌ 缺儀式卡 '+k); process.exit(1); }
    const c = byKey[k];
    if (!(c.steps||c.types||c.note)) { console.error('❌ '+k+' 卡係空殼'); process.exit(1); }
    if (FIGSJ['cer-'+(c.fig||'__none__')]) { console.error('❌ '+k+' 唔應該有 AI 插畫（手號／口令表用圖解，唔靠生成圖）'); process.exit(1); }
  }
  const fd = JSON.stringify(byKey.footdrill), fa = JSON.stringify(byKey.fallin), mc = JSON.stringify(byKey.march), pd = JSON.stringify(byKey.parade);
  if (/左腳向左橫移一步（約與肩同寬），雙手在背後交叉握好/.test(fd)) { console.error('❌ 稍息仲係中式版本（手冊第3章§2：右掌疊左掌・拇指緊扣・手踭蹬直）'); process.exit(1); }
  for (const re of [/305 毫米/, /由拳變為掌/, /右掌疊/, /唔准由立正直接轉休息|唔准由立正直接轉/, /Squad — <b>ease<\/b>|Stand at — <b>ease<\/b>|Stand at — ease/]) {
    if (!re.test(fd)) { console.error('❌ 稍息／休息條文缺：'+re); process.exit(1); }
  }
  if (!/25 毫米（1 英吋）/.test(JSON.stringify(byKey.salute))) { console.error('❌ 敬禮卡冇手冊準則「右食指喺右眼眼球中心對上 25 毫米」'); process.exit(1); }
  for (const s of ['直線 Line','由高至矮','直行 Columns','闊橫排 Open Order','窄橫排 Close Order','馬蹄鐵形','開口正方形']) {
    if (!fa.includes(s)) { console.error('❌ 集隊手號缺第8章其中一款：'+s); process.exit(1); }
  }
  for (const re of [/2250/, /750mm|750 毫米/, /1500mm|1500 毫米/, /FALL — IN/, /BLANK — FILE/, /From the right — NUMBER/, /Dressing, right — DRESS/, /FALL — OUT/, /DISMISS/, /小隊長喺所有隊員最右方/]) {
    if (!re.test(fa)) { console.error('❌ 集隊手號卡缺《步操手冊》第6／8章條文：'+re); process.exit(1); }
  }
  for (const re of [/每分鐘 116 步/, /每分鐘 65 步/, /375mm|375 毫米/, /Check — Down/, /Quick mark — TIME/, /半徑 600 毫米|600 毫米/, /兩次/, /Squad — HALT/]) {
    if (!re.test(mc)) { console.error('❌ 快步行進卡缺手冊條文：'+re); process.exit(1); }
  }
  for (const re of [/Muster Parade/, /Passing Out Parade/, /向總司令員報告/, /唔准橫越會場/, /GENERAL SALUTE — SALUTE/, /permission to march off/, /爭吵/, /用手接觸/, /皮帶扣喺身前正中/, /衣袋唔准隆起/]) {
    if (!re.test(pd)) { console.error('❌ 會操／檢閱卡缺附錄丙・戊條文：'+re); process.exit(1); }
  }
  if (!/眼球必須保持向前直望/.test(JSON.stringify(byKey.flag)) || !/夾喺腋下/.test(JSON.stringify(byKey.flag))) { console.error('❌ 升旗卡冇第7章旗操要領（眼望前、旗竿夾腋下）'); process.exit(1); }
  if (!/第7章 §1–§8/.test(JSON.stringify(byKey.flag))) { console.error('❌ 升旗卡冇列明第7章 §1–§8 仍待紙本核對'); process.exit(1); }
  const hs = ctx.DIAGRAMS.cer.handsign, mm = ctx.DIAGRAMS.cer.march;
  if (!hs || !mm) { console.error('❌ DIAGRAMS.cer.handsign／march 未有'); process.exit(1); }
  const marks = Array.from({length:7},(_,i)=>String.fromCodePoint(0x2460+i));
  if (marks.some(g=>!hs.includes(g))) { console.error('❌ 手號圖解七格編號唔齊（AI 唔可靠，呢啲要人手畫啱）'); process.exit(1); }
  for (const svgStr of [hs, mm]) {
    if (/undefined|NaN/.test(svgStr)) { console.error('❌ 圖解 SVG 有 undefined/NaN'); process.exit(1); }
    const box = svgStr.match(/viewBox="0 0 (\d+) (\d+)"/);
    const maxY = Math.max(...[...svgStr.matchAll(/transform="translate\(([-\d.]+),([-\d.]+)\)"/g)].map(m=>parseFloat(m[2])));
    if (maxY > parseFloat(box[2])) { console.error('❌ 圖解內容超出 viewBox（會俾人cut 走）：maxY='+maxY+' vs '+box[2]); process.exit(1); }
  }
  if (!/10 套儀式卡/.test(readFileSync(root+'README.md','utf8'))) { console.error('❌ README 冇講明儀式卡係 10 套（改咗卡數要同步）'); process.exit(1); }
  if (/每套仪式一张卡/.test(readFileSync(root+'js/app.js','utf8'))) { console.error('❌ app.js 仲有簡體字句子'); process.exit(1); }
console.log('✅ v26《步操手冊》第3–8章＋附錄：稍息改返右掌疊左掌・敬禮 25mm・七款集隊手號圖解・行進間口令表・會操檢閱須知（三張新卡、無用 AI 圖）');
}

// ── v25：《步操手冊》（DRILL MANUAL, HKSA 2000 新版）對照修正 ──
{
  const cer = ctx.CEREMONY.cards.reduce(function(a,c){a[c.k]=c;return a;},{});
  const txt = function(c){ return JSON.stringify(c); };
  const drill = txt(cer.footdrill), flagsrc = txt(cer.flag), sa = txt(cer.salute), op = txt(cer.open);
  if (/腳尖[^；。]{0,14}約?\s*45\s*(度|°)/.test(drill)) { console.error('❌ 步操卡仲教腳尖 45 度（手冊第3章§2：與中線成 30 度）'); process.exit(1); }
  if (!/30 度/.test(drill)) { console.error('❌ 步操卡冇「腳尖與中線成 30 度」'); process.exit(1); }
  if (!/握拳/.test(drill)) { console.error('❌ 步操卡立正冇寫「雙手握拳・拇指壓食指貼褲骨」'); process.exit(1); }
  if (!/不建議/.test(drill) || !/Squad Shun|Parade Shun/.test(drill)) { console.error('❌ 冇交代 Attention/Squad Shun/Parade Shun 只用於典禮（一般集會唔建議）'); process.exit(1); }
  for (const [re, msg] of [[/116/, '快步步速 116 步/分鐘'], [/750 毫米|750mm/, '步幅 750 毫米'], [/1\.5 秒/, '標準停頓時距 1.5 秒'], [/介令/, '口令三部分'], [/375/, '彈前腳 375 毫米'], [/As you were|As You Were/, '取消口令 As you were']]) {
    if (!re.test(drill)) { console.error('❌ 步操卡缺《步操手冊》數字：'+msg); process.exit(1); }
  }
  if (!/唔准用作懲罰|唔准用嚟罰人/.test(drill)) { console.error('❌ 冇寫「步操唔准用作懲罰」（手冊第2章§3.1）'); process.exit(1); }
  if (!/標號員|引導翼/.test(op)) { console.error('❌ 集隊卡冇用官方術語（引導翼／標號員／睇齊）'); process.exit(1); }
  if (!/手號/.test(op) || /開口正方形/.test(op) === false) { console.error('❌ 集隊卡冇列第8章七款集隊手號（或冇標明動作待核）'); process.exit(1); }
  if (!/制服不整齊|只肅立/.test(flagsrc) || /未戴帽者行注目禮/.test(flagsrc)) { console.error('❌ 升旗卡敬禮條文未跟手冊§3(丙)/§6.3（以制服整齊與否為準，唔好再斷言無帽行注目禮）'); process.exit(1); }
  if (!/MARCH TO ATTENTION/.test(sa) || !/EYES — RIGHT/.test(sa)) { console.error('❌ 敬禮卡冇行進間口令（MARCH TO ATTENTION！／EYES — RIGHT！）'); process.exit(1); }
  if (!/最右方/.test(sa) || !/每日/.test(sa)) { console.error('❌ 敬禮卡冇「無人時最右方隊員代表」＋「每日向同一人只致敬一次」'); process.exit(1); }
  const c01 = JSON.stringify(ctx.LESSONS ? ctx.LESSONS : {});
  const c01src = readFileSync(root+'js/c01-lesson.js','utf8');
  if (/腳尖向外打開約 45 度/.test(c01src)) { console.error('❌ c01 教案立正仲寫 45 度'); process.exit(1); }
  if (!/Bend the left knee/.test(c01src) || !/Shoot the right foot forward/.test(c01src)) { console.error('❌ c01 冇抽膝踏步／彈前腳（手冊第3章§1）'); process.exit(1); }
  const svgSrc = readFileSync(root+'js/svg-kit.js','utf8');
  if (/腳尖向外約 45°/.test(svgSrc)) { console.error('❌ 圖解註解仲寫 45°'); process.exit(1); }
  if (!/與中線成30°/.test(svgSrc) || !/每分鐘116步/.test(svgSrc)) { console.error('❌ 圖解冇更新立正/步速註解'); process.exit(1); }
  if (!/步操手冊|DRILL MANUAL/.test(readFileSync(root+'js/ceremony.js','utf8'))) { console.error('❌ ceremony.js 冇列明《步操手冊》出處'); process.exit(1); }
  if (!/drive\.google\.com\/file\/d\/1g4M6C7e1K7tVDkr2IADdkebm1CjljI-l/.test(readFileSync(root+'js/ceremony.js','utf8'))) { console.error('❌ CEREMONY.refs 冇《步操手冊》連結'); process.exit(1); }
  console.log('✅ v25《步操手冊》對照：立正 30°/握拳/Alert・口令結構與步速步幅・抽膝彈前腳・致敬條文（§3丙/§5.1/§6.1-6.3）・集隊術語與手號待核・步操唔准做懲罰');
}
console.log('✅ v24 儀式 QA 修正：宣誓唔合十＋旗唔喺二人之間、敬禮以右格作準、集隊右翼定義、升旗以制服整齊與否決定舉手');

console.log('\n🎉 全部 smoke test 通過（v26：《步操手冊》第3–8章＋附錄落地）');
