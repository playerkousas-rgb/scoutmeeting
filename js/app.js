/* app.js — Scout Hub 核心：路由（支援分頁 sub）、tab 渲染、指邊印邊列印（v19） */
var App = {};

App.init = function(){
  App.renderFlow();
  window.addEventListener('hashchange', App.route);
  window.addEventListener('online', App.netState);
  window.addEventListener('offline', App.netState);
  App.netState();
  App.route();
};

App.netState = function(){
  var bar = document.getElementById('netbar');
  if(!bar) return;
  bar.style.display = navigator.onLine ? 'none' : 'block';
  document.querySelectorAll('a.external-link').forEach(function(a){
    a.style.opacity = navigator.onLine ? '1' : '0.5';
    a.style.pointerEvents = navigator.onLine ? '' : 'none';
  });
};

App.route = function(){
  var raw = location.hash.replace('#','') || 'plan';
  // 舊連結兼容：小隊 tab 已改為營火歌；小隊制度/工具放入手冊
  if(raw==='patrol' || raw.indexOf('patrol/')===0){
    location.replace('#book/patrol');
    return;
  }
  var parts = raw.split('/');
  var tab = parts[0];
  var sub = null;
  try{ sub = parts[1] ? decodeURIComponent(parts[1]) : null; }catch(e){ sub = parts[1]||null; }
  var allowed = ['plan','ceremony','uniform','official','book','print','play','skills','badges','songs','search'];
  if(allowed.indexOf(tab)<0){ tab = 'plan'; sub=null; }
  document.querySelectorAll('#topnav a, #tabbar a').forEach(function(a){
    a.classList.toggle('active', a.getAttribute('data-tab')===tab);
  });
  if(tab==='official'){ location.href = EXTERNAL.officialPack; return; }
  var view = document.getElementById('view');
  view.innerHTML = '';
  var el;
  if(tab==='plan' && sub){
    el = App.renderMeeting(sub);
  } else if(tab==='search'){
    el = App.pages.search(sub);
  } else {
    var fn = App.pages[tab] || App.pages.plan;
    el = fn(sub);
  }
  if(el) view.appendChild(el);
  if(tab==='search'){ try{ App.searchGo(); }catch(e){} }
  window.scrollTo(0,0);
};

App.renderFlow = function(){
  var fb = document.getElementById('flowbar');
  if(!fb) return;
  fb.innerHTML = '<small>🧭 選集會 → 印教材 → 執袋 → 設場 → 帶領</small>';
};

App.h = function(tag, cls, html){
  var el = document.createElement(tag);
  if(cls) el.className = cls;
  if(html!==undefined) el.innerHTML = html;
  return el;
};

App.searchOpen = function(){ location.hash = '#search'; };

/* ── 分頁 chip 導航（tab 內小分頁）── */
App.subnav = function(tab, items, cur){
  var nav = App.h('nav','subnav');
  nav.setAttribute('aria-label','分頁導航');
  items.forEach(function(it){
    var on = (it.k || '') === (cur || items[0].k || '');
    var a = App.h('a','subtab'+(on?' on':''),'<i>'+(it.ic||'📄')+'</i><b>'+it.n+'</b>');
    a.href = it.k ? '#'+tab+'/'+it.k : '#'+tab;
    nav.appendChild(a);
  });
  return nav;
};

/* 純錨點 chip 行（長頁跳位，唔轉頁） */
App.chiprow = function(items){
  var nav = App.h('div','subnav chiprow');
  items.forEach(function(it){
    var a = App.h('a','subtab','<i>'+it.ic+'</i><b>'+it.n+'</b>');
    a.onclick = function(ev){ if(ev&&ev.preventDefault) ev.preventDefault(); App.jump(it.id); };
    nav.appendChild(a);
  });
  return nav;
};
App.jump = function(id){
  var el = document.getElementById(id);
  if(!el) return;
  if(el.scrollIntoView) el.scrollIntoView({behavior:'smooth', block:'start'});
  el.classList.add('flash');
  setTimeout(function(){ el.classList.remove('flash'); }, 1400);
};

/* ── 區塊：每節獨立「指邊印邊」── */
App.sec = function(title, opts){
  opts = opts || {};
  var s = App.h('section','sec');
  if(opts.id) s.id = opts.id;
  s.setAttribute('data-title', title.replace(/<[^>]*>/g,'').replace(/🖨️.*/,'').trim());
  var head = App.h('div','sec-head');
  var h = App.h('h2', null, title);
  head.appendChild(h);
  var body = App.h('div','sec-body');
  if(opts.print !== false){
    var b = App.h('button','print-btn','🖨️ 只印本節');
    b.onclick = function(){ App.printSec(s); };
    head.appendChild(b);
  }
  s.appendChild(head);
  s.appendChild(body);
  s._body = body;
  s.add = function(el){ body.appendChild(el); return s; };
  return s;
};
/* 一行過：標題＋HTML 內容（附本節列印） */
App.block = function(title, innerHTML, opts){
  var s = App.sec(title, opts);
  s._body.innerHTML = innerHTML;
  return s;
};

/* ── 🖨️ 指邊印邊：只複製目標區塊去列印區 ── */
/* 🖼️ 示意圖（v20）：優先 AVIF 插畫；無圖就退回平面圖解；圖 load 唔到（舊瀏覽器／缺檔）自動-show 平面圖解 */
App.ph = function(key, cap, svgHtml){
  var f = (typeof FIGS !== 'undefined' && FIGS) ? FIGS[key] : null;
  if(!f) return svgHtml ? '<figure class="dgm-fig"><div class="dgm-wrap">'+svgHtml+'</div><figcaption>🖼️ '+(cap||'示意圖解')+'</figcaption></figure>' : '';
  var onerr = "var p=this.closest('.ph-fig');if(p){p.classList.add('imgfail');var d=p.querySelector('details');if(d)d.open=true;}";
  var img = '<div class="ph-wrap"><img src="'+f.src+'" width="'+(f.w||1000)+'" height="'+(f.h||750)+'" alt="'+(f.alt||'')+'" loading="lazy" decoding="async" onerror="'+onerr+'"></div>';
  var note = (typeof FIGS_NOTE!=='undefined' && FIGS_NOTE) ? '<span class="ph-note">'+FIGS_NOTE+'</span>' : '';
  return '<figure class="ph-fig" data-fig="'+key+'">'+img+
    (cap?'<figcaption>🖼️ '+cap+note+'</figcaption>':'')+
    '<div class="ph-fail">📷 呢張圖load唔到（舊瀏覽器唔支援 AVIF／檔案未落 cache）；用下面嘅平面圖解代替。</div>'+
    (svgHtml?'<details class="dgm-alt no-print"><summary>📐 平面／位置圖解（睇位用）</summary><div class="dgm-wrap">'+svgHtml+'</div></details>':'')+
    '</figure>';
};
/* 攞儀式卡嘅圖（cer-＋fig key），冇圖先退回 SVG */
App.cerFig = function(c){
  var svgAlt = (c.fig && typeof DIAGRAMS!=='undefined' && DIAGRAMS.cer && DIAGRAMS.cer[c.fig]) ? DIAGRAMS.cer[c.fig] : '';
  return App.ph(c.fig ? 'cer-'+c.fig : '', c.figcap || '位置示意圖解', svgAlt);
};

App.printSec = function(el){
  if(!el || typeof document==='undefined' || !document.body) return;
  var doc = document;
  var box = doc.getElementById('printzone');
  if(!box){ box = doc.createElement('div'); box.id='printzone'; doc.body.appendChild(box); }
  box.innerHTML = '';
  var clone;
  try { clone = el.cloneNode(true); } catch(e){ return; }
  if(clone.querySelectorAll){
    Array.prototype.forEach.call(clone.querySelectorAll('.print-btn,.subnav,.chiprow,.no-print,button,input[type=checkbox]'), function(n){
      if(n.parentNode) n.parentNode.removeChild(n);
    });
  }
  var head = doc.createElement('div');
  head.className = 'pz-head';
  head.innerHTML = '🧭 童軍團集會助手 Scout Hub ｜ 列印範圍：'+(el.getAttribute ? (el.getAttribute('data-title')||'本節') : '本節')+' ｜ 旅團：＿＿＿＿＿＿　小隊：＿＿＿＿　日期：＿＿＿＿年＿＿月＿＿日';
  box.appendChild(head);
  box.appendChild(clone);
  var foot = doc.createElement('div');
  foot.className='pz-foot';
  foot.innerHTML = '<small>由 Scout Hub 產生・內容以《童軍訓練綱要》及總會最新通告為準</small>';
  box.appendChild(foot);
  doc.body.classList.add('print-one');
  var done = function(){
    doc.body.classList.remove('print-one');
    if(window.removeEventListener) window.removeEventListener('afterprint', done);
  };
  if(window.addEventListener) window.addEventListener('afterprint', done);
  setTimeout(done, 20000);
  window.print();
};
App.printPage = function(){ window.print(); };

