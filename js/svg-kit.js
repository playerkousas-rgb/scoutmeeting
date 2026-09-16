/* Scout Hub v19 — svg-kit.js：儀式／遊戲／技能／營火 示意圖解庫（純手寫 vector，離線用得）
 * 圖解只做「場地面視圖／位置示意／流程」，唔係動作範本；實際手勢步操以領袖現場示範為準。
 * ⚠️ 按用戶要求：唔再做繩結逐步卡／圖（會錯）；繩結只留文字口訣＋ c13/c14 教案連結。
 */
(function(){
/* 必須喺 js/diagrams.js 之後 load（DIAGRAMS 已存在）；如冇就自己開一個 */
if (typeof DIAGRAMS === 'undefined') { window.DIAGRAMS = {}; }
var D = (typeof DIAGRAMS !== 'undefined') ? DIAGRAMS : window.DIAGRAMS;

/* ── 小工具 ── */
function svg(w,h,label,body){
  return '<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" role="img" aria-label="'+label+'" style="max-width:100%;height:auto;background:#fff">'+body+'</svg>';
}
function T(x,y,s,size,fill,anchor,bold){
  return '<text x="'+x+'" y="'+y+'" font-size="'+(size||11)+'" fill="'+(fill||'#333')+'" text-anchor="'+(anchor||'middle')+'"'+(bold?' font-weight="bold"':'')+'>'+s+'</text>';
}
function dot(x,y,r,fill){ return '<circle cx="'+x+'" cy="'+y+'" r="'+(r||4.5)+'" fill="'+(fill||'#37474F')+'"/>'; }
function sq(x,y,s,fill){ return '<rect x="'+(x-s)+'" y="'+(y-s)+'" width="'+(s*2)+'" height="'+(s*2)+'" rx="2" fill="'+fill+'"/>'; }
function ln(x1,y1,x2,y2,st,col,dash){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(col||'#90A4AE')+'" stroke-width="'+(st||1.5)+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>'; }
function arrow(x1,y1,x2,y2,col,sw){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(col||'#2E7D32')+'" stroke-width="'+(sw||2)+'" marker-end="url(#ah)"/>'; }
function mkr(){ return '<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="'+arguments[0]+'" stroke="none"/></marker></defs>'; }
function box(x,y,w,h,fill,stroke,rx){ return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||6)+'" fill="'+fill+'" stroke="'+(stroke||'#B0BEC5')+'" stroke-width="1.5"/>'; }
function row(x,y,n,gap,fill){ var s=''; for(var i=0;i<n;i++){ s+=dot(x+i*gap,y,4.5,fill||'#37474F'); } return s; }
function pole(x,baseY,hh,col,label){
  return ln(x,baseY,x,baseY-hh,3,'#5D4037')
    +'<path d="M'+(x)+','+(baseY-hh)+' l20,5 l-20,5 z" fill="'+col+'"/>'
    +T(x,baseY+12,label,10,'#5D4037');
}
var MK='<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 z" fill="#2E7D32" stroke="none"/></marker></defs>';

/* ══════════ 🎪 儀式圖（DIAGRAMS.cer） ══════════ */
D.cer = {};

/* 團集會開始：集隊隊列（俯視圖） */
D.cer.open = svg(340,190,'團集會開始隊列俯視圖',
  MK
  +T(170,16,'團集會開始・集隊（俯視圖）',12,'#1B5E20','middle',1)
  +dot(150,44,6,'#F9A825')+T(150,62,'負責領袖（面向全團）',10,'#8D6E63')
  +pole(262,52,30,'#C62828','持團旗者（右側）')
  +T(84,92,'第一小隊',10,'#666')+row(60,104,5,24)
  +T(84,128,'第二小隊',10,'#666')+row(60,140,5,24)
  +T(256,92,'第三小隊',10,'#666')+row(232,104,5,24)
  +T(256,128,'第四小隊',10,'#666')+row(232,140,5,24)
  +sq(38,88,5,'#2E7D32')+T(38,80,'小隊長',9.5,'#2E7D32')
  +sq(210,88,5,'#2E7D32')
  +T(170,178,'小隊長站小隊右前方・各隊排橫隊・全體面向領袖及團旗',10.5,'#8D6E63')
);

/* 團集會結束：五步流程 */
D.cer.close = svg(340,150,'團集會結束流程示意',
  MK
  +T(170,14,'團集會結束・五步',12,'#1B5E20','middle',1)
  +box(10,30,56,42,'#E8F5E9','#81C784')+T(38,48,'1 收拾',10)+T(38,62,'完集合',10)
  +arrow(70,51,82,51)
  +box(86,30,56,42,'#E8F5E9','#81C784')+T(114,48,'2 宣佈',10)+T(114,62,'下次集會',9.5)
  +arrow(146,51,158,51)
  +box(162,30,56,42,'#E8F5E9','#81C784')+T(190,48,'3 回顧',10)+T(190,62,'表揚感謝',9.5)
  +arrow(222,51,234,51)
  +box(238,30,56,42,'#E8F5E9','#81C784')+T(266,48,'4 降旗',10)+T(266,62,'如適用',9.5)
  +arrow(298,51,310,51)
  +box(296,92,38,40,'#FFF3E0','#FFB300')+T(315,108,'5',10)+T(315,122,'解散',10)
  +dot(250,112)+dot(232,120)+dot(214,106)+dot(196,118)
  +arrow(270,112,294,112,'#FF8F00')
  +box(12,92,150,40,'#F5F5F5','#BDBDBD')
  +T(87,110,'⚠️ 未完成家長交接',10,'#C62828')
  +T(87,124,'之成員不得自行離開',10,'#C62828')
);


/* 《步操手冊》第8章／第4–6章圖解用嘅小工具 */
function HS(n,label,cap1,cap2,pose){
  var col=(n-1)%3, row=Math.floor((n-1)/3);
  var x=14+col*110, y=26+row*98;
  var A='#37474F', arms='';
  if(pose==='flat') arms='<path d="M-15,4 L-32,4 M15,4 L32,4" stroke="'+A+'" stroke-width="3.2" stroke-linecap="round"/><circle cx="-34" cy="4" r="3.4" fill="'+A+'"/><circle cx="34" cy="4" r="3.4" fill="'+A+'"/>';
  else if(pose==='oneUp') arms='<path d="M-15,4 L-20,-10 L-7,-16" stroke="'+A+'" stroke-width="3.2" fill="none" stroke-linecap="round"/><circle cx="-5" cy="-17" r="3.4" fill="'+A+'"/><path d="M15,4 L32,4" stroke="'+A+'" stroke-width="3.2" stroke-linecap="round"/><circle cx="34" cy="4" r="3.4" fill="'+A+'"/>';
  else if(pose==='fwd') arms='<path d="M-12,3 L-8,-10 M12,3 L8,-10" stroke="'+A+'" stroke-width="3.2" stroke-linecap="round"/><rect x="-12" y="-16" width="8" height="6" rx="2.4" fill="'+A+'"/><rect x="4" y="-16" width="8" height="6" rx="2.4" fill="'+A+'"/>';
  else if(pose==='sideUp') arms='<path d="M-15,4 L-28,4 L-28,-11 M15,4 L28,4 L28,-11" stroke="'+A+'" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="-32" y="-17" width="8" height="6.5" rx="2.4" fill="'+A+'"/><rect x="24" y="-17" width="8" height="6.5" rx="2.4" fill="'+A+'"/>';
  else if(pose==='fwdUp') arms='<path d="M-12,3 L-10,-9 L-15,-18 M12,3 L10,-9 L15,-18" stroke="'+A+'" stroke-width="3" fill="none" stroke-linecap="round"/><rect x="-20" y="-24" width="9" height="6.5" rx="2.4" fill="'+A+'"/><rect x="11" y="-24" width="9" height="6.5" rx="2.4" fill="'+A+'"/>';
  else if(pose==='cross') arms='<path d="M-12,3 L-5,-15 M12,3 L5,-15" stroke="'+A+'" stroke-width="3" stroke-linecap="round"/><rect x="-8" y="-22" width="16" height="7" rx="3" fill="'+A+'"/><path d="M-1,-22 L-1,-15" stroke="#EAF1E6" stroke-width="1.5"/>';
  else arms='<path d="M-12,3 L-6,-20 M12,3 L6,-20" stroke="'+A+'" stroke-width="3" stroke-linecap="round"/><rect x="-7" y="-28" width="14" height="8" rx="3.6" fill="'+A+'"/>';
  return '<g transform="translate('+(x+47)+','+(y+34)+')">'
    +'<rect x="-42" y="-30" width="84" height="58" rx="8" fill="#EAF1E6" stroke="#C7D8C2"/>'
    +'<circle cx="0" cy="-18" r="5.6" fill="'+A+'"/>'
    +'<rect x="-7" y="-12" width="14" height="17" rx="5" fill="'+A+'"/>'+arms
    +T(-40,40,'①②③④⑤⑥⑦'.charAt(n-1)+' '+label,8.2,'#1B5E20','start',1)
    +T(-40,51,cap1,6.8,'#6D4C41','start')
    +T(-40,60,cap2,6.8,'#6D4C41','start')+'</g>';
}
function MD(n,label,cmd1,cmd2,cnt,note){
  var col=n%3===0?2:(n%3===1?0:1), row=Math.floor((n-1)/3);
  var x=14+col*108, y=26+row*58;
  return '<g transform="translate('+x+','+y+')">'
    +'<rect x="0" y="0" width="102" height="50" rx="7" fill="#EAF1E6" stroke="#C7D8C2"/>'
    +T(6,13,n+'. '+label,9,'#1B5E20','start',1)
    +T(6,21,cmd1,6.4,'#333','start')
    +T(6,29,cmd2,6.4,'#333','start')
    +T(6,38,'打數 '+cnt,6.4,'#0D47A1','start')
    +T(6,46,note,5.9,'#6D4C41','start')+'</g>';
}

function COL(n,title,angle,detail,kind,cue){
  var col=(n-1)%2, row=Math.floor((n-1)/2);
  var x=10+col*164, y=22+row*126;
  var A='#37474F', F='#8DA9C4', P='#B0793F';
  var fig='<circle cx="0" cy="-26" r="6" fill="'+A+'"/>'
    +'<rect x="-6" y="-20" width="12" height="22" rx="5" fill="'+A+'"/>'
    +'<path d="M-3,2 L-3,20 M4,2 L4,20" stroke="'+A+'" stroke-width="3.4" stroke-linecap="round"/>';
  var pole='', cloth='';
  if(kind==='flag 0'){
    pole='<path d="M11,20 L11,-40" stroke="'+P+'" stroke-width="2.6" stroke-linecap="round"/>'
      +'<path d="M11,-13 L11,10" stroke="'+A+'" stroke-width="3" stroke-linecap="round"/>';
    cloth='<path d="M11,-40 q9,4 0,8 q-9,4 0,8 z" fill="'+F+'"/>';
  } else if(kind==='flag 1'){
    pole='<path d="M9,-4 L9,-46" stroke="'+P+'" stroke-width="2.6" stroke-linecap="round"/>'
      +'<path d="M9,-4 L9,2 L2,-6" stroke="'+A+'" stroke-width="3" fill="none" stroke-linecap="round"/>';
    cloth='<path d="M9,-46 q9,4 0,8 q-9,4 0,8 z" fill="'+F+'"/>';
  } else if(kind==='flag 2'){
    // 手冊§5：竿底放喺右肩、竿頭向前上、與地面成 45 度；旗身由肩至手覆蓋竿
    pole='<path d="M2,-18 L24,-40" stroke="'+P+'" stroke-width="2.6" stroke-linecap="round"/>'
      +'<path d="M2,-18 L-4,-9" stroke="'+A+'" stroke-width="3" stroke-linecap="round"/>';
    cloth='<path d="M5,-21 L23,-39 L27,-35 L9,-17 z" fill="'+F+'"/>';
  } else {
    pole='<path d="M2,4 L36,-2" stroke="'+P+'" stroke-width="2.6" stroke-linecap="round"/>'
      +'<path d="M2,4 L-4,0" stroke="'+A+'" stroke-width="3" stroke-linecap="round"/>';
    cloth='<path d="M20,1 L40,-9 L40,-1 L20,9 z" fill="'+F+'"/>';
  }
  return '<g transform="translate('+(x+40)+','+(y+56)+')">'
    +'<rect x="-32" y="-52" width="128" height="104" rx="8" fill="#EAF1E6" stroke="#C7D8C2"/>'
    +'<path d="M-24,21 L88,21" stroke="#B9B3A6" stroke-width="1.4"/>'
    +fig+pole+cloth
    +T(-26,-42,title,8.6,'#1B5E20','start',1)
    +T(-26,34,angle,7.6,'#2E7D32','start',1)
    +T(-26,45,detail,7.2,'#6D4C41','start')
    +T(-26,55,cue,7.2,'#C62828','start')
    +'</g>';
}

/* ── v28：步操動作逐步圖解（《步操手冊》第3–4章 分部動作）───────────────
   呢啲圖一定要手繪：AI 數唔到腳序，亦度唔到角度／毫米。
   畫法＝用角度／距離產生圖；圖解入面每一條受手冊規定嘅角度或距離都帶
   data-ang / data-mm，tests/smoke.mjs 會逐個核對，唔靠眼。 */
var fA = '#37474F', fAD = '#C62828', fAT = '#E65100', fA2 = '#607D8B';
function frd(v){ return Math.round(v*10)/10; }
function fpv(x, y, ang, len){ return [x + len*Math.sin(ang*Math.PI/180), y - len*Math.cos(ang*Math.PI/180)]; }
function fln(a, b, c, d, col, w, dash){
  return '<path d="M'+frd(a)+','+frd(b)+' L'+frd(c)+','+frd(d)+'" stroke="'+(col||fA)+'" stroke-width="'+(w||3)
    +'" stroke-linecap="round" fill="none"'+(dash?' stroke-dasharray="3,2.5"':'')+'/>';
}
function fdot(x, y, r, col){ return '<circle cx="'+frd(x)+'" cy="'+frd(y)+'" r="'+(r||2.4)+'" fill="'+(col||fA)+'"/>'; }
/* 側面人形（髖喺 0,0；腳垂直向下＝0 度，向前為正） */
var fS = 0.05;
function fSFG(o){
  var s = '', sh = fpv(0, 0, (o.lean||0)-180, 26);
  s += fln(0, 0, sh[0], sh[1], fA, 7);
  var hd = fpv(sh[0], sh[1], (o.head===undefined ? (o.lean||0) : o.head)-180, 8.6);
  s += fdot(hd[0], hd[1], 5.4);
  var arms = o.arms || [[0,0],[0,0]];
  for (var i=0;i<arms.length;i++){
    var a = arms[i], col = i===1 ? fA : fA2;
    var e = fpv(sh[0], sh[1], a[0], 12), h = fpv(e[0], e[1], a[1], 11);
    s += fln(sh[0], sh[1], e[0], e[1], col, 2.7) + fln(e[0], e[1], h[0], h[1], col, 2.7);
    s += a[2] ? fdot(h[0], h[1], 2.3, col) : fln(h[0]-2.3, h[1], h[0]+2.3, h[1]-1.9, col, 1.8);
  }
  var legs = o.legs || [[0,0,'flat'],[0,0,'flat']];
  for (var k=0;k<legs.length;k++){
    var g = legs[k], lc = k===1 ? fA : fA2;
    var kn = fpv(0, 0, g[0], 13), an = fpv(kn[0], kn[1], g[1], 14);
    s += fln(0, 0, kn[0], kn[1], lc, 3.1) + fln(kn[0], kn[1], an[0], an[1], lc, 3.1);
    var fa = g[2]==='heel' ? -20 : g[2]==='toe' ? 25 : 90;
    var toe = fpv(an[0], an[1], fa, 7);
    s += fln(an[0], an[1], toe[0], toe[1], lc, 2.5);
  }
  return s + fln(-44, 27.5, 44, 27.5, '#B9B3A6', 1.3);
}
/* 俯視腳位：sp=每隻腳尖向外角度（相對中線），gap=兩腳踭距離 px，mm=標明距離 */
function fTOP(o){
  var sp = o.sp===undefined ? 30 : o.sp, g = o.gap||5, s = '';
  if (o.mm) g = o.mm*fS/2;
  s += fln(0, -30, 0, 12, '#90A4AE', 1, 1);
  for (var i=0;i<2;i++){
    var dir = i===0 ? -1 : 1, hx = dir*g, hy = 0;
    var fa = 180 + dir*sp;
    var toe = fpv(hx, hy, fa, 17);
    s += '<path d="M'+hx+','+hy+' L'+frd(toe[0])+','+frd(toe[1])+'" stroke="'+fA+'" stroke-width="6.4" stroke-linecap="round" data-ang="'+sp+'"/>';
    if (o.arc) s += '<path d="M'+frd(hx)+','+(hy-13)+' A13,13 0 0 '+(i===0?0:1)+' '+frd(fpv(hx,hy,180+dir*sp,13)[0])+','+frd(fpv(hx,hy,180+dir*sp,13)[1])+'" stroke="'+fAT+'" stroke-width="1.4" fill="none" data-ang="'+sp+'"/>';
  }
  if (o.mm) s += fDIM(-g, 0, g, 0, o.dim, o.mm);
  if (o.shiftTo) s += fln(g, 0, o.shiftTo, 0, fAT, 1.4, 1) + fdot(o.shiftTo, 0, 2, fAT);
  return s;
}
/* 正面人形（敬禮用；rArm=右手動作模式） */
function fFGG(o){
  var s = fdot(0, -30, 5.6) + '<rect x="-7" y="-24" width="14" height="19" rx="5" fill="'+fA+'"/>'
    + fln(-3.5, -5, -5, 16) + fln(-5, 16, -12, 16) + fln(3.5, -5, 5, 16) + fln(5, 16, 12, 16)
    + fln(-40, 17.5, 40, 17.5, '#B9B3A6', 1.3);
  s += fln(-7, -22, -14, -12, fA2, 2.7) + fln(-14, -12, -16, -1, fA2, 2.7) + fdot(-16, -1, 2.2, fA2);
  if (o.rArm === 'down') s += fln(7, -22, 14, -12) + fln(14, -12, 15, -1) + fdot(15, -1, 2.2);
  else if (o.rArm === 'side') s += fln(7, -22, 24, -22) + fdot(25.5, -22, 2.4) + fln(3, -22.6, 24, -22.6, fAD, 1);
  else if (o.rArm === 'at') s += fln(7, -22, 20, -26) + fln(20, -26, 5, -32)
    + '<path d="M5,-32 L-1,-34.5 L-1,-30 z" fill="'+fA+'"/>'
    + fln(2.5,-30,2.5,-35.5,fAD,1) + fln(0.8,-30,4.2,-30,fAD,1) + fln(0.8,-35.5,4.2,-35.5,fAD,1)
    + T(12,-30.5,'25mm',6.6,fAD,'start',1);
  return s;
}
/* 毫米尺寸線（帶 data-mm 俾 test 核對） */
function fDIM(x1, y1, x2, y2, label, mm){
  var s = fln(x1, y1, x2, y2, fAD, 1.1), dx = x2-x1, dy = y2-y1;
  var nx = (dy===0?0:(dx===0?3:-dy/Math.sqrt(dx*dx+dy*dy)*3)), ny = (dx===0?0:(dy===0?3:dx/Math.sqrt(dx*dx+dy*dy)*3));
  s += fln(x1-nx, y1-ny, x1+nx, y1+ny, fAD, 1.1) + fln(x2-nx, y2-ny, x2+nx, y2+ny, fAD, 1.1);
  s += '<rect x="'+frd(Math.min(x1,x2))+'" y="'+frd(Math.min(y1,y2)-3)+'" width="'+frd(Math.abs(dx)||2)+'" height="'+frd(Math.abs(dy)||2)+'" fill="none" stroke="none" data-mm="'+mm+'"/>';
  s += '<desc data-mm="'+mm+'" data-len="'+frd(Math.sqrt(dx*dx+dy*dy))+'"></desc>';
  return s + T((x1+x2)/2 + (dy===0?0:11), (y1+y2)/2 + (dx===0?0:-4), label, 6.8, fAD, 'middle', 1);
}
/* 俯視轉向弧（由 a0 轉到 a1，ang＝手冊規定角度） */
function fARC(cx, cy, rad, a0, a1){
  var p0 = [cx+rad*Math.sin(a0*Math.PI/180), cy-rad*Math.cos(a0*Math.PI/180)];
  var p1 = [cx+rad*Math.sin(a1*Math.PI/180), cy-rad*Math.cos(a1*Math.PI/180)];
  var sw = a1>a0 ? 1 : 0;
  var s = '<path d="M'+frd(p0[0])+','+frd(p0[1])+' A'+rad+','+rad+' 0 0 '+sw+' '+frd(p1[0])+','+frd(p1[1])
    +'" stroke="'+fAT+'" stroke-width="1.8" fill="none" stroke-dasharray="4,2.4" data-ang="'+frd(Math.abs(a1-a0))+'"/>';
  var t = (a1 + (sw?90:-90))*Math.PI/180, ux = Math.sin(t), uy = -Math.cos(t);
  return s + '<path d="M'+frd(p1[0]+ux*6.5)+','+frd(p1[1]+uy*6.5)+' L'+frd(p1[0]-uy*3.4)+','+frd(p1[1]+ux*3.4)
    + ' L'+frd(p1[0]+uy*3.4)+','+frd(p1[1]-ux*3.4)+' z" fill="'+fAT+'"/>';
}
/* 一格：標題＋圖＋三行註（棕／藍打數／紅警告） */
function fCL(n, title, art, l1, l2, l3, cols, cw, ch){
  cols = cols || 2; cw = cw || 160; ch = ch || 126;
  var col = (n-1)%cols, row = Math.floor((n-1)/cols);
  var x = 8+col*(cw+4), y = 20+row*(ch+4);
  return '<g transform="translate('+x+','+y+')">'
    + '<rect x="0" y="0" width="'+cw+'" height="'+ch+'" rx="8" fill="#EAF1E6" stroke="#C7D8C2"/>'
    + T(5, 12, title, 7.8, '#1B5E20', 'start', 1)
    + '<g transform="translate('+frd(cw/2)+',60) scale(0.86)">'+art+'</g>'
    + T(4, ch-25, l1, 6.6, '#6D4C41', 'start')
    + T(4, ch-17, l2, 6.6, '#0D47A1', 'start', 1)
    + T(4, ch-9, l3, 6.6, '#C62828', 'start')
    + '</g>';
}
/* 自動排版：panels=[[標題,圖,l1,l2,l3]]，cols=欄數 */
function fDGR(title, panels, cols, foot){
  cols = cols || 2;
  var cw = Math.floor((340-16-(cols-1)*4)/cols), ch = 126;
  var rows = Math.ceil(panels.length/cols), H = 20+rows*(ch+4)+14;
  var cells = panels.map(function(p, i){ return fCL(i+1, p[0], p[1], p[2], p[3], p[4], cols, cw, ch); }).join('');
  return svg(340, H, title,
    T(170, 12, title, 9.4, '#1B5E20', 'middle', 1) + cells
    + T(170, H-4, foot || '《步操手冊》第3–4章・分部動作（by numbers）逐格做熟，先至連貫做完全動作', 6.8, '#8D6E63', 'middle'));
}

/* ── v28 圖解 10 張（《步操手冊》第3–4章 分部動作）──────────────────── */

/* 1. 立正・抽膝・彈前腳〔第3章§1–2〕 */
D.cer.attn = fDGR('立正・抽膝踏步・彈前腳（第3章§1–2）', [
  ['① 立正（Alert!）腳位', fTOP({sp:30, gap:4, arc:1})
    + fln(0,-30,0,16,'#90A4AE',1,1),
    '腳掌平放地面・雙膝蹬直',
    '腳尖向外分開，與中線成 30 度角',
    'Attention／Squad Shun／Parade Shun 動作相同，典禮先用的'],
  ['② 立正 手・頸・眼', fFGG({rArm:'down'})
    + '<rect x="-11" y="-2" width="9" height="6" rx="2.6" fill="'+fA+'" data-note="fist"/>'
    + '<rect x="2" y="-2" width="9" height="6" rx="2.6" fill="'+fA+'"/>',
    '雙手握拳、手踭蹬直',
    '母指指甲向前放喺食指上，母指放於褲骨之後',
    '後顎貼衣領・眼望無限遠'],
  ['③ 抽膝踏步 Bend the knee!', fSFG({legs:[[90,12,'toe'],[0,0,'flat']], arms:[[0,0,1],[0,0,1]]})
    + fARC(0,0,17,0,90),
    '原地提高左（右）腳直至大腿與地面平行',
    '小腿放鬆；另一腳腳掌平放、膝頭蹬直',
    '握拳緊貼褲骨，身體各部分保持立正'],
  ['④ 彈前腳 Shoot the foot!', fSFG({legs:[[24,-6,'heel'],[0,0,'flat']], arms:[[0,0,1],[0,0,1]]})
    + fDIM(-1,32,17,32,'375mm',375),
    '口令：Shoot the right (left) foot forward!',
    '彈前右（左）腳半步 375 毫米',
    '熟咗就交替做：Bend knee + shoot foot']
], 2, '第3章§1–2・一般集會用「Alert!」就夠；Attention／Shun 留俾典禮');

/* 2. 稍息・休息・回立正〔第3章§2〕 */
function fBKN(loose){
  var s = '<rect x="-9" y="-22" width="18" height="26" rx="6" fill="'+fA2+'"/>'
    + '<circle cx="0" cy="-28" r="5.4" fill="'+fA+'"/>'
    + fln(-9,-18,-16,loose?4:-4, fA, 2.8) + fln(9,-18,16,loose?4:-4, fA, 2.8)
    + fln(-16,loose?4:-4,-2,loose?8:2, fA, 2.8) + fln(16,loose?4:-4,2,loose?8:2, fA, 2.8)
    + '<rect x="-6" y="0" width="12" height="5.5" rx="2.4" fill="'+fA+'"/>';
  return s + fln(-40,27.5,40,27.5,'#B9B3A6',1.3);
}
D.cer.rest = fDGR('稍息・休息・回立正（第3章§2）', [
  ['① 稍息 Stand at — ease!', fTOP({sp:30, gap:15, arc:1, mm:305, dim:'305mm'}),
    '提左腳至大腿平行，再用力向外踏下',
    '打數 Out!・腳踭分開 305mm（約同肩膊闊）',
    '雙腳腳掌平放、膝蹬直、重心放兩腳之間'],
  ['② 稍息 手部', fBKN(0),
    '雙手沿身體向後移至身後中央，由拳變掌',
    '右掌疊於左掌上，雙手母指緊扣',
    '所有手指及手踭蹬直，頸至頭保持立正向前'],
  ['③ 休息 Stand — easy!', fBKN(1),
    '口令無打數：只係將雙手手踭自然放鬆',
    '除手踭外，其餘與稍息完全相同',
    '回稍息：喊「Squad!」手踭用力拉緊蹬直'],
  ['④ 回立正 Alert!（打數 In!）', fSFG({legs:[[86,10,'toe'],[0,0,'flat']], arms:[[-16,-30,1],[-20,-34,1]]})
    + fARC(0,0,16,86,0),
    '左腳尖微微指向地下，用力踏回右腳旁',
    '雙手由掌變拳沿身體向前移至拇指貼褲骨',
    '⚠️ 立正↔休息唔可以直接互轉，要經稍息']
], 2, '《步操手冊》第3章§2・原地動作一律用標準停頓時距（每分鐘 40 個動作）');

/* 3. 原地四轉〔第3章§3–6〕 */
function fTURN(ang, pivotLabel){
  var body = '<rect x="-6" y="-11" width="12" height="22" rx="5" fill="'+fA+'"/>'
    + '<circle cx="0" cy="-15" r="4" fill="'+fA+'"/>'
    + fln(0,-11,0,-24,'#1B5E20',1.6,1) + '<path d="M-3,-21 L0,-26 L3,-21 z" fill="#1B5E20"/>';
  var feet = fTOP({sp:0, gap:4});
  return body + '<g transform="translate(0,26) scale(0.7)">'+feet+'</g>'
    + fARC(0,0,26,0,ang) + fdot(6,19,2.2,fAT) + (pivotLabel||'');
}
D.cer.turns = fDGR('原地轉法：向右・向左・向後・斜轉（第3章§3–6）', [
  ['① 向右轉 90 度', fTURN(90),
    'Turning, right — turn!／One—Two—Three—One',
    '軸心：右腳腳踭＋左腳腳尖；用頭、肩、身體的力轉',
    '「Two—Three」係停留時間冇動作'],
  ['② 向左轉 90 度', fTURN(-90),
    'Turning, left — turn!／One—Two—Three—One',
    '軸心：左腳腳踭＋右腳腳尖',
    '第二分部：提左膝？唔係 — 向左轉就提右膝至大腿平行'],
  ['③ 向後轉 180 度', fTURN(180),
    '口令 Turning, about — turn!',
    '以右腳踭＋左腳尖為軸，向右轉 180 度',
    '然後提左腳踏回右腳旁（打數 One）'],
  ['④ 向左／右斜轉 45 度', fTURN(45),
    '口令 Inclining, left/right — Incline!',
    '做法同向左／右轉，只係角度改為 45 度',
    '打數一樣 One—Two—Three—One']
], 2, 'by numbers：Squad One 轉身、Squad Two 提膝併腳；熟咗先連貫做');

/* 4. 原地向前敬禮〔第3章§7〕 */
D.cer.salute3 = fDGR('原地向前敬禮（第3章§7）・Up—Two—Three—Down', [
  ['① 預備（立正）', fFGG({rArm:'down'}),
    'Saluting, salute to the front — salute!',
    '打數 Up—Two—Three—Down',
    '左手握拳緊貼褲骨，雙腳腳掌平放'],
  ['② 「Up」向橫提至與肩膊平', fFGG({rArm:'side'})
    + fln(-30,-22,30,-22,'#90A4AE',1,1) + T(0,-31,'肩膊水平線',6.6,'#6D4C41','middle'),
    '右手向橫提昇直至與肩膊平',
    '同時將右手握成童軍敬禮手號',
    '先向橫提至與肩膊平，先至擺前臂'],
  ['③ 「Up」前臂擺至右眼對上', fFGG({rArm:'at'}),
    '用力將右前臂擺至食指於右眼對上的位置',
    '右食指喺右眼眼球中心對上 25 毫米',
    '右手前臂與指尖成一直線・頭向前望'],
  ['④ 「Down」放回褲骨', fFGG({rArm:'down'}) + fARC(22,-20,9,180,270),
    '右手用最短的距離握拳放回右邊褲骨',
    '分部：Saluting by numbers… one!',
    '「Two—Three」係停留時間冇動作']
], 2, '第3章§7・25mm 係手冊數字；「指尖接帽沿／眉梢」屬中式講法');

/* 5. 橫移〔第3章§8〕 */
D.cer.sidepace = fDGR('橫移 The side pace（第3章§8）・每步 300mm', [
  ['① One! 左腳向左橫移', (function(){
      var s = fln(0,-26,0,12,'#90A4AE',1,1);
      var tr = fpv(4,0,150,17); s += '<path d="M4,0 L'+frd(tr[0])+','+frd(tr[1])+'" stroke="'+fA+'" stroke-width="6.4" stroke-linecap="round" data-ang="30"/>';
      var go = fpv(-8,0,210,17); s += '<path d="M-8,0 L'+frd(go[0])+','+frd(go[1])+'" stroke="#90A4AE" stroke-width="6.4" stroke-linecap="round" opacity="0.45"/>';
      var gn = fpv(-23,0,210,17); s += '<path d="M-23,0 L'+frd(gn[0])+','+frd(gn[1])+'" stroke="'+fA+'" stroke-width="6.4" stroke-linecap="round" data-ang="30"/>';
      return s + fDIM(-8,22,-23,22,'300mm',300);
    })(),
    '左腳向左邊橫移 300 毫米，右腳保持原位',
    '口令 Left close march — one!／打數 One!',
    '雙膝蹬直、握拳貼褲骨、身向前'],
  ['② Two! 併返腳', fSFG({legs:[[0,0,'flat'],[88,10,'toe']], arms:[[0,0,1],[0,0,1]]}) + fARC(0,0,16,88,0),
    '提右膝至大腿與地面平行，右小腿放鬆',
    '打數 Two!・用力將右腳踏在左腳旁',
    '姿勢回復立正向前'],
  ['③ 多於一步：每步後加「Up」', (function(){var g='';for(var i=0;i<4;i++){g+=fln(-30+i*20,10,-30+i*20,-6,'#90A4AE',5.4,i===3?0:1);}return g+fDIM(-30,20,30,20,'300mm × 4',1200);})(),
    '打數序列：One — Two — Up — One — Two ···',
    '最後一步完成之後唔再加「Up」',
    '向右橫移就係 Right close — march!，動作相反'],
  ['④ 步數上限', (function(){var g='';for(var i=0;i<8;i++){g+='<rect x="'+frd(-44+i*11)+'" y="-2" width="10.6" height="14" rx="2.6" fill="#C8E6C9" stroke="#90A4AE" stroke-width="0.8"/>';}return g+T(0,-10,'8 步上限',7.6,'#C62828','middle',1);})(),
    '⚠️ 橫移嘅步數不得多於 8 步',
    '排長要移動先 8 步以內用橫移，超過就要用別嘅方法',
    '成個動作期間身軀保持立正向前']
], 2, '第3章§8・橫移用於調整位置；步操唔准用嚟罰人（第2章§3.1）');

/* 6. 快步開步〔第4章§1〕 */
function fSTRIDE(front){
  var s = front
    ? fSFG({lean:0, legs:[[26,-6,'heel'],[0,0,'flat']], arms:[[-78,-88,1],[74,84,1]]})
    : fSFG({lean:0, legs:[[0,0,'flat'],[26,-6,'heel']], arms:[[78,88,1],[-74,-84,1]]});
  return s + fDIM(-19,33,18.5,33,'750mm',750);
}
D.cer.qmarch = fDGR('快步行進：開步與三步（第4章§1）・116 步/分鐘', [
  ['① Left! 左腳行前一步', fSTRIDE(1),
    '左腳行前 750 毫米，右腳腳掌平放地面',
    '右手向前提升至與肩膊平、左手盡量拉後',
    '打數 Left!（分部口令 Marching by numbers, quick march — one!）'],
  ['② Right! 右腳行前一步', fSTRIDE(0),
    '右腳行前 750 毫米，左腳腳掌平放',
    '左手向前提升至與肩膊平、右手盡量拉後',
    '重心放喺雙腳之間、雙膝蹬直'],
  ['③ Left! 繼續交替', fSTRIDE(1) + fln(30,-30,44,-30,fAT,1.4) + '<path d="M44,-34 L52,-30 L44,-26 z" fill="'+fAT+'"/>',
    '第三分部同第一分部一樣（左腳）',
    '打數 Left — Right — Left ···',
    '每分鐘 116 步，連貫做出三個分部動作'],
  ['④ 三種開步口令', (function(){
      return '<rect x="-52" y="-28" width="104" height="14" rx="4" fill="#fff" stroke="#C7D8C2"/>'
        + T(0,-19,'多於一排：By the left',6.4,'#333','middle')
        + '<rect x="-52" y="-12" width="104" height="14" rx="4" fill="#fff" stroke="#C7D8C2"/>'
        + T(0,-3,'面向前後：Squad will advance',6.4,'#333','middle')
        + '<rect x="-52" y="4" width="104" height="14" rx="4" fill="#fff" stroke="#C7D8C2"/>'
        + T(0,13,'一排：Step off together',6.4,'#333','middle');
    })(),
    '面向前／後要加「Squad will advance（retire）」',
    '「Step off together」用於一排時',
    '開步嘅動令「march」喺右腳踭著地時發出'],
  ['⑤ 慢步版（第5章§1）', fSFG({legs:[[17,-4,'heel'],[0,0,'flat']], arms:[[0,0,1],[0,0,1]]}) + fDIM(-1,33,18.5,33,'375mm',375),
    '第一分部：左腳行前半步 375mm（外側斜向離地）',
    '第二分部「Left foot — forward!」先完成 750mm',
    '每分鐘 65 步：行到 375mm 時稍作停頓配合時間']
], 2, '第4章§1・第5章§1・動令落邊隻腳請對「口令與動令時間表」卡');

/* 7. 快步停步〔第4章§2〕 */
D.cer.qhalt = fDGR('快步行進間停步（第4章§2）・Squad — HALT!', [
  ['① Freeze!（右腳多行一步）', fSFG({legs:[[0,0,'flat'],[26,-6,'heel']], arms:[[74,84,1],[-78,-88,1]]}) + fDIM(-18.5,33,19,33,'750mm',750),
    '右腳行前一步 750mm，左手前提、右手拉後',
    '動令喺左腳腳踭著地時發出',
    '重心放右腳、左腳尖著地、腳踭離地'],
  ['② One!（左腳半歩）', fSFG({legs:[[15,-4,'flat'],[0,0,'flat']], arms:[[-70,-80,1],[66,76,1]]}) + fDIM(-1,33,18.5,33,'375mm',375),
    '左腳行前半步 375 毫米',
    '左腳腳掌平放、右腳尖著地',
    '右手前提、左手拉後、身軀挺直'],
  ['③ Two!（踏回並夾手）', fSFG({legs:[[0,0,'flat'],[88,10,'toe']], arms:[[-14,-24,1],[14,24,1]]}) + fARC(0,0,15,88,0),
    '右腳向前提高至大腿與地面平行',
    '同一時間將雙手用力夾回褲骨旁邊',
    '然後踏下右腳在左腳旁，回復立正'],
  ['④ 速度分配', (function(){
      return '<path d="M-40,6 L-4,-14" stroke="#0D47A1" stroke-width="1.6" marker-end="none"/>'
        + T(-22,-20,'一 → 二：116 步速',6.6,'#0D47A1','middle')
        + '<path d="M4,6 L40,-20" stroke="#C62828" stroke-width="2.2"/>'
        + T(24,-26,'二 → 三：雙倍速度',6.6,'#C62828','middle',1)
        + fln(-40,10,40,10,'#B9B3A6',1.2);
    })(),
    '第一至第二分部照行進速度做',
    '第二至第三分部要以雙倍速度完成',
    '全隊打數：One — Two']
], 2, '第4章§2・Freeze／One／Two 逐個做熟，先至連貫做完全動作');

/* 8. 行進間向左／右轉〔第4章§3–4〕 */
D.cer.marchturn = fDGR('行進間向左／向右轉（第4章§3–4）・Check — Down', [
  ['① Freeze! 多行一步', fSFG({legs:[[24,-6,'heel'],[0,0,'flat']], arms:[[-74,-84,1],[78,88,1]]}) + fDIM(-19,33,18.5,33,'750mm',750),
    '向左轉：左腳行前一步 750mm（重心放左腳）',
    '動令 Down 喺右腳踭著地時發出',
    '向右轉就係右腳行前一步，動作相反'],
  ['② Two! 提膝夾手', fSFG({legs:[[0,0,'flat'],[88,10,'toe']], arms:[[-14,-24,1],[14,24,1]]}) + fARC(0,0,15,88,0),
    '將右膝向前提起至大腿與地面平行',
    '同一時間雙手用力夾回褲骨旁邊',
    '左腳腳掌平放、膝蹬直，重心放左腳'],
  ['③ Three! 以腳踭為軸轉 90 度', fTURN(90) + fDIM(6,34,25,34,'375mm',375),
    '以左腳腳踭為軸向左轉 90 度',
    '踏下右腳至左腳旁，並立即伸出半步 375mm',
    '向右轉：以右腳踭為軸、向左轉就換邊'],
  ['④ Forward! 繼續操', fSTRIDE(1),
    '左腳繼續完成一步 750mm',
    '向前提升之手要提升至與肩膊平',
    '打數 Forward!・以每分鐘 116 步繼續向前操']
], 2, '第4章§3–4・四分部（Freeze／Two／Three／Forward）逐個做熟先連貫');

/* 9. 行進間向後轉〔第4章§5〕 */
D.cer.marchabout = fDGR('行進間向後轉（第4章§5）・In—Left—Right—Left—Forward', [
  ['① In! 收腳', fSFG({legs:[[22,-5,'flat'],[0,0,'flat']], arms:[[-16,-26,1],[16,26,1]]})
    + fDIM(-15,33,22.5,33,'750mm',750) + fDIM(22.5,26,30,26,'150mm',150),
    '左腳行前一步 750mm，右手前提左手拉後',
    '右腳繼續行前一小步 150 毫米，同時夾手回褲骨',
    '右腳踭緊貼左腳腳掌內側、雙膝蹬直'],
  ['② Left! 轉 90 度', fTURN(90),
    '提左腳至大腿與地面平行',
    '同時以右腳腳踭為軸向右轉 90 度',
    '盡快將左腳踏於右腳旁（已面向新方向）'],
  ['③ Right! 再轉 90 度', fTURN(90),
    '提右腳至大腿與地面平行',
    '以左腳腳踭為軸再向右轉 90 度',
    '踏右腳於左腳旁 — 兩段合埋即 180 度'],
  ['④ Left! → Forward! 繼續操', fSTRIDE(0),
    '提左腳踏回右腳旁，然後右腳行前 750mm',
    '左手前提、右手拉後，回復行進姿勢',
    '初學可將①②合併做（打數 In — Left）']
], 2, '第4章§5・向後轉係兩次 90 度，唔准一腳掃過去');

/* 10. 行進間換步〔第4章§6〕 */
D.cer.changestep = fDGR('行進間換步（第4章§6）・Changing step, change — step!', [
  ['① Left! 行前一步', fSTRIDE(1),
    '左腳行前 750mm，右手前提左手拉後',
    'Change 喺左腳踭著地、Step 喺右腳踭',
    '右腳腳尖著地、腳踭離地'],
  ['② Right! 踏喺左腳踭後', fSFG({legs:[[0,0,'flat'],[70,50,'toe']], arms:[[-16,-26,1],[16,26,1]]})
    + '<circle cx="-3" cy="26" r="3" fill="none" stroke="'+fAD+'" stroke-width="1.2" data-note="heel"/>',
    '右腳向前提高至大腿與地面平行，夾手回褲骨',
    '右腳踏下於左腳腳踭後，內側緊貼左腳踭',
    '⚠️ 呢格就係有冇換啱腳嘅關鍵'],
  ['③ Left! 恢復行進', fSTRIDE(1),
    '左腳行前一步 750mm 繼續操',
    '後兩步要以雙倍速度完成',
    '全隊打數 Left — Right — Left'],
  ['④ 也可以左右相反', fSFG({legs:[[0,0,'flat'],[24,-6,'heel']], arms:[[74,84,1],[-78,-88,1]]}),
    '手冊註：動令時間可左右相反',
    '動作手脚同時相反，打數改為 Right — Left — Right',
    '教識先試相反版，唔好兩版溝住用']
], 2, '第4章§6・換步喺行進間完成，唔使停低（Change／Step 要連續發出）');

/* 《步操手冊》第7章：旗手四式側面姿勢（竿角為重點） */
D.cer.colour = svg(340,296,'旗操四式：持旗立正／攜旗／托旗／原地敬禮',
  MK
  +T(170,13,'旗操四式（第7章）・側面睇・竿角就係判別重點',9.6,'#1B5E20','middle',1)
  + COL(1,'① 持旗立正 The Order','竿與地面垂直','竿底喺右腳尾趾旁','flag 0','唔准將旗拉緊')
  + COL(2,'② 攜旗 The Carry','竿仍然垂直','竿插喺旗套・右手喺口部對出','flag 1','右前臂與地面平行')
  + COL(3,'③ 托旗 The Slope','竿與地面成 45 度','竿放喺右肩・肩至手用旗身覆蓋','flag 2','手踭屈曲至前臂平行')
  + COL(4,'④ 原地敬禮 Lower','竿橫掃・夾喺腋下','竿頂微微離開地面・旗身完全展開','flag 3','眼球保持向前直望')
  +T(170,282,'持旗稍息：兩腳踭分開 300mm、左手握拳蹬直貼褲骨；風大時用左手協助抓回旗幟',8,'#8D6E63','middle')
  +T(170,292,'快步敬禮：聽「Right」再操兩步才讓旗飄揚（打數 Check—Up）；慢步四步內完成（打數 Up）',8,'#8D6E63','middle'));

/* 《步操手冊》第8章：七款集隊手號（司令員手部姿勢） */
D.cer.handsign = svg(340,336,'集隊手號七款（司令員手部姿勢示意）',
  MK
  +T(170,13,'集隊手號七款（第8章）・司令員先立正 → 發口令 → 做手號',9,'#1B5E20','middle',1)
  +'<g font-family="sans-serif">'
  + HS(1,'直線','兩手握拳向兩側平提升','與肩膀成一直線','flat')
  + HS(2,'直線・高矮','一手面前屈肘90°手背向前','另一手向側平伸・最高居中','oneUp')
  + HS(3,'直行','兩手握拳向前平升至與肩齊','手背向天','fwd')
  + HS(4,'闊橫排','兩手向側平伸','前臂上彎90°手背向外','sideUp')
  + HS(5,'窄橫排','兩手向前平伸','前臂上彎90°手背向前','fwdUp')
  + HS(6,'馬蹄鐵形','雙手蹬直向前（連手掌）','左手腕疊喺右手腕上','cross')
  + HS(7,'開口正方形','雙手手掌互相緊握','右手背向前・高舉過頭頂','over')
  +'</g>'
  +T(170,318,'隊員喺司令員前 2250mm 排好後仍保持立正，待佢放下雙手先轉稍息',8.2,'#8D6E63','middle')
  +T(170,330,'隊員左右 750mm；隊與隊：直線／馬蹄／開口正方形 1500mm，直行／窄橫排 750mm',7.6,'#8D6E63','middle'));

/* 《步操手冊》第4–6章：動令落腳時間＋打數 */
D.cer.march = svg(340,214,'行進間口令：動令落腳時間與打數',
  MK
  +T(170,13,'行進間動作・動令落邊隻腳＋打數（第4–6章）',9.6,'#1B5E20','middle',1)
  +'<g font-family="sans-serif">'
  + MD(1,'開步','By the right (left),','QUICK — MARCH','Left—Right—Left','116 步/分・步幅 750mm')
  + MD(2,'停步','Squad —','HALT','One—Two','動令：左腳腳踭著地')
  + MD(3,'左／右轉','Turning, left (right),','TURN','Check—Down','轉 90°・出半步 375mm')
  + MD(4,'向後轉','Turning, about,','TURN','In—Left—Right—Left','慢步：One—Two—Three Stop')
  + MD(5,'原地踏步','Quick mark —','TIME','Left—Right—Left','大腿與地面平行・拳貼褲骨')
  + MD(6,'換步','Changing step,','CHANGE — STEP','Left—Right—Left','後兩步用雙倍速度')
  + MD(7,'行進間敬禮','Salute to the right,','SALUTE','Up—2—3—4—5—Down','食指喺右眼對上 25mm')
  + MD(8,'睇齊','Dressing, right,','DRESS','Up—Two—Three—Move','移一隻手位；EYES—FRONT 打數 Down')
  + MD(9,'轉彎','Right (left),','WHEEL','沒有','半徑 600mm・4 步・不超過 6 排')
  +'</g>'
  +T(170,205,'初學逐個分部喊「Squad — two／three…」，熟咗先連實做完整動作',8.4,'#8D6E63','middle'));

/* 中式隊列／步操手冊：立正腳位（腳尖 30°・握拳貼褲骨）・童軍動作・齊步（三格） */
D.cer.drill = svg(340,168,'中式隊列基本動作示意圖',
  MK
  +T(170,16,'中式隊列・三個動作要領（俯視／後視／側視示意）',11.5,'#1B5E20','middle',1)
  /* A 立正：俯視腳部 */
  +'<g transform="translate(48,66)">'
  +'<ellipse cx="-13" cy="-10" rx="6.5" ry="13" fill="#37474F" transform="rotate(-22 -13 -10)"/>'
  +'<ellipse cx="13" cy="-10" rx="6.5" ry="13" fill="#37474F" transform="rotate(22 13 -10)"/>'
  +'<path d="M-26,-28 A32,32 0 0 1 26,-28" fill="none" stroke="#2E7D32" stroke-width="1.5" stroke-dasharray="3,3"/>'
  +T(0,-40,'腳尖向外與中線成30°',9.5,'#2E7D32')
  +T(0,22,'腳跟靠攏・腳掌平放',9.5,'#666')+'</g>'
  +T(48,112,'A 立正',11,'#333',null,1)+T(48,128,'握拳・拇指壓食指',9.5,'#8D6E63')
  /* B 童軍動作：後面睇 */
  +'<g transform="translate(170,64)">'
  +'<circle cx="0" cy="-30" r="9" fill="#37474F"/>'
  +'<rect x="-11" y="-19" width="22" height="36" rx="7" fill="#37474F"/>'
  +'<path d="M-11,-12 L-15,7 L-1,13" fill="none" stroke="#37474F" stroke-width="4.5" stroke-linecap="round"/>'
  +'<path d="M11,-12 L15,7 L1,13" fill="none" stroke="#37474F" stroke-width="4.5" stroke-linecap="round"/>'
  +'<circle cx="0" cy="13" r="5.5" fill="#F9A825"/>'
  +'</g>'
  +T(170,112,'B 童軍動作（後面睇）',11,'#333',null,1)
  +T(170,128,'雙手放身後中央・右掌疊左掌',9.5,'#8D6E63')
  /* C 齊步：腳印示意 */
  +'<g transform="translate(290,64)">'
  +'<ellipse cx="-16" cy="14" rx="6" ry="10" fill="#B0BEC5"/>'
  +'<ellipse cx="14" cy="-8" rx="6" ry="10" fill="#37474F" transform="rotate(14 14 -8)"/>'
  +arrow(-12,10,8,-6,'#2E7D32',1.5)
  +T(0,-28,'步幅750mm',9.5,'#2E7D32')
  +'</g>'
  +T(290,112,'C 齊步——走',11,'#333',null,1)
  +T(290,128,'左腳先行・116 步/分',9.5,'#8D6E63')
  +T(170,158,'口令＝介令＋預令＋動令；原地停 1.5 秒；唔准用步操罰人',9.5,'#8D6E63')
);

/* 升旗禮：旗桿與觀眾位置 */
D.cer.flag = svg(340,180,'升旗禮位置示意圖',
  MK
  +T(170,16,'升旗禮・旗桿與站位（示意）',12,'#1B5E20','middle',1)
  +box(96,28,150,106,'#FAFAFA','#C8E6C9')
  +pole(150,118,66,'#DE2910','國旗')
  +pole(216,118,46,'#00704C','區旗')
  +T(183,144,'國旗喺中央且高於區旗',10.5,'#C62828','middle',1)
  +dot(64,84,5,'#37474F')+T(64,70,'旗手',10,'#2E7D32')
  +dot(276,84,5,'#37474F')+T(276,70,'護旗',10,'#2E7D32')
  +row(76,160,9,26)+row(76,174,9,26)
  +T(64,158,'全體面向旗桿立正',10,'#666','start')
  +T(170,38,'奏國歌時同步揚旗・緩緩升至頂部',10.5,'#666')
  +T(170,54,'戴帽→三指舉手禮・無帽→注目禮',10.5,'#1565C0')
);

/* 宣誓儀式：位置圖 */
D.cer.oath = svg(340,180,'宣誓儀式位置示意圖',
  MK
  +T(170,16,'宣誓儀式・站位（依儀式卡程序繪畫）',11.5,'#1B5E20','middle',1)
  +pole(170,64,26,'#C62828','團旗（中央）')
  +sq(112,70,6,'#2E7D32')+T(112,56,'團長',10.5,'#2E7D32')
  +dot(170,76,5,'#F9A825')+T(170,92,'新成員：舉右手三指禮・跟讀誓詞',10.5,'#8D6E63')
  +box(26,102,96,34,'#F3E5F5','#CE93D8')+T(74,116,'見證家長',10.5,'#6A1B9A')+T(74,129,'（前排／側坐）',10,'#6A1B9A')
  +box(218,102,96,34,'#E3F2FD','#90CAF9')+T(266,116,'資深成員',10.5,'#1565C0')+T(266,129,'持旗旁立',10,'#1565C0')
  +row(80,152,8,26)
  +T(170,172,'全團整齊排列（後方）・禮成後左手握手・全團歡呼迎新的隊員',10.5,'#666')
);

/* 三指敬禮：手勢＋全禮半禮 */
D.cer.salute = (function(){
  function fig(x,hi,cap1,cap2){
    var g='<g transform="translate('+x+',78)">'
      +'<circle cx="0" cy="-26" r="9" fill="#37474F"/>'
      +'<path d="M-10,-30 L10,-30 L8,-38 L-8,-38 z" fill="#5D4037"/>'
      +'<rect x="-9" y="-15" width="18" height="30" rx="6" fill="#37474F"/>'
      +'<line x1="-4" y1="15" x2="-5" y2="34" stroke="#37474F" stroke-width="5" stroke-linecap="round"/>'
      +'<line x1="4" y1="15" x2="5" y2="34" stroke="#37474F" stroke-width="5" stroke-linecap="round"/>';
    if(hi){
      g+='<path d="M7,-8 L14,-24 L5,-30" fill="none" stroke="#37474F" stroke-width="4.5" stroke-linecap="round"/>'
        +'<circle cx="4" cy="-31" r="3.2" fill="#F9A825"/>';
      g+=ln(-14,-31,16,-31,1,'#1565C0','3,3');
    } else {
      g+='<path d="M7,-8 L13,-2 L11,-14" fill="none" stroke="#37474F" stroke-width="4.5" stroke-linecap="round"/>'
        +'<circle cx="11" cy="-16" r="3.2" fill="#F9A825"/>';
      g+=ln(0,-16,20,-16,1,'#1565C0','3,3');
    }
    g+='</g>'+T(x,126,cap1,10.5,'#333',null,1)+T(x,140,cap2,9.5,'#8D6E63');
    return g;
  }
  return svg(340,152,'童軍三指敬禮手勢示意圖', MK
    +T(170,14,'三指敬禮・手勢與高度',12,'#1B5E20','middle',1)
    +'<g transform="translate(58,86)">'
    +'<rect x="-15" y="16" width="30" height="15" rx="5" fill="#F1C9A5" stroke="#B07B4F" stroke-width="1.5"/>'
    +'<rect x="-14" y="-34" width="9" height="50" rx="4.5" fill="#F1C9A5" stroke="#B07B4F" stroke-width="1.5"/>'
    +'<rect x="-4.5" y="-40" width="9" height="56" rx="4.5" fill="#F1C9A5" stroke="#B07B4F" stroke-width="1.5"/>'
    +'<rect x="5" y="-34" width="9" height="50" rx="4.5" fill="#F1C9A5" stroke="#B07B4F" stroke-width="1.5"/>'
    +'<rect x="15" y="2" width="8" height="14" rx="4" fill="#F1C9A5" stroke="#B07B4F" stroke-width="1.5"/>'
    +'<path d="M-21,16 Q-25,4 -15,1" fill="none" stroke="#B07B4F" stroke-width="3" stroke-linecap="round"/>'
    +T(0,-52,'食指・中指・無名指',9.5,'#C62828')
    +T(0,-40,'並攏伸直',9.5,'#C62828')
    +T(-6,26,'拇指壓住小指',8.5,'#C62828','start')
    +'</g>'
    +T(58,126,'手勢（掌心面）',10.5,'#333',null,1)
    +T(58,140,'三指＝誓詞三部分',9.5,'#8D6E63')
    +ln(128,24,128,148,'#E0E0E0',1)
    +fig(200,1,'全禮','指尖齊右眉／帽沿')
    +ln(262,24,262,148,'#E0E0E0',1)
    +fig(312,0,'半禮','手約齊肩')
  );
})();

/* ══════════ 🎮 遊戲場地圖（DIAGRAMS.game） ══════════ */
D.game = {};

D.game['有口難言'] = svg(340,120,'有口難言場地示意',
  MK+T(170,14,'有口難言・排隊示意（全程唔准出聲）',11.5,'#1B5E20','middle',1)
  +ln(20,60,320,60,1.5,'#B0BEC5','5,4')
  +dot(46,60)+dot(84,60)+dot(120,60)+dot(158,60)+dot(196,60)+dot(234,60)+dot(272,60)+dot(306,60)
  +T(30,80,'1月',9.5,'#666','start')+T(310,80,'12月',9.5,'#666','end')
  +arrow(60,94,280,94,'#2E7D32',1.5)
  +T(170,40,'用手勢比月份/日期，自行排成一條直線',10.5,'#8D6E63')
);
D.game['直呼其名'] = svg(340,126,'直呼其名場地示意',
  MK+T(170,14,'直呼其名・圍圈拋球（先叫名，聽到「到」先抛）',11.5,'#1B5E20','middle',1)
  +'<circle cx="120" cy="70" r="36" fill="none" stroke="#B0BEC5" stroke-width="1.5" stroke-dasharray="4,4"/>'
  +dot(120,34)+dot(156,70)+dot(120,106)+dot(84,70)+dot(94,44)+dot(146,44)+dot(146,96)+dot(94,96)
  +arrow(120,34,152,66,'#F9A825',2)+arrow(146,96,90,72,'#F9A825',2)
  +sq(252,64,6,'#2E7D32')+T(252,48,'領袖',10,'#2E7D32')+dot(252,88,4,'#999')+T(252,102,'軟球',10,'#666')
);
D.game['繩索挑戰'] = svg(340,126,'繩索挑戰場地示意',
  MK+T(170,14,'繩索挑戰・全隊用一條繩砌出指定形狀',11.5,'#1B5E20','middle',1)
  +'<rect x="110" y="36" width="120" height="60" fill="none" stroke="#6D4C41" stroke-width="5" rx="4"/>'
  +dot(110,36)+dot(170,36)+dot(230,36)+dot(230,96)+dot(170,96)+dot(110,96)
  +T(170,68,'正方形',11,'#6D4C41')
  +dot(70,48,4,'#999')+dot(58,64,4,'#999')+T(60,90,'隊員拉繩砌形',9.5,'#8D6E63','start')
  +T(170,116,'進階：砌星形・唔准講嘢・手唔可以離繩',10,'#8D6E63')
);
D.game['飛毯'] = svg(340,120,'飛毯場地示意',
  MK+T(170,14,'飛毯・全隊企喺帆布上，將帆布反轉（無人落地）',11,'#1B5E20','middle',1)
  +'<rect x="118" y="40" width="104" height="52" fill="#C8E6C9" stroke="#2E7D32" stroke-width="2.5" transform="rotate(-6 170 66)"/>'
  +dot(140,58)+dot(162,54)+dot(186,58)+dot(208,62)+dot(150,78)+dot(176,82)+dot(200,78)
  +'<path d="M236,50 q18,12 0,28" fill="none" stroke="#F9A825" stroke-width="3"/>'
  +T(170,110,'策略自己傾：疊位／翻邊／分段轉',10,'#8D6E63')
);
D.game['執包比賽'] = svg(340,120,'執包比賽場地示意',
  MK+T(170,14,'執包比賽・一隊一張枱：揀啱嘢＋執得啱放',11.5,'#1B5E20','middle',1)
  +box(56,34,124,54,'#FFF8E1','#F9A825')+T(118,56,'物品池 20 樣',10.5,'#333')+T(118,72,'（14 啱用 + 6 陷阱）',10,'#C62828')
  +'<rect x="242" y="32" width="34" height="56" rx="8" fill="#C8E6C9" stroke="#2E7D32" stroke-width="2"/>'
  +T(259,64,'背囊',10,'#2E7D32')
  +arrow(184,60,238,60,'#2E7D32',2)
  +T(170,110,'⏱ 限時 10 分鐘・完隊展示：帶咗咩・點解咁放',10,'#8D6E63')
);
D.game['結繩接力賽'] = svg(340,126,'結繩接力賽場地示意',
  MK+T(170,14,'結繩接力賽・起點 → 任務枱打結 → 評判檢查 → 接力',11,'#1B5E20','middle',1)
  +row(36,48,4,16)+T(44,72,'起點',10.5,'#2E7D32')
  +row(36,96,4,16)+T(52,118,'候跑區',10,'#8D6E63','start')
  +box(140,52,76,46,'#FFF8E1','#F9A825')+T(178,70,'任務枱',10.5,'#333')+T(178,86,'抽卡打結',10,'#666')
  +sq(272,75,7,'#2E7D32')+T(272,56,'評判',10,'#2E7D32')
  +arrow(82,76,136,76)+arrow(220,70,262,72,'#FF8F00')
  +T(170,118,'✅ 結打啱先准接力（速度半・準確半）',10,'#8D6E63')
);
D.game['拖木頭挑戰'] = svg(340,120,'拖木頭挑戰場地示意',
  MK+T(170,14,'拖木頭挑戰・曳木結固定「木頭」，拖行 5 米繞樁折返',11,'#1B5E20','middle',1)
  +ln(24,52,316,52,1.5,'#B0BEC5','5,4')
  +'<rect x="44" y="58" width="26" height="13" rx="3" fill="#6D4C41"/>'
  +'<line x1="70" y1="64" x2="106" y2="64" stroke="#8D6E63" stroke-width="2.5"/>'
  +dot(114,64)+T(114,88,'拉',10,'#2E7D32')
  +'<polygon points="280,54 288,72 272,72" fill="#F9A825" stroke="#E65100"/>'
  +arrow(136,62,256,62,'#2E7D32',2)+arrow(256,70,136,70,'#FF8F00',2)
  +T(170,106,'⚠️ 通道兩邊唔企人・唔准企喺條繩前面',10,'#C62828')
);
D.game['急救情境賽'] = svg(340,120,'急救情境賽站點示意',
  MK+T(170,14,'急救情境賽・一隊一張墊：抽卡 → 做＋講 → 評判核對',11,'#1B5E20','middle',1)
  +box(20,36,88,58,'#FFEBEE','#E57373')+T(64,54,'處理區',10,'#C62828')+dot(44,78,4,'#37474F')+dot(62,78,4.5,'#90A4AE')+dot(80,78,4,'#37474F')+T(62,92,'「傷者」',9.5,'#666')
  +arrow(114,64,134,64)
  +box(140,36,64,58,'#F5F5F5','#BDBDBD')+T(172,56,'情境卡',10,'#333')+T(172,70,'扭傷/燙親',9.5,'#666')+T(172,82,'鼻血/刺傷',9.5,'#666')
  +arrow(210,64,230,64)
  +sq(268,64,8,'#2E7D32')+T(268,44,'評判',10,'#2E7D32')
  +T(268,88,'步驟60%',9.5,'#666')+T(268,100,'速度20%・安慰20%',9.5,'#666')
);
D.game['定向尋寶'] = svg(340,130,'定向尋寶路線示意',
  MK+T(170,14,'定向尋寶・按任務卡方位逐站蓋印（每站有領袖睇住）',11,'#1B5E20','middle',1)
  +'<rect x="24" y="30" width="292" height="72" fill="#F1F8E9" stroke="#AED581" stroke-width="1.5"/>'
  +sq(58,50,7,'#C62828')+T(58,38,'起',10,'#C62828')
  +'<circle cx="150" cy="46" r="7" fill="#1565C0"/>'+T(150,34,'站1',10,'#1565C0')
  +'<circle cx="240" cy="62" r="7" fill="#1565C0"/>'+T(240,50,'站2',10,'#1565C0')
  +'<circle cx="188" cy="86" r="7" fill="#1565C0"/>'+T(188,102,'站3',10,'#1565C0')
  +'<circle cx="284" cy="88" r="7" fill="#F9A825"/>'+T(284,114,'終點',10.5,'#E65100')
  +arrow(66,52,140,48,'#2E7D32',1.5)+arrow(158,48,232,60,'#2E7D32',1.5)+arrow(236,68,196,82,'#2E7D32',1.5)+arrow(196,88,274,88,'#2E7D32',1.5)
  +T(70,118,'🧭 例：向東50步 → 向北30步 …',10,'#666','start')
);
D.game['沙灘旗'] = svg(340,120,'沙灘旗場地示意',
  MK+T(170,14,'沙灘旗・俯卧一線，哨聲一響先起身搶旗',11.5,'#1B5E20','middle',1)
  +dot(40,74,4.5)+dot(70,74,4.5)+dot(100,74,4.5)+dot(130,74,4.5)+dot(160,74,4.5)
  +ln(28,74,172,74,1.5,'#B0BEC5','5,4')+T(100,92,'俯卧線（出發線）',10,'#666')
  +arrow(176,74,240,74,'#2E7D32',2)
  +ln(250,74,250,44,2.5,'#5D4037')+'<path d="M250,44 l20,5 l-20,5 z" fill="#C62828"/>'
  +T(256,100,'5–10 米',10,'#8D6E63')
  +T(170,114,'逐輪淘汰，最後贏家做「旗王」；分多條線避免撞埋一齊',10,'#8D6E63')
);
D.game['運水接力'] = svg(340,120,'運水接力場地示意',
  MK+T(170,14,'運水接力・水源 → 端杯跑 → 倒入隊桶（限時鬥多）',11,'#1B5E20','middle',1)
  +box(20,46,54,38,'#E3F2FD','#1565C0')+T(47,61,'水源',10,'#1565C0')+T(47,75,'桶/水缸',9.5,'#666')
  +box(266,46,54,38,'#E8F5E9','#2E7D32')+T(293,61,'終點桶',10,'#2E7D32')+T(293,75,'量水位',9.5,'#666')
  +dot(118,64)+dot(170,64)+dot(222,64)
  +arrow(80,64,258,64,'#1565C0',2)+arrow(258,76,80,76,'#90CAF9',1.5)
  +T(170,106,'杯越細越好玩・灑出嚟唔扣分・濕地易跣要清跑道',10,'#8D6E63')
);
D.game['大風吹'] = svg(340,126,'大風吹圍圈示意',
  MK+T(170,14,'大風吹・櫈圍圈（少一張），「鬼」企中間',11.5,'#1B5E20','middle',1)
  +(function(){var s='';for(var i=0;i<10;i++){var a=(i/10)*Math.PI*2-Math.PI/2;var x=170+Math.cos(a)*52,y=72+Math.sin(a)*38;
    s+='<rect x="'+(x-7)+'" y="'+(y-5)+'" width="14" height="10" rx="2" fill="#BCAAA4" stroke="#8D6E63" stroke-width="1"/>';}return s;})()
  +dot(170,72,6,'#C62828')+T(170,92,'「鬼」',10,'#C62828')
  +T(170,116,'「大風吹！」「吹咩？」「吹着短襪嘅！」→ 中咗者換位・鬼搶位',10,'#8D6E63')
);

/* ══════════ 🪢 技能圖（DIAGRAMS.skillx） ══════════ */
D.skillx = {};

D.skillx.ropecare = svg(340,120,'收繩與保養示意',
  MK+T(170,14,'收繩・圈繞收法 ＋ 保養五要点',11.5,'#1B5E20','middle',1)
  +'<ellipse cx="70" cy="58" rx="32" ry="24" fill="none" stroke="#6D4C41" stroke-width="5"/>'
  +'<ellipse cx="70" cy="58" rx="20" ry="14" fill="none" stroke="#8D6E63" stroke-width="3"/>'
  +'<path d="M92,42 q14,-8 6,12" fill="none" stroke="#F9A825" stroke-width="4"/>'
  +T(70,98,'① 一圈圈繞成束',10,'#666')
  +T(70,112,'② 繩尾纏頂部數圈・穿過拉緊',10,'#666')
  +ln(140,26,140,116,'#E0E0E0',1)
  +T(246,44,'🚫 唔好踩・唔好拖落地',10.5,'#C62828')
  +T(246,64,'💧 污糟清水洗・陰乾唔暴曬',10.5,'#1565C0')
  +T(246,84,'🔍 斷絲/磨損/發霉＝報廢',10.5,'#333')
  +T(246,102,'📦 通風乾燥位・避熱源化學品',10.5,'#333')
);

D.skillx.legend = svg(340,130,'地圖圖例示意',
  MK+T(170,14,'地圖常見圖例（示意；實際以地圖圖例欄為準）',11.5,'#1B5E20','middle',1)
  +'<g transform="translate(14,24)">'+box(0,0,76,44,'#FAFAFA','#E0E0E0')+'<line x1="8" y1="20" x2="68" y2="20" stroke="#C62828" stroke-width="5"/><line x1="8" y1="20" x2="68" y2="20" stroke="#fff" stroke-width="1" stroke-dasharray="6,4"/>'+T(38,58,'車路',10)+'</g>'
  +'<g transform="translate(98,24)">'+box(0,0,76,44,'#FAFAFA','#E0E0E0')+'<line x1="8" y1="20" x2="68" y2="20" stroke="#8D6E63" stroke-width="2.5" stroke-dasharray="5,3"/>'+T(38,58,'小徑',10)+'</g>'
  +'<g transform="translate(182,24)">'+box(0,0,76,44,'#FAFAFA','#E0E0E0')+'<path d="M8,26 Q24,12 40,24 T68,20" fill="none" stroke="#1565C0" stroke-width="3"/>'+T(38,58,'河流',10)+'</g>'
  +'<g transform="translate(266,24)">'+box(0,0,76,44,'#FAFAFA','#E0E0E0')+'<rect x="10" y="10" width="56" height="22" rx="4" fill="#BBDEFB" stroke="#1565C0" stroke-width="1.5"/>'+T(38,58,'水塘',10)+'</g>'
  +'<g transform="translate(14,86)">'+box(0,0,76,44,'#FAFAFA','#E0E0E0')+'<rect x="10" y="10" width="56" height="22" rx="4" fill="#C8E6C9" stroke="#2E7D32" stroke-width="1.5"/>'+T(38,58,'林地',10)+'</g>'
  +'<g transform="translate(98,86)">'+box(0,0,76,44,'#FAFAFA','#E0E0E0')+'<path d="M12,32 Q38,4 64,32" fill="none" stroke="#A1887F" stroke-width="1.5"/><path d="M22,32 Q38,14 54,32" fill="none" stroke="#A1887F" stroke-width="1.5"/>'+T(38,58,'等高線(密=斜)',9)+'</g>'
  +'<g transform="translate(182,86)">'+box(0,0,76,44,'#FAFAFA','#E0E0E0')+'<polygon points="38,10 54,32 22,32" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>'+T(38,58,'營地',10)+'</g>'
  +'<g transform="translate(266,86)">'+box(0,0,76,44,'#FAFAFA','#E0E0E0')+'<rect x="20" y="14" width="36" height="16" fill="#455A64"/>'+T(38,58,'建築物',10)+'</g>'
  +T(170,124,'1:25,000 → 圖 1cm = 實地 250 米',10.5,'#8D6E63')
);

D.skillx.tent = svg(340,140,'搭帳篷示意',
  MK+T(170,14,'搭帳篷・六步（側視示意）',11.5,'#1B5E20','middle',1)
  +'<line x1="14" y1="104" x2="326" y2="104" stroke="#8D6E63" stroke-width="2"/>'
  +'<rect x="86" y="97" width="168" height="6" rx="2" fill="#A1887F"/>'
  +'<path d="M170,36 L88,104 L252,104 z" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>'
  +'<line x1="170" y1="36" x2="88" y2="104" stroke="#5D4037" stroke-width="2.5"/>'
  +'<line x1="170" y1="36" x2="252" y2="104" stroke="#5D4037" stroke-width="2.5"/>'
  +'<line x1="170" y1="36" x2="62" y2="110" stroke="#2E7D32" stroke-width="1.5"/>'
  +'<line x1="170" y1="36" x2="278" y2="110" stroke="#2E7D32" stroke-width="1.5"/>'
  +'<rect x="56" y="108" width="10" height="4" rx="1.5" fill="#333" transform="rotate(-24 61 110)"/>'
  +'<rect x="274" y="108" width="10" height="4" rx="1.5" fill="#333" transform="rotate(24 279 110)"/>'
  +T(28,124,'④起篷',9.5,'#2E7D32','start')+T(246,124,'⑤營繩約45°',9.5,'#2E7D32','end')+T(324,124,'⑥營釘',9.5,'#2E7D32','end')
  +T(170,132,'流程：①平地清石 → ②舖地布 → ③穿柱 → ④起篷 → ⑤拉營繩 → ⑥打營釘',10,'#8D6E63')
);

D.skillx.stove = svg(340,140,'爐具安全示意',
  MK+T(170,14,'爐具・「3 米」安全距離（俯視示意）',11.5,'#1B5E20','middle',1)
  +'<rect x="30" y="42" width="60" height="40" rx="6" fill="#C8E6C9" stroke="#2E7D32" stroke-width="2"/>'+T(60,60,'帳篷',10.5,'#1B5E20')+T(60,74,'帳內煮食✗',9.5,'#C62828')
  +'<circle cx="240" cy="62" r="40" fill="none" stroke="#FF8F00" stroke-width="1.5" stroke-dasharray="4,3"/>'
  +'<rect x="228" y="56" width="24" height="14" rx="3" fill="#455A64"/>'
  +'<path d="M234,56 q4,-10 8,0" fill="#F9A825"/>'
  +T(240,92,'氣爐',10,'#333')
  +arrow(94,62,220,62,'#E65100',2)
  +T(158,52,'≥ 3 米',11,'#E65100')
  +T(170,124,'通風・使用前檢查漏氣・煮食唔離人・熄火先關氣',10,'#8D6E63')
);

D.skillx.knife = svg(340,130,'小刀安全圈示意',
  MK+T(170,14,'小刀・安全圈＝一臂長（俯視示意）',11.5,'#1B5E20','middle',1)
  +'<circle cx="170" cy="66" r="42" fill="#FFF8E1" stroke="#F9A825" stroke-width="2" stroke-dasharray="5,4"/>'
  +ln(170,66,212,66,1,'#F9A825','3,3')
  +dot(170,66,6,'#2E7D32')+T(170,58,'用刀者',9.5,'#2E7D32')
  +dot(96,40,4.5)+dot(246,38,4.5)+dot(90,94,4.5)+dot(252,96,4.5)
  +T(170,122,'其他人都要喺圈外・向外削・傳刀合埋柄向人・跌刀唔好用手接',10,'#8D6E63')
);

D.skillx.rice = svg(340,120,'RICE 扭傷處理示意',
  MK+T(170,14,'扭傷 RICE 四步',11.5,'#1B5E20','middle',1)
  +box(14,30,74,62,'#E3F2FD','#90CAF9')+T(51,56,'R',19,'#1565C0',null,1)
  +T(51,74,'Rest 休息',10,'#333')+T(51,87,'停喺度唔好行',9.5,'#666')
  +box(96,30,74,62,'#E8F5E9','#A5D6A7')+T(133,56,'I',19,'#2E7D32',null,1)
  +T(133,74,'Ice 冰敷',10,'#333')+T(133,87,'15–20分鐘/次',9.5,'#666')
  +box(178,30,74,62,'#FFF3E0','#FFCC80')+T(215,56,'C',19,'#E65100',null,1)
  +T(215,74,'Compression',9.5,'#333')+T(215,87,'包紮・唔好太緊',9.5,'#666')
  +box(260,30,68,62,'#F3E5F5','#CE93D8')+T(294,56,'E',19,'#6A1B9A',null,1)
  +T(294,74,'Elevation',9.5,'#333')+T(294,87,'患肢抬高',9.5,'#666')
  +T(170,110,'燙傷另有五步口訣「沖・脫・泡・蓋・送」——詳見 c17',10,'#8D6E63')
);

D.skillx.sos = svg(340,110,'SOS 哨音信號示意',
  MK+T(170,14,'求救哨音／燈號・SOS 節拍',11.5,'#1B5E20','middle',1)
  +'<rect x="26" y="48" width="14" height="22" rx="3" fill="#333"/><rect x="46" y="48" width="14" height="22" rx="3" fill="#333"/><rect x="66" y="48" width="14" height="22" rx="3" fill="#333"/>'
  +'<rect x="94" y="48" width="42" height="22" rx="3" fill="#F9A825"/><rect x="144" y="48" width="42" height="22" rx="3" fill="#F9A825"/><rect x="194" y="48" width="42" height="22" rx="3" fill="#F9A825"/>'
  +'<rect x="244" y="48" width="14" height="22" rx="3" fill="#333"/><rect x="264" y="48" width="14" height="22" rx="3" fill="#333"/><rect x="284" y="48" width="14" height="22" rx="3" fill="#333"/>'
  +T(53,40,'三短',10,'#333')+T(155,40,'三長',10,'#E65100')+T(269,40,'三短',10,'#333')
  +T(170,90,'重複・停一停再吹；手電筒同理：短＝快速閃，長＝按住閃',10,'#8D6E63')
);

D.skillx.lost = svg(340,120,'迷路自保三步示意',
  MK+T(170,14,'迷路／走失・三步自保（S.T.A.Y.）',11.5,'#1B5E20','middle',1)
  +'<rect x="40" y="46" width="10" height="34" fill="#6D4C41"/>'
  +'<circle cx="45" cy="40" r="14" fill="#81C784"/>'
  +dot(60,66,5,'#C62828')
  +T(45,96,'① 企定',10,'#C62828')
  +arrow(84,66,120,66)
  +'<circle cx="150" cy="60" r="15" fill="#FFF8E1" stroke="#F9A825" stroke-width="2"/>'
  +T(150,65,'哨',12,'#E65100')
  +T(150,96,'② 吹 SOS',10,'#E65100')
  +arrow(182,66,218,66)
  +'<rect x="240" y="42" width="24" height="38" rx="5" fill="#455A64"/>'
  +'<circle cx="252" cy="74" r="2.6" fill="#fff"/>'
  +T(252,96,'③ 等救援',10,'#1565C0')
  +T(170,114,'唔好亂行搵路・留低喺明顯位置・可打 999／182 報警求助',10,'#8D6E63')
);

/* ══════════ 🔥 營火圖（DIAGRAMS.fire） ══════════ */
D.fire = {};

D.fire.circle = svg(340,180,'營火圈座位示意圖',
  MK+T(170,16,'營火圈・座位與安全距離（俯視示意）',11.5,'#1B5E20','middle',1)
  +'<circle cx="170" cy="94" r="38" fill="#FFF3E0" stroke="#FF8F00" stroke-width="2" stroke-dasharray="5,4"/>'
  +'<path d="M162,96 q8,-22 16,0 q8,-10 4,10 q-6,10 -24,0 q-4,-6 4,-10z" fill="#F9A825" stroke="#E65100" stroke-width="1.5"/>'
  +'<rect x="152" y="100" width="36" height="5" rx="2" fill="#6D4C41"/><rect x="156" y="105" width="28" height="5" rx="2" fill="#8D6E63"/>'
  +T(170,70,'火圈範圍',9.5,'#E65100')
  +'<circle cx="170" cy="94" r="68" fill="none" stroke="#C8E6C9" stroke-width="1.5"/>'
  +(function(){var s='';for(var i=0;i<14;i++){var a=(i/14)*Math.PI*2;var x=170+Math.cos(a)*68,y=94+Math.sin(a)*68;
    if(i===10){ s+=sq(x,y,6,'#2E7D32')+T(x,y-11,'領唱',9.5,'#2E7D32'); } else s+=dot(x,y,4.5,'#37474F');}return s;})()
  +dot(296,150,5,'#1565C0')+T(296,166,'水桶/沙',9.5,'#1565C0')
  +dot(44,150,5,'#C62828')+T(44,166,'急救箱',9.5,'#C62828')
  +T(170,130,'觀眾坐外圈・離火至少一臂以上',10,'#8D6E63')
);

D.fire.flow = svg(340,150,'營火歌唱節目六段流程',
  MK+T(170,14,'一場 10–15 分鐘「唱歌環節」流程（示範編排）',11.5,'#1B5E20','middle',1)
  +(function(){
    var steps=['1 開場團呼','2 大合唱','3 輪唱對壘','4 動作歌','5 慢歌收尾','6 晚安呼'];
    var mins=['1分鐘','3分鐘','3分鐘','3分鐘','2分鐘','1分鐘'];
    var s='';
    steps.forEach(function(st,i){
      var col=i%3, rw=Math.floor(i/3);
      var x=22+col*104, y=30+rw*54;
      s+=box(x,y,98,42,rw===0?'#E8F5E9':'#FFF3E0',rw===0?'#81C784':'#FFCC80');
      s+=T(x+49,y+18,st,11,'#333','middle',1);
      s+=T(x+49,y+34,'約'+mins[i],9.5,'#8D6E63');
    });
    s+=arrow(124,51,140,51,'#999',1.5)+arrow(228,51,244,51,'#999',1.5);
    s+=arrow(300,72,300,98,'#999',1.5);
    s+=arrow(228,119,244,119,'#999',1.5)+arrow(124,119,140,119,'#999',1.5);
    return s;
  })()
  +T(170,144,'領唱企圈內：見到晒所有人・大家見到佢張口；細聲歌坐近啲',10,'#8D6E63')
);

D.fire.scarf = svg(300,110,'營火袍示意',
  MK+T(150,14,'營火袍（Campfire Blanket/Robe）示意',11,'#1B5E20','middle',1)
  +'<path d="M118,26 L100,96 Q150,106 200,96 L182,26 Q150,16 118,26 z" fill="#4E342E" stroke="#3E2723" stroke-width="2"/>'
  +'<path d="M118,26 Q150,16 182,26 L182,40 Q150,30 118,40 z" fill="#6D4C41"/>'
  +'<rect x="112" y="52" width="20" height="20" rx="3" fill="#F9A825" stroke="#E65100"/>'
  +'<rect x="140" y="70" width="20" height="20" rx="3" fill="#C8E6C9" stroke="#2E7D32"/>'
  +'<rect x="168" y="50" width="20" height="20" rx="3" fill="#BBDEFB" stroke="#1565C0"/>'
  +T(150,106,'布章至少兩枚縫喺袍上（營火章要求）',10,'#8D6E63')
);
})();
if (typeof module !== 'undefined' && module.exports) module.exports = DIAGRAMS;
