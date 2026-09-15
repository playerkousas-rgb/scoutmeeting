import { readFileSync, existsSync } from 'fs';
import { createContext, runInContext } from 'vm';
const root = new URL('..', import.meta.url).pathname;
const lessonFiles = ['js/c01-lesson.js','js/c02-lesson.js','js/c03-lesson.js','js/c04-lesson.js','js/c05-lesson.js','js/c06-lesson.js','js/c07-lesson.js','js/c08-lesson.js','js/c09-lesson.js','js/c10-lesson.js','js/c11-lesson.js','js/c12-lesson.js','js/c13-lesson.js','js/c14-lesson.js','js/c15-lesson.js','js/c16-lesson.js','js/c17-lesson.js','js/c18-lesson.js','js/c19-lesson.js','js/c20-lesson.js','js/c21-lesson.js','js/c22-lesson.js','js/c23-lesson.js','js/c24-lesson.js'];
const files = ['index.html','manifest.webmanifest','sw.js','css/app.css','js/data.js','js/interests.js','js/ceremony.js','js/uniform.js','js/diagrams.js','js/app.js','icons/icon-192.png','icons/icon-512.png', ...lessonFiles];
for (const f of files) {
  if (!existsSync(root + f)) { console.error('❌ Missing', f); process.exit(1); }
  console.log('✅', f);
}
const interestsSrc = readFileSync(root + 'js/interests.js', 'utf8');
const bm = interestsSrc.match(/k:'[a-z_]+',\s*en:'/g);
console.log('✅ 興趣章數：', bm ? bm.length : 0);
const html = readFileSync(root + 'index.html', 'utf8');
['scoutbadge.vercel.app','districtbadgesystem30.vercel.app','scout-circulars.vercel.app','1MhGE2LP3kiCEmyJAGUfIlLzL0Iq4fK33','js/ceremony.js','js/uniform.js', ...lessonFiles, 'icons/icon-192.png'].forEach(u => {
  if (!html.includes(u)) { console.error('❌ index.html 缺少', u); process.exit(1); }
});
console.log('✅ index.html 外連同新script齊');
if (!interestsSrc.includes('通告圖書館') || !interestsSrc.includes('訂閱')) { console.error('❌ 訓練班步驟未提及訂閱通告圖書館'); process.exit(1); }
console.log('✅ 訓練班程序包含「訂閱通告圖書館」');
if (!interestsSrc.includes('只係報考專科徽章用')) { console.error('❌ 未明確 districtbadgesystem30 只係報專章'); process.exit(1); }
console.log('✅ 已標明 districtbadgesystem30 為專章系統');
const uniformSrc = readFileSync(root + 'js/uniform.js', 'utf8');
['www.scout.org.hk/uploads/member/Scout_B.1.jpg','www.scout.org.hk/uploads/member/Scout_G.1.jpg','uniform.scouting.org.hk','p013-23.pdf'].forEach(u => {
  if (!uniformSrc.includes(u)) { console.error('❌ 制服缺少官方圖/參考', u); process.exit(1); }
});
console.log('✅ 制服官網圖齊');
const ceremonySrc = readFileSync(root + 'js/ceremony.js','utf8');
['團集會儀式（開始）','團集會儀式（結束）','中式隊列基本動作','升旗禮','宣誓儀式','童軍三指敬禮','童軍團呼'].forEach(c => {
  if (!ceremonySrc.includes(c)) { console.error('❌ 儀式卡缺少', c); process.exit(1); }
});
console.log('✅ 7 套儀式卡存在');

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
console.log('✅ icon PNG');

const ctx={window:{addEventListener:()=>{}},document:{getElementById:()=>({appendChild:()=>{},innerHTML:'',classList:{add:()=>{},remove:()=>{},toggle:()=>{}},setAttribute:()=>{},onclick:null,style:{}}),querySelector:()=>null,querySelectorAll:()=>[],createElement:(t)=>({classList:{add:()=>{},remove:()=>{},toggle:()=>{}},setAttribute:()=>{},appendChild:()=>{},innerHTML:'',style:{}}),addEventListener:()=>{}},location:{hash:'',href:''},navigator:{onLine:true,serviceWorker:{register:()=>new Promise(()=>{})}},addEventListener:()=>{}};
createContext(ctx);
['js/interests.js','js/ceremony.js','js/uniform.js','js/diagrams.js', ...lessonFiles, 'js/data.js','js/app.js'].forEach(f => {
  runInContext(readFileSync(root+f,'utf8'), ctx, {filename:f});
});
console.log('✅ JS 執行：', Object.keys(ctx.App.pages).join(','));
console.log('✅ 儀式卡',ctx.CEREMONY.cards.length,'制服類型',ctx.UNIFORM.types.length);
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

// v17：四個 tab 內容補完
if(ctx.DATA.games.length!==12){ console.error('❌ 遊戲庫唔係 12 個'); process.exit(1); }
console.log('✅ 遊戲庫 12 個');
for (const f of ['patrolScore','drawLots','countdownStart','groupRandom']) {
  if(typeof ctx.App[f]!=='function'){ console.error('❌ 缺小隊工具 '+f); process.exit(1); }
}
console.log('✅ 小隊工具函數齊');
for (const p of ['print','play','skills','patrol']) {
  try{ ctx.App.pages[p](); }catch(e){ console.error('❌ pages.'+p+':',e.message); process.exit(1); }
}
console.log('✅ print/play/skills/patrol render 正常');
const appSrc = readFileSync(root+'js/app.js','utf8');
for (const mk of ['工作紙列印','繩結卡','急救卡','game-card','小隊計分板','隨機分組','抽籤','倒數計時','歡呼庫','會議記錄表','追蹤符號']) {
  if(!appSrc.includes(mk)){ console.error('❌ app.js 缺標記 '+mk); process.exit(1); }
}
console.log('✅ 四 tab 內容標記齊');
const cssSrc = readFileSync(root+'css/app.css','utf8');
if(!cssSrc.includes('.print-btn, .filters')){ console.error('❌ CSS 缺列印隱藏規則'); process.exit(1); }
console.log('✅ 列印 CSS 齊');
// v18：歌紙＋SVG 圖解＋全站搜尋
if(!ctx.DIAGRAMS || !ctx.DIAGRAMS.compass || !ctx.DIAGRAMS.pack || Object.keys(ctx.DIAGRAMS.track).length!==6 || ctx.DIAGRAMS.reef.length!==3 || ctx.DIAGRAMS.fig8.length!==3 || ctx.DIAGRAMS.bowline.length!==4){ console.error('❌ DIAGRAMS 缺圖'); process.exit(1); }
console.log('✅ SVG 圖解庫齊（指南針/背囊/追蹤6/平結3/八字3/稱人4）');
try{ ctx.App.pages.search('急救'); ctx.App.pages.search(); }catch(e){ console.error('❌ pages.search:',e.message); process.exit(1); }
console.log('✅ 搜尋頁 render 正常');
if(ctx.App.buildSearchIndex().length < 60){ console.error('❌ 搜尋索引太少'); process.exit(1); }
console.log('✅ 搜尋索引', ctx.App.buildSearchIndex().length, '項');
for (const mk of ['義勇軍進行曲','營火之夜','小隊同心','營火歌單','領唱','自創營火歌','searchGo','buildSearchIndex','全站搜尋']) {
  if(!appSrc.includes(mk)){ console.error('❌ app.js 缺 v18 標記 '+mk); process.exit(1); }
}
console.log('✅ 歌紙＋搜尋標記齊');
const htmlSrc = readFileSync(root+'index.html','utf8');
if(!htmlSrc.includes('js/diagrams.js') || !htmlSrc.includes("#search'")){ console.error('❌ index.html 缺 diagrams/search 接線'); process.exit(1); }
console.log('✅ index.html 接線齊');
// check SW cache name includes c24
const swSrc = readFileSync(root+'sw.js','utf8');
if(!swSrc.includes('c24-20260916') || !swSrc.includes('c24-lesson.js')){ console.error('❌ sw.js 未升級 c24'); process.exit(1); }
console.log('✅ sw.js cache 已升級到 c24');
// check README mentions c24
const rm = readFileSync(root+'README.md','utf8');
if(!rm.includes('c24')){ console.error('❌ README 缺 c24'); process.exit(1); }
console.log('✅ README 提及 c24');
console.log('\n🎉 全部 smoke test 通過');