/* ══════════ 搜尋 ══════════ */
App.searchIndex = null;
App.buildSearchIndex = function(){
  if(App.searchIndex) return App.searchIndex;
  var idx = [];
  DATA.meetings.forEach(function(m){
    var mt = m.tid+' '+m.n+' '+(m.badge||'')+' '+(m.goal||'')+' '+((m.data&&m.data.goal)||'');
    if(m.data && Object.prototype.toString.call(m.data.program)==='[object Array]'){
      mt += ' ' + m.data.program.map(function(p){ return (p&&(p.t||p.n))||''; }).join(' ');
    }
    if(m.data && m.data.worksheet && m.data.worksheet.title){ mt += ' ' + m.data.worksheet.title; }
    idx.push({type:'集會', title:m.tid+' '+m.n, link:'#plan/'+m.tid, desc:m.badge||'', text:mt.toLowerCase()});
  });
  DATA.games.forEach(function(g){
    var gHasPh = (typeof GAME_FIG!=='undefined' && typeof FIGS!=='undefined' && g.n in GAME_FIG && !!FIGS[GAME_FIG[g.n]]);
    idx.push({type:'遊戲', title:g.n, link:'#play', desc:g.cat+' · '+g.minutes+'分鐘'+(gHasPh?'（附實景示意圖＋場地圖）':'（附場地圖）'),
      text:(g.n+' '+g.cat+' '+g.desc+' '+g.mats).toLowerCase()});
  });
  INTERESTS.badges.forEach(function(b){
    idx.push({type:'興趣章', title:b.ic+' '+b.zh+'（'+b.en+'）', link:'#badges', desc:'官方要求',
      text:(b.zh+' '+b.en+' '+b.k+' '+(b.req||[]).join(' ')).toLowerCase()});
  });
  var skills = [
    {t:'繩結（10 個・文字口訣）', k:'繩結 平結 八字結 雙套結 半結 反手結 稱人結 接繩結 繫木結 縮繩結 曳木結 bowline 打結 c13 c14', l:'#skills/rope'},
    {t:'收繩與繩索保養', k:'收繩 保養 繩索 圈繞 陰乾 報廢', l:'#skills/care'},
    {t:'地圖與指南針', k:'地圖 指南針 比例尺 圖例 方位 compass 定向 紅針 北 等高線', l:'#skills/map'},
    {t:'背囊收拾', k:'背囊 執包 行山袋 防水 分層', l:'#skills/pack'},
    {t:'營藝（帳篷・爐具・小刀安全圈）', k:'營藝 紮營 帳篷 氣爐 小刀 斧頭 手鋸 安全圈 3米', l:'#skills/camp'},
    {t:'先鋒工程入門', k:'先鋒工程 紮作 十字紮 剪立紮 平行紮', l:'#skills/pioneer'},
    {t:'追蹤符號', k:'追蹤符號 追蹤 箭嘴 記號 tracking 符號', l:'#skills/track'},
    {t:'郊野守則＋求助信號', k:'郊野守則 Leave No Trace 山火 天氣 撤退 哨子 SOS 迷路 環保 999 三短三長', l:'#skills/field'},
    {t:'急救 7 種＋RICE', k:'急救 流鼻血 抽筋 燙傷 扭傷 割傷 刺傷 復原臥式 RICE 包紮 first aid 沖脫泡蓋送', l:'#skills/aid'}
  ];
  skills.forEach(function(sk){
    idx.push({type:'技能', title:sk.t, link:sk.l, desc:'技能卡（附圖解）', text:(sk.t+' '+sk.k).toLowerCase()});
  });
  CEREMONY.cards.forEach(function(c){
    idx.push({type:'儀式', title:c.icon+' '+c.n, link:'#ceremony/'+c.k, desc:(c.fig?((typeof FIGS!=='undefined'&&FIGS['cer-'+c.fig])?'附示意插畫＋位置圖解':'附位置圖解'):'文字程序'),
      text:('儀式 '+c.n+' 升旗 宣誓 步操 敬禮 隊列 點名 降旗 團呼 開始 結束 '+ (c.steps||[]).map(function(s){return s.h+' '+s.d;}).join(' ')).toLowerCase()});
  });
  idx.push({type:'制服', title:'制服佩戴（陸／海／空小分頁）＋自查清單', link:'#uniform', desc:'', text:'制服 領巾 徽章 佩戴 恤衫 褲 帽 皮帶 襪 鞋 儀容 海童軍 空童軍 陸童軍'});
  idx.push({type:'手冊', title:'誓詞規律銘言＋小隊制度＋報班', link:'#book', desc:'', text:'誓詞 規律 銘言 準備 報章 報班 訓練班 考章'});
  idx.push({type:'手冊', title:'小隊制度＋小隊長職責＋會議記錄表', link:'#book/patrol', desc:'已併入手冊', text:'小隊 小隊長 制度 會議記錄 團隊長 副小隊長'});
  idx.push({type:'手冊', title:'集會工具（計分板・抽籤・倒數・分組）', link:'#book/tools', desc:'已併入手冊', text:'計分板 抽籤 倒數 分組 工具'});
  idx.push({type:'素材', title:'工作紙（24 場直接印）＋急救卡', link:'#print', desc:'', text:'工作紙 列印 素材 急救卡 家長通知'});
  idx.push({type:'營火歌', title:'🇨🇳 國歌《義勇軍進行曲》＋升旗禮儀', link:'#print', desc:'素材庫', text:'國歌 義勇軍進行曲 升旗 禮儀 唱國歌'});
  (typeof SONGS!=='undefined' ? SONGS.sheets : []).forEach(function(s){
    idx.push({type:'營火歌', title:'🔥 '+s.zh+'（'+s.en+'）', link:'#songs/'+s.k, desc:s.cat,
      text:(s.zh+' '+s.en+' 營火歌 唱歌 歌紙 歌詞 和弦 '+s.cat).toLowerCase()});
  });
  if(typeof SONGS!=='undefined'){
    idx.push({type:'營火歌', title:'營火章必識十首歌（熊熊烈火等）', link:'#songs', desc:'歌單', text:'營火 熊熊烈火 campfire burning kookaburra 友誼之光 童軍歌 必識 領唱 團呼 歡呼'});
  }
  App.searchIndex = idx;
  return idx;
};
App.searchGo = function(){
  var input = document.getElementById('q-input');
  var out = document.getElementById('q-out');
  if(!input||!out) return;
  var q = (input.value||'').trim().toLowerCase();
  if(!q){ out.innerHTML = '<p class="mut">輸入關鍵字即時搵，全站 24 場集會＋遊戲＋興趣章＋技能＋儀式＋營火歌都搵到。</p>'; return; }
  var keys = q.split(/\s+/);
  var res = App.buildSearchIndex().filter(function(e){
    return keys.every(function(k){ return e.text.indexOf(k)>=0; });
  }).slice(0,30);
  if(!res.length){ out.innerHTML = '<p>😅 冇結果，試吓：儀式 / 急救 / 露營 / 地圖 / 歌 / 小隊。</p>'; return; }
  out.innerHTML = '<p>🔍 搵到 '+res.length+' 項：</p><ul class="bullet">'+res.map(function(e){
    return '<li><span class="tag">'+e.type+'</span> <a href="'+e.link+'">'+e.title+'</a>'+(e.desc?' <small>（'+e.desc+'）</small>':'')+'</li>';
  }).join('')+'</ul>';
};

