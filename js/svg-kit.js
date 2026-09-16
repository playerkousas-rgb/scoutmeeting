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
  +T(48,112,'A 立正',11,'#333',null,1)+T(48,128,'握拳・拇指壓食指・貼褲骨',9.5,'#8D6E63')
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
  +T(290,128,'左腳先行・每分鐘116步',9.5,'#8D6E63')
  +T(170,158,'口令＝介令＋預令＋動令（「齊步——走！」）；原地停 1.5 秒；步操唔准用嚟罰人',10,'#8D6E63')
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