/* ══════════ 教案詳情（上方 🅰️：冇 IDEA 跟住做） ══════════ */
App.renderMeeting = function(tid){
  var m = DATA.meetings.find(function(x){return x.tid===tid;});
  if(!m) return App.pages.plan();
  var wrap = App.h('div','page meeting-page');
  var back = App.h('a','back-link','← 返回集會目錄');
  back.href = '#plan';
  wrap.appendChild(back);
  wrap.appendChild(App.h('h1',null,'📅 '+m.tid+' '+m.n));
  var meta = App.h('div','meeting-meta');
  meta.innerHTML = '<span class="tag ok">'+m.month+'</span>'+
    '<span class="tag cat">'+m.form+'</span>'+
    '<span class="tag">'+(m.duration||90)+'分鐘</span>'+
    '<span class="tag">'+m.badge+'</span>'+
    '<button class="print-all-btn" onclick="App.printPage()">🖨️ 整場教案全部列印</button>'+
    (m.full ? '<span class="tag ok">✓ 完整教案</span>' : '<span class="tag wip">內容陸續補上</span>');
  wrap.appendChild(meta);
  wrap.appendChild(App.h('p','lede','📍 場地：'+m.venue+'<br>🎯 目標：'+m.goal+(m.evidence?'<br>👀 觀察：'+m.evidence:'')+(m.gap?'<br>⚠️ 注意：'+m.gap:'')));
  wrap.appendChild(App.h('p','print-hint','💡 想印邊節就撳該節右邊「🖨️ 只印本節」，淨係印嗰節；要成場印晒先撳上面「整場教案全部列印」。'));

  if(m.data){
    var d = m.data;

    if(m.sensitive){
      var warn = App.h('div','card safety-warn');
      warn.innerHTML = '⚠️ <b>本集會包含敏感議題（保護自己／防止兒童侵害）。</b><br>'+
        '・必須最少 2 位領袖在場（兩人規則）<br>'+
        '・<b>唔要求成員分享個人經歷</b>，所有情境均為虛構<br>'+
        '・如隊員情緒有反應，即由另一位領袖陪同離場安撫，事後按《青少年保護政策》跟進<br>'+
        '・家長通知務必派發，俾家長知悉今日課題';
      wrap.appendChild(warn);
    }
    if(m.outdoor){
      var outdoorWarn = App.h('div','card safety-warn outdoor-warn');
      outdoorWarn.innerHTML = '🥾 <b>室外郊野活動特別提醒</b><br>'+
        '・所有參加者<b>必須交回家長簽署同意書</b><br>'+
        '・必須檢查鞋、水、帽、雨具、個人藥物<br>'+
        '・最少 1:6 領袖比例，含 1 位持有效急救證書<br>'+
        '・預先實地視察路線、預備撤退路線<br>'+
        '・三號風球/紅雨/黑雨/雷暴/酷熱警告自動延期';
      wrap.appendChild(outdoorWarn);
    }

    // 快速跳去節位 chips
    var anchors = [];
    if(d.leaderPrep) anchors.push({id:tid+'-prep',ic:'📌',n:'領袖預備'});
    if(d.script) anchors.push({id:tid+'-script',ic:'🎤',n:'開場白'});
    anchors.push({id:tid+'-program',ic:'📋',n:'9段程序'});
    anchors.push({id:tid+'-bag',ic:'🎒',n:'執袋'});
    if(m.personalKit) anchors.push({id:tid+'-kit',ic:'👕',n:'個人裝備'});
    anchors.push({id:tid+'-notice',ic:'📝',n:'家長通知'});
    if(d.worksheet) anchors.push({id:tid+'-ws',ic:'✂️',n:'工作紙'});
    if(d.pledgeCard) anchors.push({id:tid+'-pledge',ic:'💌',n:'承諾卡'});
    if(d.roles) anchors.push({id:tid+'-roles',ic:'👥',n:'崗位'});
    if(d.items) anchors.push({id:tid+'-items',ic:'🎖️',n:'物品'});
    if(d.observation) anchors.push({id:tid+'-obs',ic:'👀',n:'觀察'});
    if(d.postCeremony) anchors.push({id:tid+'-post',ic:'📬',n:'禮成跟進'});
    anchors.push({id:tid+'-back',ic:'🆘',n:'後備'});
    if(d.scenarios) anchors.push({id:tid+'-sc',ic:'🃏',n:'情境卡'});
    if(d.trivia) anchors.push({id:tid+'-tr',ic:'💡',n:'小知識'});
    anchors.push({id:tid+'-safety',ic:'⚠️',n:'安全'});
    wrap.appendChild(App.chiprow(anchors));

    // 領袖預備
    if(d.leaderPrep){
      var lp = App.h('ul','bullet');
      lp.innerHTML = d.leaderPrep.map(function(x){
        if(typeof x === 'string') return '<li>'+x+'</li>';
        return '<li><b>'+x.when+'：</b>'+x.what+'</li>';
      }).join('');
      var sPrep = App.sec('📌 領袖預備備忘',{id:tid+'-prep'});
      sPrep.add(lp);
      wrap.appendChild(sPrep);
    }

    // 領袖開場白
    if(d.script){
      var sc = App.h('div','card script-card');
      var scHtml = '';
      Object.keys(d.script).forEach(function(k){
        scHtml += '<p><b>'+({open:'開場',intro:'介紹今日流程',beforeGame:'遊戲前',beforeDrill:'隊列前',close:'結束'}[k]||k)+'：</b>'+d.script[k]+'</p>';
      });
      sc.innerHTML = scHtml;
      var sSc = App.sec('🎤 領袖開場白',{id:tid+'-script'});
      sSc.add(sc);
      wrap.appendChild(sSc);
    }

    // 9 段程序表
    var tbl = App.h('table','meeting-table program-table');
    tbl.innerHTML = '<thead><tr><th width="40">序</th><th width="50">分鐘</th><th width="80">項目</th><th>內容／帶領要點</th></tr></thead><tbody>';
    d.program.forEach(function(p,idx){
      var detail = '';
      var isNew = (typeof p.n === 'string');
      var mins = isNew ? p.t : p.min;
      var title = isNew ? p.n : p.label;
      var type = isNew ? '' : (p.type||'');
      var steps = p.steps || p.sub || [];
      if(steps.length) detail += '<ul class="bullet">'+steps.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ul>';
      if(p.leader){
        if(typeof p.leader === 'string'){
          detail += '<p><b>領袖：</b>'+p.leader+'</p>';
        } else {
          var ldr = [];
          if(p.leader.leader) ldr.push('<b>領袖：</b>'+p.leader.leader);
          if(p.leader.patrol) ldr.push('<b>小隊長：</b>'+p.leader.patrol);
          if(ldr.length) detail += '<p>'+ldr.join(' ｜ ')+'</p>';
        }
      }
      if(p.leaderScript){
        detail += '<div class="callout" style="background:#FFF8E1;border-left:4px solid #F9A825;margin:6px 0;"><b>🎤 講稿：</b>'+p.leaderScript+'</div>';
      }
      if(p.activities){
        detail += '<p><b>活動：</b>'+p.activities.map(function(a){return DATA.games.find(function(g){return g.n===a.name;})?('<a href="#play">'+a.name+'</a>（'+a.min+'分鐘）'):a.name+'（'+a.min+'分鐘）';}).join(' → ')+'</p>';
      }
      if(p.talking) detail += '<p><b>小隊長傾乜：</b></p><ul class="bullet">'+p.talking.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ul>';
      if(p.blocks) detail += p.blocks.map(function(b){return '<p><b>'+b.h+'</b>：'+b.d+(b.cite?' <small style="color:#888">'+b.cite+'</small>':'')+'</p>';}).join('');
      if(p.tip) detail += '<p class="tip">💡 '+p.tip+'</p>';
      if(p.key) detail += '<p><b>重點：</b>'+p.key+'</p>';
      if(p.safety) detail += '<p class="safety"><b>⚠️ 安全：</b>'+p.safety+'</p>';
      // 儀式段落加圖解連結（解決「淨睇文字唔明」）
      if(/儀式|升旗|隊列|宣誓|步操|敬禮|團呼/.test(title||'')){
        var ck = /團呼/.test(title)?'howl':(/升旗/.test(title)?'flag':(/宣誓/.test(title)?'oath':(/隊列|步操|立正|稍息/.test(title)?'footdrill':(/結束/.test(title)?'close':'open'))));
        detail += '<p class="figlink">🎪 呢段有儀式：睇 <a href="#ceremony/'+ck+'">儀式卡圖解版</a>（隊列/升旗/宣誓都有位置圖）</p>';
      }
      var mats = '';
      if(p.mats && p.mats.length) mats = '<br><small>🎒 '+p.mats.join('、')+'</small>';
      else if(p.materials) mats = '<br><small>🎒 '+p.materials+'</small>';
      tbl.innerHTML += '<tr><td>'+(idx+1)+'</td><td>'+(mins||'')+'</td><td>'+type+(type?'<br>':'')+'<small>'+title+'</small></td><td>'+detail+mats+'</td></tr>';
    });
    tbl.innerHTML += '</tbody>';
    var sProg = App.sec('📋 '+(m.duration||90)+' 分鐘 9 段程序表',{id:tid+'-program'});
    sProg.add(tbl);
    wrap.appendChild(sProg);

    // 物資清單（領袖執袋）
    var bt = App.h('table','meeting-table');
    bt.innerHTML = '<thead><tr><th>物品</th><th>數量</th><th>性質</th><th>備註</th></tr></thead><tbody>'+
      d.bag.map(function(x){return '<tr><td>'+x.n+'</td><td>'+(typeof x.qty==='number'?x.qty:x.qty)+'</td><td>'+x.type+'</td><td>'+(x.note||'')+'</td></tr>';}).join('')+
      '</tbody>';
    var sBag = App.sec('🎒 執袋清單（領袖/共用物資）',{id:tid+'-bag'});
    sBag.add(bt);
    wrap.appendChild(sBag);

    // 個人裝備（室外特別集會）
    if(m.personalKit){
      var pk = App.h('div','card');
      pk.innerHTML = '<h3>✅ 一定要帶</h3><ul class="bullet">'+m.personalKit.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
      if(m.doNotBring){
        pk.innerHTML += '<h3>🚫 唔好帶</h3><ul class="bullet">'+m.doNotBring.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
      }
      var sPk = App.sec('👕 個人裝備清單（通知家長/成員）',{id:tid+'-kit'});
      sPk.add(pk);
      wrap.appendChild(sPk);
    }

    // 家長通知
    var nc = App.h('div','card notice-card');
    if(typeof d.notice === 'string'){
      nc.innerHTML = '<pre style="white-space:pre-wrap;font-family:inherit;margin:0;">'+d.notice+'</pre>';
    } else {
      nc.innerHTML = '<h3>'+(d.notice.title||'家長通知')+'</h3><ul class="bullet">'+(d.notice.items||[]).map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
    }
    var sNotice = App.sec('📝 家長通知（列印派發）',{id:tid+'-notice'});
    sNotice.add(nc);
    wrap.appendChild(sNotice);

    // 工作紙
    if(d.worksheet){
      var wsAudience = (d.worksheet.audience==='leader')?'領袖檢查清單':'工作紙（成員用，A4）';
      var sWs = App.sec('✂️ '+wsAudience,{id:tid+'-ws'});
      sWs._body.innerHTML = App.worksheetHtml(d.worksheet);
      wrap.appendChild(sWs);
    }

    // 承諾卡
    if(d.pledgeCard){
      var pc = App.h('div','card pledge-card');
      pc.innerHTML = '<h3>'+d.pledgeCard.title+'</h3>'+
        '<div class="pledge-body"><ul class="bullet">'+d.pledgeCard.fields.map(function(f){return '<li>'+f+'</li>';}).join('')+'</ul></div>';
      var sPc = App.sec('💌 承諾卡（每位宣誓成員 1 張，自己保存）',{id:tid+'-pledge'});
      sPc.add(pc);
      wrap.appendChild(sPc);
    }

    // 崗位分工
    if(d.roles){
      var rl = App.h('table','meeting-table');
      rl.innerHTML = '<thead><tr><th>崗位</th><th>人數</th><th>人選</th><th>職責</th></tr></thead><tbody>'+
        d.roles.map(function(r){
          var qty = (r.qty!==undefined)?r.qty:'';
          var duty = r.duties || r.duty || '';
          var person = r.person || '__________';
          return '<tr><td>'+r.role+'</td><td>'+qty+'</td><td>'+person+'</td><td>'+duty+'</td></tr>';
        }).join('')+
        '</tbody>';
      var sRoles = App.sec('👥 當日崗位分工',{id:tid+'-roles'});
      sRoles.add(rl);
      wrap.appendChild(sRoles);
    }

    // 頒發物品清單
    if(d.items){
      var it = App.h('ul','bullet');
      it.innerHTML = d.items.map(function(x){
        var who = x.to ? '（俾 '+x.to+'，'+x.qty+'）' : '';
        var desc = x.d || '';
        return '<li><b>'+x.n+'</b>'+who+(desc?' — '+desc:'')+'</li>';
      }).join('');
      var sIt = App.sec('🎖️ 當日頒發/派發物品',{id:tid+'-items'});
      sIt.add(it);
      wrap.appendChild(sIt);
    }

    // 觀察記錄
    if(d.observation){
      var isObsObj = !Array.isArray(d.observation);
      var obTitle = (isObsObj && d.observation.audience==='leader')?'✅ 領袖事後檢查清單':'👀 領袖觀察記錄（領袖用）';
      var ob = App.h('div','card');
      var obsItems = isObsObj ? d.observation.items : d.observation;
      var obsTitle = isObsObj ? '<h3>'+d.observation.title+'</h3>' : '';
      ob.innerHTML = obsTitle +
        '<ul class="bullet">'+obsItems.map(function(x){return '<li><label><input type="checkbox"> '+x+'</label></li>';}).join('')+'</ul>';
      var sOb = App.sec(obTitle,{id:tid+'-obs'});
      sOb.add(ob);
      wrap.appendChild(sOb);
    }

    // 禮成後跟進
    if(d.postCeremony){
      var pst = App.h('div','card');
      pst.innerHTML = '<ul class="bullet">'+d.postCeremony.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
      var sPost = App.sec('📬 禮成後跟進',{id:tid+'-post'});
      sPost.add(pst);
      wrap.appendChild(sPost);
    }

    // 實戰後備
    var pb = App.h('div','card');
    if(Array.isArray(d.practical)){
      pb.innerHTML = d.practical.map(function(x){return '<p><b>'+x.situation+'：</b>'+x.action+'</p>';}).join('');
    } else {
      var pkeys = {fewPeople:'少人（6-8 人）',lackMat:'缺物資',notEngaged:'不投入',thirtyMinEnd:'要提早 30 分鐘收尾',emotionalSupport:'如有隊員情緒反應',weatherBad:'天氣不好/落雨',techFail:'音響/投影失靈',late:'嘉賓/家長遲到',absentee:'有隊員缺席'};
      var phtml = '';
      Object.keys(pkeys).forEach(function(k){
        if(d.practical[k]) phtml += '<p><b>'+pkeys[k]+'：</b>'+d.practical[k]+'</p>';
      });
      phtml += '<p><b>成員可能問：</b></p><ul class="bullet">'+(d.practical.qa||[]).map(function(q){return '<li><b>Q：'+q.q+'</b><br>A：'+q.a+'</li>';}).join('')+'</ul>';
      pb.innerHTML = phtml;
    }
    var sPb = App.sec('🆘 實戰後備',{id:tid+'-back'});
    sPb.add(pb);
    wrap.appendChild(sPb);

    // 情境卡
    if(d.scenarios){
      var scd = App.h('div','card');
      scd.innerHTML = '<ol class="steps">'+d.scenarios.map(function(s){return '<li><b>情境：</b>'+s.s+'<br><b>處理：</b>'+s.a+'</li>';}).join('')+'</ol>';
      var sSc = App.sec('🃏 情境卡（領袖口頭講，每隊討論）',{id:tid+'-sc'});
      sSc.add(scd);
      wrap.appendChild(sSc);
    }

    // 小知識
    if(d.trivia){
      var tv = App.h('div','card');
      tv.innerHTML = d.trivia.map(function(t){
        var head = t.h || t.q || '';
        var body = t.d || t.a || '';
        return '<p><b>'+head+'：</b>'+body+'</p>';
      }).join('');
      var sTv = App.sec('💡 補充小知識',{id:tid+'-tr'});
      sTv.add(tv);
      wrap.appendChild(sTv);
    }

    // 安全
    var sf = App.h('ul','bullet');
    sf.innerHTML = (d.safety||[]).map(function(s){ return '<li>'+s+'</li>'; }).join('');
    var sSf = App.sec('⚠️ 安全注意',{id:tid+'-safety'});
    sSf.add(sf);
    wrap.appendChild(sSf);

    return wrap;
  }

  wrap.appendChild(App.h('h2',null,'🚧 本場完整教案籌備中'));
  wrap.appendChild(App.h('p',null,'本場（'+m.n+'）完整三步帶法、工作紙、出隊包將會喺後續版本補上。現階段可參考頂欄 📦 官方套包 PDF 相關程序。'));
  return wrap;
};

/* 工作紙 HTML（上方教案＋下方素材庫共用同一份內容） */
App.worksheetHtml = function(w){
  var html = '<div class="card worksheet"><h3>'+w.title+'</h3>';
  if(w.fields){
    html += '<ul class="bullet">'+w.fields.map(function(f,i){
      var lab = f.label || f.name || ('第 '+(i+1)+' 項');
      var ty = f.type || 'text';
      var h = ty==='textarea' ? '<textarea rows="3" style="width:100%;margin-top:4px;"></textarea>' : '<input type="text" style="width:60%;margin-top:4px;">';
      return '<li><b>'+lab+'</b> '+h+'</li>';
    }).join('')+'</ul>';
    if(w.footer) html += '<p class="tip">'+w.footer+'</p>';
  } else if(w.prompts){
    html += '<ol class="steps">'+w.prompts.map(function(p){return '<li>'+p+'</li>';}).join('')+'</ol>';
  }
  html += '<div class="ws-sign">姓名：＿＿＿＿＿＿　旅團：＿＿＿＿＿＿　日期：＿＿＿＿　小隊長核對：□</div></div>';
  return html;
};

/* ══════════ 各分頁 render ══════════ */
App.pages = {};

App.pages.search = function(sub){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🔍 全站搜尋'));
  wrap.appendChild(App.h('p','lede','一次過搵集會、遊戲、興趣章、技能、儀式、營火歌、制服、手冊。'));
  var q0 = '';
  try{ q0 = sub?decodeURIComponent(sub):''; }catch(e){ q0 = sub||''; }
  var box = App.h('div','card');
  box.innerHTML = '<p><input id="q-input" style="width:70%;font-size:1.1em;padding:6px;" placeholder="例：儀式 / 急救 / 背囊 / 營火歌…" value="'+q0.replace(/"/g,'&quot;')+'" oninput="App.searchGo()"> '+
    '<button onclick="App.searchGo()">搵！</button></p>'+
    '<p>熱門：<a href="#search/儀式">儀式</a> · <a href="#search/急救">急救</a> · <a href="#search/背囊">背囊</a> · <a href="#search/地圖">地圖</a> · <a href="#search/營火歌">營火歌</a> · <a href="#search/小隊">小隊</a></p>'+
    '<div id="q-out"><p class="mut">輸入關鍵字即時搵，全站 24 場集會＋遊戲＋興趣章＋技能＋儀式＋歌都搵到。</p></div>';
  wrap.appendChild(box);
  return wrap;
};

/* 📅 集會目錄（整行可撳） */
App.pages.plan = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'📅 集會目錄'));
  wrap.appendChild(App.h('p','lede','跟住呢個目錄揀今日集會。<b>撳一行任何位置</b>（唔使淨係撳題目）就入到逐步帶領流程、物資清單、工作紙、家長通知。'));
  var table = App.h('table','meeting-table plan-table');
  table.innerHTML = '<thead><tr><th>場次</th><th>月份</th><th>主題</th><th>對應獎章</th><th>形式</th><th>狀態</th><th></th></tr></thead><tbody>' +
    DATA.meetings.map(function(m){
      var tag = m.placeholder ? '<span class="tag wip">🚧 規劃中</span>' : (m.full ? '<span class="tag ok">✓ 完整</span>' : '<span class="tag wip">🚧</span>');
      var spec = m.special ? '<span class="tag sp">特別</span>' : '';
      return '<tr class="meet-row" data-href="#plan/'+m.tid+'" tabindex="0"><td>'+m.tid+'</td><td>'+m.month+'</td><td>'+m.n+'</td><td>'+m.badge+'</td><td>'+m.form+spec+'</td><td>'+tag+'</td><td class="row-go">▶</td></tr>';
    }).join('') + '</tbody>';
  if(table.querySelectorAll){
    Array.prototype.forEach.call(table.querySelectorAll('tr.meet-row'), function(tr){
      tr.onclick = function(){ location.hash = tr.getAttribute('data-href'); };
      tr.onkeydown = function(e){ if(e && e.key==='Enter') location.hash = tr.getAttribute('data-href'); };
    });
  }
  wrap.appendChild(table);
  wrap.appendChild(App.h('h2',null,'🌟 特別集會／活動'));
  var ul = App.h('ul','bullet');
  ul.innerHTML = DATA.specialEvents.map(function(e){
    return '<li><b>'+e.n+'</b>（'+e.month+'）— '+e.note+'</li>';
  }).join('');
  wrap.appendChild(ul);
  return wrap;
};

/* 🎪 集會儀式（小分頁＋圖解） */
App.pages.ceremony = function(sub){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🎪 集會儀式'));
  var subs = [{k:'all',ic:'📚',n:'总覽'}].concat(CEREMONY.cards.map(function(c){return {k:c.k,ic:c.icon,n:c.n.replace(/（.*?）/g,'')};}));
  wrap.appendChild(App.subnav('ceremony',subs, (sub && sub!=='all')?sub:'all'));

  if(sub && sub!=='all'){
    var c0 = CEREMONY.cards.find(function(c){return c.k===sub;});
    if(c0){
      var idx = CEREMONY.cards.indexOf(c0);
      var bar = App.h('div','cer-nav');
      var prev = CEREMONY.cards[idx-1], next = CEREMONY.cards[idx+1];
      bar.innerHTML = '<a class="back-link" href="#ceremony">← 儀式总覽</a>'+
        (prev?'<a class="cer-prev" href="#ceremony/'+prev.k+'">← '+prev.icon+' '+prev.n.replace(/（.*?）/g,'')+'</a>':'')+
        (next?'<a class="cer-next" href="#ceremony/'+next.k+'">'+next.icon+' '+next.n.replace(/（.*?）/g,'')+' →</a>':'');
      wrap.appendChild(bar);
      wrap.appendChild(App.ceremonySec(c0, true));
      return wrap;
    }
  }

  wrap.appendChild(App.h('p','lede','每套儀式一张卡：場位圖解＋逐步程序。新領袖第一次帶儀式，請先撳入下面分頁睇圖，再對住圖示範；實際手勢步操必須由熟悉程序之領袖現場示範。'));
  var ref = App.h('div','callout');
  ref.innerHTML = '📚 <b>參考文件：</b><ul class="bullet" style="margin:6px 0 0 18px;">' +
    CEREMONY.refs.map(function(r){return '<li><a href="'+r.url+'" target="_blank" rel="noopener">'+r.n+'</a></li>';}).join('') +
    '</ul>';
  wrap.appendChild(ref);
  CEREMONY.cards.forEach(function(c){
    wrap.appendChild(App.ceremonySec(c, false));
  });
  return wrap;
};

/* 一張儀式卡（含圖解）；full=true 完整顯示連列印，否則摘要＋連結 */
App.ceremonySec = function(c, full){
  var s = App.sec(c.icon+' '+c.n+(c.duration?' <span class="tag">'+c.duration+'</span>':''), {id:'cer-'+c.k, print: full?true:false});
  var body = '';
  body += c.when ? '<p><b>時機：</b>'+c.when+'</p>' : '';
  if(c.rel && c.rel.length){
    body += '<p><b>邊場會用：</b>'+c.rel.map(function(t){return '<a href="#plan/'+t+'">'+t+'</a>';}).join('、')+'</p>';
  }
  if(c.prep) body += '<p><b>預備物資：</b>'+c.prep+'</p>';
  if(c.intro) body += '<p><b>動作要點：</b>'+c.intro+'</p>';
  if(c.fig){
    body += App.cerFig(c);
  } else if(!full){
    body += '<div class="callout">⚠️ 呢套程序仍待官方核對，暫時只有文字＋參考文件連結；帶之前請先問熟悉程序之領袖。</div>';
  }
  if(c.steps) body += '<ol class="steps">'+c.steps.map(function(st){return '<li><b>'+st.h+'</b>：'+st.d+'</li>';}).join('')+'</ol>';
  if(c.types) body += '<ul class="bullet">'+c.types.map(function(t){return '<li><b>'+t.t+'：</b>'+t.d+'</li>';}).join('')+'</ul>';
  if(c.when_to_salute) body += '<p><b>使用場合：</b></p><ul class="bullet">'+c.when_to_salute.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
  if(c.safety) body += '<p class="safety"><b>⚠️ 注意：</b>'+c.safety+'</p>';
  if(c.note) body += '<div class="callout warn">'+c.note+'</div>';
  var link = full ? '' : '<p class="cer-open"><a href="#ceremony/'+c.k+'">睇完整程序＋圖解 →</a></p>';
  s._body.innerHTML = body + link;
  return s;
};

/* 👕 制服（陸／海／空小分頁） */
App.pages.uniform = function(sub){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'👕 制服'));
  var subs = UNIFORM.branches.map(function(b){return {k:b.k,ic:b.ic,n:b.n};})
    .concat([{k:'badge',ic:'🎖️',n:'徽章佩戴'},{k:'check',ic:'✅',n:'自查清單'}]);
  var cur = 'land';
  subs.forEach(function(x){ if(x.k===sub) cur = sub; });
  wrap.appendChild(App.subnav('uniform',subs,cur));
  wrap.appendChild(App.h('p','lede','童軍支部（陸）、海童軍、空童軍男／女團員制服標準，按自己團屬撳分頁。圖片為 <b>香港童軍總會官網</b>官方圖片，內容以《儀容與制服手冊》為準。'));

  var byKey = {};
  UNIFORM.types.forEach(function(t){ byKey[t.k]=t; });
  function typeCard(t){
    var rows = t.items.map(function(i){return '<tr><th>'+i[0]+'</th><td>'+i[1]+'</td></tr>';}).join('');
    return '<div class="card uniform-card"><h3>'+t.name+'</h3>'+
      '<div class="uniform-split">'+
        '<a href="'+t.img+'" target="_blank" rel="noopener"><img src="'+t.img+'" alt="'+t.name+' 官方圖" loading="lazy" class="uniform-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';"></a>'+
        '<div class="uniform-img-fallback" style="display:none">⚠️ （圖片需上網載入；網址：'+t.img+'）</div>'+
        '<table class="uniform-table"><tbody>'+rows+'</tbody></table>'+
      '</div></div>';
  }

  if(cur==='badge'){
    wrap.appendChild(App.block('🎖️ 徽章佩戴位置（按 2023 年第 13 號通告）',
      '<table class="meeting-table"><thead><tr><th>位置</th><th>徽章</th></tr></thead><tbody>' +
      UNIFORM.badgePositions.map(function(p){ return '<tr><td>'+p.pos+'</td><td>'+p.items.join('、')+'</td></tr>'; }).join('') +
      '</tbody></table><div class="callout">📚 <a href="'+UNIFORM.source.badgeGuide+'" target="_blank" rel="noopener">支部成員徽章佩戴指引（2023年第13號通告）原文 PDF</a></div>'));
    return wrap;
  }
  if(cur==='check'){
    var cl = '<ul class="bullet">'+UNIFORM.checklist.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'+
      '<p><i>'+UNIFORM.winter.note+'</i></p>'+
      '<p class="source-note">🖼️ '+UNIFORM.source.note+'</p>'+
      '<div class="callout">📚 <a href="'+UNIFORM.source.url+'" target="_blank" rel="noopener">儀容與制服手冊（官方網站）</a></div>';
    wrap.appendChild(App.block('✅ 制服自查清單（每次集會前）', cl));
    return wrap;
  }
  var br = UNIFORM.branches.find(function(b){return b.k===cur;}) || UNIFORM.branches[0];
  wrap.appendChild(App.h('div','callout','<b>'+br.ic+' '+br.n+'制服要點：</b>'+br.note));
  br.types.forEach(function(tk){ wrap.appendChild(App.h('div','', typeCard(byKey[tk]))); });
  wrap.appendChild(App.h('div','callout','🧣 三組共通：旅巾＋巾圈、徽章佩戴位置、自查清單——撳上面分頁 👆'));
  return wrap;
};

/* 📖 手冊（小分頁：誓詞／小隊制度／工具／報章／報班／參考） */
App.pages.book = function(sub){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'📖 手冊'));
  var subs = [
    {k:'promise',ic:'⚜️',n:'誓詞規律銘言'},
    {k:'patrol',ic:'🧑‍🤝‍🧑',n:'小隊制度'},
    {k:'tools',ic:'🧰',n:'集會工具'},
    {k:'apply',ic:'🎖️',n:'報考專科徽章'},
    {k:'course',ic:'📚',n:'報考訓練班'},
    {k:'refs',ic:'🔗',n:'參考資料'}
  ];
  var cur = subs.some(function(s){return s.k===sub;}) ? sub : 'promise';
  wrap.appendChild(App.subnav('book',subs,cur));

  if(cur==='promise'){
    var ol = App.h('ol','promise');
    ol.innerHTML = DATA.facts.promise.map(function(l){ return '<li>'+l+'</li>'; }).join('');
    wrap.appendChild(App.sec('⚜️ 童軍誓詞').add(ol));
    var ul1 = App.h('ul','bullet');
    ul1.innerHTML = DATA.facts.law.map(function(l){ return '<li>'+l+'</li>'; }).join('');
    wrap.appendChild(App.sec('📜 童軍規律（7 條）').add(ul1));
    var ul2 = App.h('ul','motto');
    ul2.innerHTML = DATA.facts.motto7.map(function(l){ return '<li>'+l+'</li>'; }).join('');
    wrap.appendChild(App.sec('🎯 童軍銘言').add(ul2));
    wrap.appendChild(App.block('🏕️ 支部基本資料',
      '<p>年齡：'+DATA.facts.age+'</p><p>教育目標：'+DATA.facts.goal+'</p><p>敬禮：'+DATA.facts.salute+'</p>'));
    return wrap;
  }

  if(cur==='patrol'){
    wrap.appendChild(App.h('p','tip','📦 由「小隊」tab 併入手冊：小隊制度、小隊長職責、會議記錄表——呢度係領袖預備時睇嘅制度資料；現場即開即用工具撳上面「集會工具」分頁。'));
    wrap.appendChild(App.block('📋 小隊制度說明',
      '<p>'+DATA.facts.patrol+'</p>'+
      '<ul class="bullet"><li><b>小隊長</b>：管一隊，帶人帶會帶頭（c19）。</li>'+
      '<li><b>副小隊長</b>：小隊長唔喺度就頂上；平時管記錄/物資/新隊員。</li>'+
      '<li><b>團隊長</b>：最資深小隊長，幫團長管晒所有小隊長。</li>'+
      '<li><b>小隊長會議</b>：安排團活動、內部管理及經費——c19 教開會程序。</li></ul>'));
    wrap.appendChild(App.block('⭐ 小隊長 3 大職責',
      '<ol class="steps"><li><b>帶人</b>——分工、鼓勵、頂硬上。</li><li><b>帶會</b>——主持小隊會議（7 步程序，c19）。</li><li><b>帶頭</b>——自己做到先叫人做。</li></ol>'+
      '<p>記住：人哋跟你唔係因為你惡，係因為你值得跟。</p>'));
    wrap.appendChild(App.block('📝 小隊會議記錄表（可列印）',
      '<table class="meeting-table"><tbody>'+
      '<tr><th width="90">日期</th><td>______年____月____日</td><th width="90">主席</th><td>__________</td></tr>'+
      '<tr><th>記錄</th><td>__________</td><th>出席</th><td>____ / ____ 人</td></tr>'+
      '<tr><th>議題一</th><td colspan="3">____________________<br>決議：____________________</td></tr>'+
      '<tr><th>議題二</th><td colspan="3">____________________<br>決議：____________________</td></tr>'+
      '<tr><th>分工</th><td colspan="3">邊個：__________ 做咩：__________ 幾時完成：__________</td></tr>'+
      '<tr><th>下次開會</th><td colspan="3">______年____月____日</td></tr>'+
      '</tbody></table>'));
    wrap.appendChild(App.h('p','tip','📣 小隊歡呼庫已搬去 <a href="#songs">🔥 營火歌</a>（開場／收尾都用得上）。'));
    return wrap;
  }

  if(cur==='tools'){
    wrap.appendChild(App.toolsSecs());
    return wrap;
  }

  if(cur==='apply'){
    wrap.appendChild(App.h('div','callout ok-callout','🏕️ '+INTERESTS.howToApply.troopNote));
    var ol3 = App.h('ol','steps');
    ol3.innerHTML = INTERESTS.howToApply.steps.map(function(s){
      return '<li><b>'+s.t+'</b>：'+s.d+'</li>';
    }).join('');
    wrap.appendChild(App.sec('🎖️ 如何報考專科徽章（興趣組：團內考核）').add(ol3));
    wrap.appendChild(App.h('p','source-note',INTERESTS.howToApply.otherGroupsNote));
    return wrap;
  }

  if(cur==='course'){
    var ol4 = App.h('ol','steps');
    ol4.innerHTML = INTERESTS.howToApply.courseApply.steps.map(function(s){
      return '<li><b>'+s.t+'</b>：'+s.d+'</li>';
    }).join('');
    wrap.appendChild(App.sec('📚 如何報考訓練班（訂閱通告圖書館）').add(ol4));
    return wrap;
  }

  var ul3 = App.h('ul','bullet');
  ul3.innerHTML = '<li><a href="'+DATA.source.url+'" target="_blank" rel="noopener">《童軍訓練綱要》網上版（童軍支部）</a></li>'+
    '<li><a href="'+EXTERNAL.officialPack+'" target="_blank" rel="noopener">官方集會套包 2026-09-01 版 PDF</a></li>'+
    '<li><a href="'+EXTERNAL.badge+'" target="_blank" rel="noopener">童軍進度追蹤（外部 APP）</a></li>'+
    '<li><a href="'+EXTERNAL.circulars+'" target="_blank" rel="noopener">通告圖書館</a></li>'+
    '<li><a href="'+EXTERNAL.district+'" target="_blank" rel="noopener">區總部報章系統（只係部分專科徽章報名用；興趣組由團長團內考核，唔使入）</a></li>';
  wrap.appendChild(App.sec('🔗 參考資料').add(ul3));
  return wrap;
};

/* 集會現場小工具（計分板／抽籤／倒數／分組） */
App.toolsSecs = function(){
  var frag = App.h('div','');
  frag.appendChild(App.h('p','lede','🧰 集會現場即開即用：計分、抽人、倒數、分組。制度同會議記錄表喺「小隊制度」分頁。'));
  var c5 = App.h('div','card');
  var rows = '';
  for(var i=0;i<4;i++){
    rows += '<tr><td><input id="pt-name-'+i+'" value="'+App.patrolNames[i]+'" onchange="App.patrolName('+i+',this.value)" style="width:110px;"></td>'+
      '<td style="text-align:center;"><b id="pt-score-'+i+'" style="font-size:1.5em;">'+App.patrolScores[i]+'</b></td>'+
      '<td style="white-space:nowrap;"><button onclick="App.patrolScore('+i+',1)">＋1</button> '+
      '<button onclick="App.patrolScore('+i+',5)">＋5</button> '+
      '<button onclick="App.patrolScore('+i+',-1)">－1</button></td></tr>';
  }
  c5.innerHTML = '<h3>🏆 小隊計分板</h3><table class="meeting-table"><thead><tr><th>小隊</th><th>分數</th><th>加減</th></tr></thead><tbody>'+rows+'</tbody></table>'+
    '<p><button onclick="App.patrolScoreReset()">🔄 全部清零</button> <small>（分數暫存，轉頁唔會唔見，閂 App 先會 reset）</small></p>';
  frag.appendChild(c5);
  var c6 = App.h('div','card');
  c6.innerHTML = '<h3>🎲 抽籤</h3><p>名單（一行一個）：</p><textarea id="pt-lots-names" rows="4" style="width:100%;" placeholder="陳大文&#10;李小明&#10;…"></textarea>'+
    '<p>抽幾個？<input id="pt-lots-n" type="number" value="1" min="1" style="width:60px;"> <button onclick="App.drawLots()">抽籤！</button></p><div id="pt-lots-out"></div>';
  frag.appendChild(c6);
  var c7 = App.h('div','card');
  c7.innerHTML = '<h3>⏱️ 倒數計時</h3><p><input id="pt-cd-m" type="number" value="5" min="0" style="width:60px;"> 分 <input id="pt-cd-s" type="number" value="0" min="0" max="59" style="width:60px;"> 秒 '+
    '<button onclick="App.countdownStart()">▶ 開始</button> <button onclick="App.countdownStop()">⏹ 停</button></p><div id="pt-cd-out"></div>';
  frag.appendChild(c7);
  var c8 = App.h('div','card');
  c8.innerHTML = '<h3>👥 隨機分組</h3><p>名單（一行一個）：</p><textarea id="pt-grp-names" rows="4" style="width:100%;" placeholder="陳大文&#10;李小明&#10;…"></textarea>'+
    '<p>分幾多組？<input id="pt-grp-n" type="number" value="2" min="2" style="width:60px;"> <button onclick="App.groupRandom()">隨機分組！</button></p><div id="pt-grp-out"></div>';
  frag.appendChild(c8);
  return frag;
};

/* ✂️ 素材庫（下方 🅱️：有明確想法→直接揀直接印） */
App.pages.print = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'✂️ 素材庫'));
  wrap.appendChild(App.h('p','lede','<b>呢度俾有明確想法嘅領袖「即搵即印」</b>：想印邊張就撳嗰張嘅 🖨️，淨係印嗰張，唔會連其他嘢一齊印。冇 IDEA 想跟住做？去上面 🅰️ 集會目錄逐場跟。'));
  wrap.appendChild(App.chiprow([
    {id:'pr-ws',ic:'📝',n:'工作紙 24 場'},
    {id:'pr-text',ic:'⚜️',n:'誓詞規律銘言卡'},
    {id:'pr-aid',ic:'🩹',n:'急救卡'},
    {id:'pr-rope',ic:'🧵',n:'收繩保養卡'},
    {id:'pr-flag',ic:'🇨🇳',n:'國歌・升旗禮儀'}
  ]));

  /* 工作紙：直接列喺素材庫，逐張直接印 */
  var sWs = App.sec('📝 工作紙（c01–c24，逐張直接印）', {id:'pr-ws'});
  var wsHtml = '<p class="mut">上面 🅰️ 每場教案入面都有同一份工作紙（跟住做時一齊印）；呢度俾「淨係想印某張工作紙」嘅領袖用——撳每張右上嘅 🖨️ 就只印嗰張。</p>';
  var wsGroups = [
    {k:'會員章 c01–c06', from:0, to:6},
    {k:'探索 c07–c12', from:6, to:12},
    {k:'探索 c13–c18', from:12, to:18},
    {k:'標準/總結 c19–c24', from:18, to:24}
  ];
  wsGroups.forEach(function(g){
    var list = DATA.meetings.slice(g.from,g.to).filter(function(m){return m.full&&m.data&&m.data.worksheet;});
    if(!list.length) return;
    wsHtml += '<h3 class="ws-group">'+g.k+'</h3>';
    list.forEach(function(m){
      var aud = m.data.worksheet.audience==='leader' ? '（領袖用）' : '（成員用 A4）';
      wsHtml += '<div class="ws-item" data-title="'+m.tid+' 工作紙">'
        + '<div class="ws-head"><b>'+m.tid+aud+'</b><span class="mut"> '+m.n+'</span> '
        + '<a class="mut ws-goto" href="#plan/'+m.tid+'">睇完整教案 ↗</a>'
        + '<button class="print-btn" onclick="App.printSec(this.closest(\'div.ws-item\'))">🖨️ 只印呢張</button></div>'
        + App.worksheetHtml(m.data.worksheet)
        + '</div>';
    });
  });
  sWs._body.innerHTML = wsHtml;
  wrap.appendChild(sWs);

  wrap.appendChild(App.block('⚜️ 誓詞・規律・銘言文字卡',
    '<div class="card"><h3>童軍誓詞</h3><ol class="promise">'+DATA.facts.promise.map(function(l){return '<li>'+l+'</li>';}).join('')+'</ol>'+
    '<h3>童軍規律</h3><ul class="bullet">'+DATA.facts.law.map(function(l){return '<li>'+l+'</li>';}).join('')+'</ul>'+
    '<h3>童軍銘言：準備</h3><ul class="motto">'+DATA.facts.motto7.map(function(l){return '<li>'+l+'</li>';}).join('')+'</ul></div>', {id:'pr-text'}));

  var aidHtml = '';
  C17.firstaid.forEach(function(f){
    aidHtml += '<div class="card aid-card"><h3>'+f.n+'</h3><p><b>處理：</b>'+f.how+'</p><p class="safety"><b>⚠️ 注意：</b>'+f.warn+'</p></div>';
  });
  aidHtml += '<div class="card"><p><b>復原臥式：</b>不省人事但有呼吸嗰陣用——側臥，防嘔吐物鯁親。教學見 <a href="#plan/c17">c17</a>。</p></div>';
  wrap.appendChild(App.block('🩹 急救卡（7 種＋復原臥式）', aidHtml, {id:'pr-aid'}));

  wrap.appendChild(App.block('🧵 收繩保養卡',
    '<div class="card"><p><b>收法：</b>'+C14.ropeCare.coil+'</p><ul class="bullet">'+C14.ropeCare.care.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'+
    (DIAGRAMS.skillx&&DIAGRAMS.skillx.ropecare?'<figure class="dgm-fig"><div class="dgm-wrap">'+DIAGRAMS.skillx.ropecare+'</div><figcaption>🖼️ 收繩＋保養示意</figcaption></figure>':'')+'</div>', {id:'pr-rope'}));

  wrap.appendChild(App.block('🇨🇳 國歌《義勇軍進行曲》・升旗禮儀歌紙',
    '<div class="card"><ul class="bullet"><li><b>場合</b>：升旗禮（c04/c06/c12/c20）、大型典禮——全體肅立，面向國旗。</li>'+
    '<li><b>禮儀</b>：脫帽（戴帽者）、立正、跟唱；演奏期間唔傾偈唔行開。戴帽行三指舉手禮，無帽行注目禮。</li></ul>'+
    '<p><b>歌詞</b>：起來！不願做奴隸的人們！把我們的血肉，築成我們新的長城！中華民族到了最危險的時候，每個人被迫着發出最後的吼聲。起來！起來！起來！我們萬眾一心，冒着敵人的炮火，前進！冒着敵人的炮火，前進！前進！前進！進！</p></div>'+
    '<div class="callout">🔥 營火歌請去 <a href="#songs">🔥 營火歌 tab</a>：10 首傳統童軍營火歌歌紙（公版歌詞＋和弦＋動作玩法）＋領唱技巧。本素材庫只保留升旗禮儀所需國歌紙。</div>', {id:'pr-flag'}));

  return wrap;
};

/* 🎮 活動（每個遊戲附場地圖） */
App.pages.play = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🎮 活動'));
  wrap.appendChild(App.h('p','lede','破冰、合作遊戲、課程活動、營火、雨天後備——即開即查即用（共 '+DATA.games.length+' 個）。每個遊戲附場地圖；已補插畫嘅會同時有「實景示意圖＋平面擺位圖」，睇圖就知點擺位（圖只示動作／場地，唔畫制服）。'));
  var gbn = App.h('div','game-banner');
  gbn.innerHTML = App.ph('game-banner', FIGS&&FIGS['game-banner']?FIGS['game-banner'].cap:'設場要點');
  wrap.appendChild(gbn);
  var cats = [];
  DATA.games.forEach(function(g){ if(cats.indexOf(g.cat)<0) cats.push(g.cat); });
  var filt = App.h('div','filters');
  [{k:'all',n:'全部'}].concat(cats.map(function(c){return {k:c,n:c};})).forEach(function(b,i){
    var btn = App.h('button','filter-btn'+(i===0?' active':''),b.n);
    btn.setAttribute('data-cat',b.k);
    btn.onclick = function(){
      document.querySelectorAll('#view .filter-btn').forEach(function(x){x.classList.remove('active');});
      btn.classList.add('active');
      var cat = b.k;
      document.querySelectorAll('.game-card').forEach(function(card){
        card.style.display = (cat==='all'||card.getAttribute('data-cat')===cat)?'':'none';
      });
    };
    filt.appendChild(btn);
  });
  wrap.appendChild(filt);
  DATA.games.forEach(function(g){
    var card = App.h('div','card game-card');
    card.setAttribute('data-cat',g.cat);
    card.setAttribute('data-title','遊戲 '+g.n);
    var gk = (typeof GAME_FIG!=='undefined') ? (GAME_FIG[g.n]||'') : '';
    var gcap = (gk && typeof FIGS!=='undefined' && FIGS[gk]) ? FIGS[gk].cap : '場地擺位圖（俯視）・照圖設場就得';
    var fig = App.ph(gk, gcap, (DIAGRAMS.game && DIAGRAMS.game[g.n]) ? DIAGRAMS.game[g.n] : '');
    card.innerHTML = '<h3>'+g.n+' <span class="tag">'+g.cat+'</span> <span class="tag">'+g.minutes+'分鐘</span></h3>'+
      '<p><b>人數：</b>'+g.people+' &nbsp; <b>物資：</b>'+g.mats+'</p>'+
      '<p>'+g.desc+'</p>'+fig+
      '<p><b>玩法：</b></p><ol class="steps">'+g.steps.map(function(st){return '<li>'+st+'</li>';}).join('')+'</ol>'+
      '<p class="tip">💡 '+g.tips+'</p>'+
      '<p class="safety"><b>⚠️ 安全：</b>'+g.safety+'</p>'+
      '<p><button class="print-btn" onclick="App.printSec(this.closest(\'div.game-card\'))">🖨️ 只印呢個遊戲</button></p>';
    wrap.appendChild(card);
  });
  return wrap;
};

/* 🪢 技能（小分頁＋圖解；按用戶要求唔出繩結逐步卡） */
App.pages.skills = function(sub){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🪢 技能'));
  var subs = [
    {k:'rope',ic:'🪢',n:'繩結口訣'},
    {k:'care',ic:'🧵',n:'收繩保養'},
    {k:'map',ic:'🗺️',n:'地圖指南針'},
    {k:'pack',ic:'🎒',n:'背囊'},
    {k:'camp',ic:'🏕️',n:'營藝'},
    {k:'pioneer',ic:'🪚',n:'先鋒工程'},
    {k:'track',ic:'👣',n:'追蹤符號'},
    {k:'field',ic:'🌳',n:'郊野守則'},
    {k:'aid',ic:'🩹',n:'急救'}
  ];
  var cur = subs.some(function(x){return x.k===sub;}) ? sub : subs[0].k;
  wrap.appendChild(App.subnav('skills',subs,cur));
  var sk = DIAGRAMS.skillx || {};
  function figFor(name, cap){
    var k = (typeof SKILL_FIG!=='undefined' && SKILL_FIG[name]) ? SKILL_FIG[name] : '';
    var fcap = (k && typeof FIGS!=='undefined' && FIGS[k] && FIGS[k].cap) ? FIGS[k].cap : cap;
    return App.ph(k, fcap, sk[name] || '');
  }
  var secs = {};
  secs.rope = App.block('🪢 繩結（10 個・文字口訣為準）',
    '<div class="card"><ul class="bullet">'+C13.knots.concat(C14.knots).map(function(k){
      return '<li><b>'+k.n+'</b>（'+k.en+'）：'+k.use+'</li>';
    }).join('')+'</ul>'+
    '<div class="callout warn">🚫 本 app <b>唔設「繩結逐步圖卡」</b>——圖解好易畫錯誤導人。打法請跟 <a href="#plan/c13">c13</a>／<a href="#plan/c14">c14</a> 教案嘅文字口訣（例：平結「左壓右」、稱人結「兔仔出洞繞樹返洞」），並由領袖現場示範＋檢查。</div></div>');
  secs.care = App.block('🧵 收繩與繩索保養',
    '<div class="card"><p><b>圈繞收法：</b>'+C14.ropeCare.coil+'</p>'+figFor('ropecare','收繩步驟＋保養五要点')+
    '<ul class="bullet">'+C14.ropeCare.care.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul></div>');
  secs.map = App.block('🗺️ 地圖與指南針',
    '<div class="card"><ul class="bullet">'+
    '<li><b>比例尺 1:25,000</b>：地圖 1cm = 實際 250 米；4 個指甲 ≈ 1 公里（c09）。</li>'+
    '<li><b>10 種圖例</b>：車路/小徑/河流/水塘/林地/等高線（密=斜）/營地/建築/瞭望台/求助電話（c09）。</li>'+
    '<li><b>8 方位</b>：東南西北＋東北、東南、西南、西北（c16 定向遊戲）。</li>'+
    '<li><b>指南針</b>：放平，轉身令紅針對住 N，前面就係北；避開鐵器/磁石/電話（c16）。</li></ul>'+
    '<div class="svg-steps"><figure>'+DIAGRAMS.compass+'<figcaption>指南針八方位：紅針永遠指北（N）</figcaption></figure>'+figFor('legend','地圖圖例（示意）')+'</div></div>');
  secs.pack = App.block('🎒 背囊收拾',
    '<div class="card"><ul class="bullet">'+
    '<li><b>執包三步</b>：輕重分佈（重貼背中上）→常用在外→防水（密實袋）。</li>'+
    '<li><b>一日郊野</b>（c09）：水/乾糧/帽/雨具/防曬蚊怕水/哨子/電話/電筒/小急救包/證件錢。</li>'+
    '<li><b>露營</b>（c15/c16）：50–70L，睡袋放底、衫放中、煮食用具放頂；唔超過體重 1/4。</li></ul>'+
    '<div class="svg-steps"><figure>'+DIAGRAMS.pack+'<figcaption>背囊分層圖：重貼背中上，常用放外，底放睡袋</figcaption></figure></div></div>');
  secs.camp = App.block('🏕️ 營藝（帳篷・爐具・刀具安全）',
    '<div class="card"><ul class="bullet">'+
    '<li><b>紮營</b>：平地→清石→地布→穿柱→起篷→45 度拉營繩→打營釘（c16）。</li>'+
    '<li><b>氣爐</b>：通風、離帳篷 3 米、檢查漏氣、煮食唔離人、熄火先關氣（c15）。</li>'+
    '<li><b>小刀</b>：安全圈一臂、向外削、傳刀合埋柄向人、跌刀唔接（c15）。</li>'+
    '<li><b>斧頭手鋸</b>：3 米線、木頭放穩、扶木手唔放鋸路（c15）。</li></ul>'+
    '<div class="svg-steps">'+figFor('tent','搭帳六步（側視）')+figFor('stove','爐具 3 米安全圈（俯視）')+figFor('knife','小刀安全圈＝一臂長')+'</div></div>');
  secs.pioneer = App.block('🪚 先鋒工程入門',
    '<div class="card"><ul class="bullet">'+
    '<li><b>基礎</b>：10 個繩結（見「繩結口訣」分頁）＋收繩保養——c13/c14 已教齊。</li>'+
    '<li><b>紮作預告</b>：十字紮（綁十字木）、剪立紮（A 字架）、平行紮（接長木）——留待後續先鋒工程場次，雙套結做起結收結。</li>'+
    '<li><b>應用</b>：天幕、營門、橋、瞭望台——c16 營地建設已實習天幕。</li></ul>'+
    '<div class="callout">⚠️ 紮作同繩結一樣「畫錯就教錯」，所以圖解一律以現場示範＋教案文字為準。</div></div>');
  secs.track = App.block('👣 追蹤符號（國際通用）',
    '<div class="card"><ul class="bullet">'+
    '<li><b>→ 箭嘴</b>：向前行；<b>○ 圓圈</b>：集合/終點。</li>'+
    '<li><b>✕ 交叉</b>：唔行呢邊/行錯路；<b>↑ 轉彎箭嘴</b>：轉方向。</li>'+
    '<li><b>～ 波浪</b>：有水/小心；<b>△ 三角</b>：留訊息喺附近。</li>'+
    '<li><b>用法</b>：粉筆/石頭/樹枝喺路邊做記號，帶後隊跟路；做完要清走（Leave No Trace）。</li></ul>'+
    '<div class="svg-steps">'+
    '<figure>'+DIAGRAMS.track.arrow+'<figcaption>向前行</figcaption></figure>'+
    '<figure>'+DIAGRAMS.track.circle+'<figcaption>集合/終點</figcaption></figure>'+
    '<figure>'+DIAGRAMS.track.cross+'<figcaption>唔行呢邊</figcaption></figure>'+
    '<figure>'+DIAGRAMS.track.turn+'<figcaption>轉方向</figcaption></figure>'+
    '<figure>'+DIAGRAMS.track.water+'<figcaption>有水/小心</figcaption></figure>'+
    '<figure>'+DIAGRAMS.track.msg+'<figcaption>附近有訊息</figcaption></figure></div></div>');
  secs.field = App.block('🌳 郊野守則・求助信號',
    '<div class="card"><ul class="bullet">'+
    '<li><b>Leave No Trace 七原則</b>：計劃準備→硬地行露營→垃圾帶走→唔郁自然嘢→減營火影響→尊重野生動物→顧及其他人（c16）。</li>'+
    '<li><b>山火預防</b>：只喺指定爐位生火；離開淋熄攪拌感受冇熱；乾燥季節唔生火。</li>'+
    '<li><b>天氣觀察</b>：黑雲/悶熱/風向轉＝落雨先兆；行雷閃電即落山，唔企大樹下。</li>'+
    '<li><b>緊急撤退</b>：預先定撤退路線＋集合點；迷路企定＋吹哨（三短三長三短 SOS）＋等救援（c09/c10）。</li></ul>'+
    '<div class="svg-steps">'+figFor('sos','SOS 哨音節拍（三短三長三短）')+figFor('lost','迷路自保三步 S.T.A.Y.')+'</div></div>');
  secs.aid = App.block('🩹 急救 7 種',
    '<div class="card"><ul class="bullet">'+C17.firstaid.map(function(f){return '<li><b>'+f.n+'</b>：'+f.how+'</li>';}).join('')+'</ul>'+
    '<div class="svg-steps">'+figFor('rice','扭傷 RICE 四步；燙傷用「沖脫泡蓋送」（c17）')+'</div>'+
    '<p>👉 想逐張列印貼牆？去 <a href="#print">✂️ 素材庫→急救卡</a>。完整教學＋情境賽見 <a href="#plan/c17">c17</a>。</p></div>');
  wrap.appendChild(secs[cur]);
  return wrap;
};

/* 🎖️ 興趣章（唔放區總部報章系統入口——興趣組由團考核） */
App.pages.badges = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🎖️ 興趣章（興趣組專科徽章）'));
  wrap.appendChild(App.h('p','lede','童軍支部專科徽章分 4 組：興趣組（綠底，11-13 歲入門）、技能組（藍底，13-15 歲）、服務組（紅底）、教導組（金邊）。本 tab 只列出 <b>興趣組</b>，主要由童軍團長喺團內安排考驗。其他組別詳情請看 <a href="'+EXTERNAL.badge+'" target="_blank" rel="noopener">🏅 童軍進度追蹤</a>。'));
  var filt = App.h('div','filters');
  var btns = [{k:'all',n:'全部'}].concat(INTERESTS.categories.map(function(c){return {k:c.k,n:c.ic+' '+c.n};}));
  btns.forEach(function(b,i){
    var btn = App.h('button','filter-btn'+(i===0?' active':''),b.n);
    btn.setAttribute('data-cat',b.k);
    btn.onclick = function(){
      document.querySelectorAll('.filters .filter-btn').forEach(function(x){x.classList.remove('active');});
      btn.classList.add('active');
      var cat = b.k;
      document.querySelectorAll('.badge-card').forEach(function(card){
        card.style.display = (cat==='all' || card.getAttribute('data-cat')===cat) ? '' : 'none';
      });
    };
    filt.appendChild(btn);
  });
  wrap.appendChild(filt);
  wrap.appendChild(App.h('p','source-note','📚 來源：'+INTERESTS.source.title+'（'+INTERESTS.source.version+'）｜<a href="#book/apply">興趣組點考（團內考核 7 步）</a>｜💡 興趣組由團考核，唔使自己入區總部報章系統'));
  var grid = App.h('div','badge-grid');
  INTERESTS.badges.forEach(function(b){
    var catName = (INTERESTS.categories.find(function(c){return c.k===b.cat;})||{n:''}).n;
    var tags = '';
    if(b.new2026) tags += '<span class="tag new">🆕 2026新增</span>';
    if(b.rev2026) tags += '<span class="tag rev">✏️ 2026修訂</span>';
    var reqList = b.req.map(function(r){return '<li>'+r+'</li>';}).join('');
    var sugList = b.suggest.map(function(s){return '<li>'+s+'</li>';}).join('');
    var card = App.h('div','badge-card');
    card.setAttribute('data-cat',b.cat);
    card.innerHTML =
      '<div class="badge-head"><span class="badge-ic">'+b.ic+'</span>'+
      '<h3>'+b.zh+' <small>('+b.en+')</small></h3>'+
      '<div class="badge-tags">'+tags+'<span class="tag cat">'+catName+'</span></div></div>'+
      '<details><summary>📋 官方考核要求</summary><ol class="req-list">'+reqList+'</ol></details>'+
      '<details><summary>💡 建議考核方式（僅供參考）</summary><ul class="sug-list">'+sugList+'</ul></details>';
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
  var cancel = App.h('div','callout warn');
  cancel.innerHTML = '⚠️ <b>已取消徽章（2026-08-15生效）</b>：愛護動物章（興趣組）已取消，由新設「動物飼養章（興趣組）」及「愛護動物章（服務組）」取代；持有舊章者仍可佩戴至童軍身分完結。';
  wrap.appendChild(cancel);
  return wrap;
};

/* 🔥 營火歌（取代「小隊」tab：內容＝營火歌音樂資訊＋歌紙） */
App.pages.songs = function(sub){
  var wrap = App.h('div','page');
  var sheets = SONGS.sheets;
  var subs = [{k:'all',ic:'📚',n:'歌單总覽'}].concat(sheets.map(function(s){return {k:s.k,ic:'🎵',n:s.zh};}));
  wrap.appendChild(App.h('h1',null,'🔥 營火歌'));
  wrap.appendChild(App.subnav('songs',subs, (sub && sub!=='all')?sub:'all'));

  // 單首歌紙
  if(sub && sub!=='all'){
    var s0 = sheets.find(function(x){return x.k===sub;});
    if(s0){
      var i0 = sheets.indexOf(s0);
      var bar = App.h('div','cer-nav');
      var prev = sheets[i0-1], next = sheets[i0+1];
      bar.innerHTML = '<a class="back-link" href="#songs">← 歌單总覽</a>'+
        (prev?'<a class="cer-prev" href="#songs/'+prev.k+'">← '+prev.zh+'</a>':'')+
        (next?'<a class="cer-next" href="#songs/'+next.k+'">'+next.zh+' →</a>':'');
      wrap.appendChild(bar);
      wrap.appendChild(App.songSec(s0, true));
      return wrap;
    }
  }

  wrap.appendChild(App.h('p','lede','童軍營火歌歌紙＋音樂資訊：全部係流傳成百年嘅童軍／營火傳統歌（公版歌詞，放心唱放心印）。唔自創、唔放唔啱場合嘅歌。'));
  var banner = App.h('div','song-banner');
  banner.innerHTML = App.ph('fire-song', FIGS&&FIGS['fire-song']?FIGS['fire-song'].cap:'營火唱歌現場');
  wrap.appendChild(banner);
  var hero = App.h('div','card song-hero');
  hero.innerHTML = '<h3>🔥 營火歌唱環節點樣帶</h3>'+
    App.ph('fire-circle', FIGS&&FIGS['fire-circle']?FIGS['fire-circle'].cap:'火圈座位：領唱企圈內・水／沙／急救箱放背後')+
    '<div class="svg-steps"><figure>'+(DIAGRAMS.fire?DIAGRAMS.fire.flow:'')+'<figcaption>10–15 分鐘唱歌環節編排</figcaption></figure></div>';
  wrap.appendChild(hero);

  wrap.appendChild(App.block('🎸 音樂資訊點樣睇（歌紙通用）',
    '<div class="card"><ul class="bullet">'+SONGS.musicTips.map(function(t){return '<li>'+t+'</li>';}).join('')+'</ul>'+
    '<p class="mut">想跟旋律：用歌名搜正版教學片（例：Oh! Susanna campfire song），或請識結他／烏克麗麗嘅領袖跟歌紙即場彈。歌紙上標明每句用咩和弦，照彈就得。</p></div>', {print:false}));

  var grid = App.h('div','song-grid');
  sheets.forEach(function(s){
    var card = App.h('a','card song-card');
    card.href = '#songs/'+s.k;
    card.innerHTML = '<h3>🎵 '+s.zh+'<br><small>'+s.en+'</small></h3>'+
      '<p><span class="tag cat">'+s.cat+'</span> <span class="tag">'+s.meter+'</span> <span class="tag">'+s.keyName+'</span></p>'+
      '<p class="mut">'+s.lines[0][1]+'</p>'+
      '<p class="ws-open">撳入去睇歌紙＋和弦＋動作 →</p>';
    grid.appendChild(card);
  });
  wrap.appendChild(grid);

  wrap.appendChild(App.block('🎤 領唱 5 招',
    '<div class="card"><ol class="steps">'+SONGS.leaderTips.map(function(t,i){return '<li><b>第'+(i+1)+'招：</b>'+t+'</li>';}).join('')+'</ol></div>', {print:false}));

  var must = SONGS.mustKnow;
  var mustHtml = '<div class="card"><p>'+must.why+'</p><ul class="bullet">'+must.list.map(function(m){
      return '<li>'+(m.must?'⭐必學：':'')+'<b>'+m.n+'</b> — '+m.tip+'</li>';
    }).join('')+'</ul><p class="tip">✅ '+must.check+'</p>'+
    (DIAGRAMS.fire&&DIAGRAMS.fire.scarf?'<div class="svg-steps"><figure>'+DIAGRAMS.fire.scarf+'<figcaption>營火袍：縫至少兩枚布章（營火章要求第 3 項）・袍色／布章樣式照旅團慣例，本 app 唔出插畫避免畫錯</figcaption></figure></div>':'')+
    '<p>💡 營火章考核要求詳見 <a href="#badges">🎖️ 興趣章→營火</a>。</p></div>';
  wrap.appendChild(App.block('⭐ 營火章「必識十首」＋有版權歌名單', mustHtml, {print:false}));

  wrap.appendChild(App.block('📋 唱歌環節編排（10–15 分鐘）＋安全底線',
    '<div class="card"><ol class="steps">'+SONGS.hostPlan.map(function(x){return '<li><b>'+x.t+'</b>：'+x.d+'</li>';}).join('')+'</ol>'+
    '<ul class="bullet">'+SONGS.safety.map(function(x){return '<li>⚠️ '+x+'</li>';}).join('')+'</ul></div>'));

  wrap.appendChild(App.block('📣 小隊歡呼庫（開場／收尾用）',
    '<div class="card"><ul class="bullet">'+
    '<li><b>準備三連呼</b>：準備！準備！準備！耶！（右拳每次舉高，最後跳起）</li>'+
    '<li><b>小隊名威風呼</b>：（小隊名）！最威！最叻！耶！（圍圈搭膊，嗌名向圓心跳一步）</li>'+
    '<li><b>拍手節奏呼</b>：拍拍拍！童軍！童軍！正！（節奏拍手＋踏腳，越嚟越快）</li>'+
    '<li><b>勝利 V 呼</b>：贏！贏！贏！我哋係第一！（雙手 V 字舉高，完場勝利用）</li>'+
    '<li><b>營火晚安呼</b>：（細聲）晚安～童軍～聽日見～（搭膊頭細聲講，營火完結用）</li></ul>'+
    '<p>💡 c07 教自創歡呼——用上面做藍本，改個小隊名就係你哋專屬歡呼。<a href="#plan/c07">去 c07 →</a></p></div>'));
  return wrap;
};

/* 一首歌嘅歌紙卡（可列印） */
App.songSec = function(s, single){
  var sec = App.sec('🎵 '+s.zh+'（'+s.en+'）', {id:'song-'+s.k});
  var html = '<div class="card song-sheet">';
  html += '<p><span class="tag cat">'+s.cat+'</span>'+
    '<span class="tag">拍子 '+s.meter+'</span>'+
    '<span class="tag">速度 '+s.tempo+'</span>'+
    '<span class="tag">調：'+s.keyName+'</span></p>';
  html += '<p><b>曲式：</b>'+s.form+'</p>';
  html += '<div class="song-lines">';
  s.lines.forEach(function(pair){
    html += '<div class="song-pair"><div class="chord">'+pair[0]+'</div><div class="ly">'+pair[1]+'</div></div>';
  });
  html += '</div>';
  if(s.acts && s.acts.length) html += '<p><b>動作／玩法：</b></p><ul class="bullet">'+s.acts.map(function(a){return '<li>'+a+'</li>';}).join('')+'</ul>';
  if(s.howto && s.howto.length) html += '<p><b>領唱提示：</b></p><ul class="bullet">'+s.howto.map(function(a){return '<li>'+a+'</li>';}).join('')+'</ul>';
  html += '<p class="source-note">© '+s.note+'</p>';
  html += '</div>';
  sec._body.innerHTML = html;
  return sec;
};

/* 集會現場工具狀態（計分板等；喺 📖 手冊→集會工具） */
App.patrolScores = [0,0,0,0];
App.patrolNames = ['第一小隊','第二小隊','第三小隊','第四小隊'];
App.patrolTimer = null;
App.patrolScore = function(i,d){
  App.patrolScores[i] = Math.max(0,(App.patrolScores[i]||0)+d);
  var el = document.getElementById('pt-score-'+i);
  if(el) el.innerHTML = App.patrolScores[i];
};
App.patrolScoreReset = function(){
  App.patrolScores = [0,0,0,0];
  for(var i=0;i<4;i++){ var el = document.getElementById('pt-score-'+i); if(el) el.innerHTML = '0'; }
};
App.patrolName = function(i,v){ App.patrolNames[i] = v; };
App.drawLots = function(){
  var t = document.getElementById('pt-lots-names'); if(!t) return;
  var names = t.value.split('\n').map(function(x){return x.trim();}).filter(function(x){return x;});
  var nEl = document.getElementById('pt-lots-n');
  var n = Math.max(1, parseInt((nEl&&nEl.value)||'1',10)||1);
  var out = document.getElementById('pt-lots-out');
  if(!names.length){ if(out) out.innerHTML = '⚠️ 請先輸入名單（一行一個）。'; return; }
  var pool = names.slice(), picked = [];
  while(pool.length&&picked.length<n){ picked.push(pool.splice(Math.floor(Math.random()*pool.length),1)[0]); }
  if(out) out.innerHTML = '🎲 抽中：<b>'+picked.join('、')+'</b>';
};
App.countdownStart = function(){
  var mEl = document.getElementById('pt-cd-m'), sEl = document.getElementById('pt-cd-s');
  var m = parseInt((mEl&&mEl.value)||'0',10)||0, sc = parseInt((sEl&&sEl.value)||'0',10)||0;
  var total = m*60+sc; if(total<=0) return;
  var out = document.getElementById('pt-cd-out');
  App.countdownStop();
  function tick(){
    var mm = Math.floor(total/60), ss = total%60;
    if(out) out.innerHTML = '<b style="font-size:2em;">'+mm+':'+(ss<10?'0':'')+ss+'</b>';
    if(total<=0){ if(out) out.innerHTML = '<b style="font-size:2em;color:#2E7D32;">⏰ 時間到！</b>'; App.countdownStop(); return; }
    total--;
    App.patrolTimer = setTimeout(tick,1000);
  }
  tick();
};
App.countdownStop = function(){ if(App.patrolTimer){ clearTimeout(App.patrolTimer); App.patrolTimer = null; } };
App.groupRandom = function(){
  var t = document.getElementById('pt-grp-names'); if(!t) return;
  var names = t.value.split('\n').map(function(x){return x.trim();}).filter(function(x){return x;});
  var gEl = document.getElementById('pt-grp-n');
  var g = Math.max(2, parseInt((gEl&&gEl.value)||'2',10)||2);
  var out = document.getElementById('pt-grp-out');
  if(!names.length){ if(out) out.innerHTML = '⚠️ 請先輸入名單（一行一個）。'; return; }
  var pool = names.slice();
  for(var i=pool.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var tmp=pool[i]; pool[i]=pool[j]; pool[j]=tmp; }
  var groups = []; for(var k=0;k<g;k++) groups.push([]);
  pool.forEach(function(nm,idx){ groups[idx%g].push(nm); });
  if(out) out.innerHTML = groups.map(function(gr,gi){return '<p><b>第 '+(gi+1)+' 組：</b>'+gr.join('、')+'</p>';}).join('');
};
