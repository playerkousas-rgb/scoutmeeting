/* app.js — Scout Hub 核心初始化、路由、tab 渲染（v1 skeleton） */
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
  // Offline state: disable external links
  document.querySelectorAll('a.external-link').forEach(function(a){
    a.style.opacity = navigator.onLine ? '1' : '0.5';
    a.style.pointerEvents = navigator.onLine ? '' : 'none';
  });
};

App.route = function(){
  var hash = location.hash.replace('#','') || 'plan';
  var parts = hash.split('/');
  var tab = parts[0];
  var sub = parts[1];
  var allowed = ['plan','ceremony','uniform','official','book','print','play','skills','badges','patrol'];
  if(allowed.indexOf(tab)<0){ tab = 'plan'; sub=null; }
  // Set active class on nav
  document.querySelectorAll('#topnav a, #tabbar a').forEach(function(a){
    a.classList.toggle('active', a.getAttribute('data-tab')===tab);
  });
  if(tab==='official'){ location.href = EXTERNAL.officialPack; return; }
  var view = document.getElementById('view');
  view.innerHTML = '';
  var el;
  if(tab==='plan' && sub){
    el = App.renderMeeting(sub);
  } else {
    el = (App.pages[tab] || App.pages.plan)();
  }
  if(el) view.appendChild(el);
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

App.searchOpen = function(){ location.hash = '#book'; };

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
    (m.full ? '<span class="tag ok">✓ 完整教案</span>' : '<span class="tag wip">內容陸續補上</span>');
  wrap.appendChild(meta);
  wrap.appendChild(App.h('p','lede','📍 場地：'+m.venue+'<br>🎯 目標：'+m.goal+(m.evidence?'<br>👀 觀察：'+m.evidence:'')+(m.gap?'<br>⚠️ 注意：'+m.gap:'')));

  // c01+ 完整教案（通用 render，靠 d 物件屬性決定顯示邊啲 section）
  if(m.data){
    var d = m.data;

  // 敏感主題警告
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

    // 領袖預備（如有）—— 可為 string array 或 [{when,what}] 陣列
    if(d.leaderPrep){
      wrap.appendChild(App.h('h2',null,'📌 領袖預備備忘'));
      var lp = App.h('div','card');
      lp.innerHTML = '<ul class="bullet">'+d.leaderPrep.map(function(x){
        if(typeof x === 'string') return '<li>'+x+'</li>';
        return '<li><b>'+x.when+'：</b>'+x.what+'</li>';
      }).join('')+'</ul>';
      wrap.appendChild(lp);
    }

    // 領袖開場白（如有 d.script 整體稿，或從 program[0].leaderScript 提取）
    if(d.script){
      wrap.appendChild(App.h('h2',null,'🎤 領袖開場白'));
      var sc = App.h('div','card script-card');
      Object.keys(d.script).forEach(function(k){
        sc.innerHTML += '<p><b>'+({open:'開場',intro:'介紹今日流程',beforeGame:'遊戲前',beforeDrill:'隊列前',close:'結束'}[k]||k)+'：</b>'+d.script[k]+'</p>';
      });
      wrap.appendChild(sc);
    }

    // 9 段程序表（支援 c01-c09 舊格式：p.n/number + p.min + p.sub + p.leader string + p.mats；
    // 同時支援 c10+ 新格式：p.n/string + p.t + p.steps + p.leader object + p.materials string）
    wrap.appendChild(App.h('h2',null,'📋 '+(m.duration||90)+' 分鐘 9 段程序表'));
    var tbl = App.h('table','meeting-table program-table');
    tbl.innerHTML = '<thead><tr><th width="40">序</th><th width="50">分鐘</th><th width="80">項目</th><th>內容／帶領要點</th></tr></thead><tbody>';
    d.program.forEach(function(p,idx){
      var detail = '';
      var isNew = (typeof p.n === 'string');
      var mins = isNew ? p.t : p.min;
      var title = isNew ? p.n : p.label;
      var type = isNew ? '' : (p.type||'');
      // steps/sub list
      var steps = p.steps || p.sub || [];
      if(steps.length) detail += '<ul class="bullet">'+steps.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ul>';
      // leader duties
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
      // in-segment leader script
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
      // materials: old .mats (array) or new .materials (string)
      var mats = '';
      if(p.mats && p.mats.length) mats = '<br><small>🎒 '+p.mats.join('、')+'</small>';
      else if(p.materials) mats = '<br><small>🎒 '+p.materials+'</small>';
      tbl.innerHTML += '<tr><td>'+(idx+1)+'</td><td>'+(mins||'')+'</td><td>'+type+(type?'<br>':'')+'<small>'+title+'</small></td><td>'+detail+mats+'</td></tr>';
    });
    tbl.innerHTML += '</tbody>';
    wrap.appendChild(tbl);

    // 物資清單（領袖執袋）
    wrap.appendChild(App.h('h2',null,'🎒 執袋清單（領袖/共用物資）'));
    var bt = App.h('table','meeting-table');
    bt.innerHTML = '<thead><tr><th>物品</th><th>數量</th><th>性質</th><th>備註</th></tr></thead><tbody>'+
      d.bag.map(function(x){return '<tr><td>'+x.n+'</td><td>'+(typeof x.qty==='number'?x.qty:x.qty)+'</td><td>'+x.type+'</td><td>'+x.note+'</td></tr>';}).join('')+
      '</tbody>';
    wrap.appendChild(bt);

    // 個人裝備（室外特別集會）
    if(m.personalKit){
      wrap.appendChild(App.h('h2',null,'👕 個人裝備清單（通知家長/成員）'));
      var pk = App.h('div','card');
      pk.innerHTML = '<h3>✅ 一定要帶</h3><ul class="bullet">'+m.personalKit.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
      if(m.doNotBring){
        pk.innerHTML += '<h3>🚫 唔好帶</h3><ul class="bullet">'+m.doNotBring.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
      }
      wrap.appendChild(pk);
    }

    // 家長通知（兩種格式：舊版 {title,items[]}；c10+ 純文字字串）
    wrap.appendChild(App.h('h2',null,'📝 家長通知（列印派發）'));
    var nc = App.h('div','card notice-card');
    if(typeof d.notice === 'string'){
      nc.innerHTML = '<pre style="white-space:pre-wrap;font-family:inherit;margin:0;">'+d.notice+'</pre>';
    } else {
      nc.innerHTML = '<h3>'+(d.notice.title||'家長通知')+'</h3><ul class="bullet">'+(d.notice.items||[]).map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
    }
    nc.innerHTML += '<p><button onclick="window.print()" class="print-btn">🖨️ 列印</button></p>';
    wrap.appendChild(nc);

    // 工作紙（兩種格式：舊版 {title,prompts[]}；c11+ {title,fields[]}）
    if(d.worksheet){
      var wsAudience = (d.worksheet.audience==='leader')?'領袖檢查清單':'工作紙（成員用，A4）';
      wrap.appendChild(App.h('h2',null,'✂️ '+wsAudience));
      var ws = App.h('div','card worksheet');
      ws.innerHTML = '<h3>'+d.worksheet.title+'</h3>';
      if(d.worksheet.fields){
        ws.innerHTML += '<ul class="bullet">'+d.worksheet.fields.map(function(f,i){
          var lab = f.label || f.name || ('第 '+(i+1)+' 項');
          var ty = f.type || 'text';
          var h = ty==='textarea' ? '<textarea rows="3" style="width:100%;margin-top:4px;"></textarea>' : '<input type="text" style="width:60%;margin-top:4px;">';
          return '<li><b>'+lab+'</b> '+h+'</li>';
        }).join('')+'</ul>';
        if(d.worksheet.footer) ws.innerHTML += '<p class="tip">'+d.worksheet.footer+'</p>';
      } else if(d.worksheet.prompts){
        ws.innerHTML += '<ol class="steps">'+d.worksheet.prompts.map(function(p){return '<li>'+p+'</li>';}).join('')+'</ol>';
      }
      if(d.worksheet.printBtn !== false) ws.innerHTML += '<p><button onclick="window.print()" class="print-btn">🖨️ 列印</button></p>';
      wrap.appendChild(ws);
    }

    // 承諾卡（c05 等特殊卡）
    if(d.pledgeCard){
      wrap.appendChild(App.h('h2',null,'💌 承諾卡（每位宣誓成員 1 張，自己保存）'));
      var pc = App.h('div','card pledge-card');
      pc.innerHTML = '<h3>'+d.pledgeCard.title+'</h3>'+
        '<div class="pledge-body"><ul class="bullet">'+d.pledgeCard.fields.map(function(f){return '<li>'+f+'</li>';}).join('')+'</ul></div>'+
        '<p><button onclick="window.print()" class="print-btn">🖨️ 列印承諾卡（A5 每人 1 張）</button></p>';
      wrap.appendChild(pc);
    }

    // 崗位分工（特別集會）—— 適配 r.duty/r.duties/r.qty
    if(d.roles){
      wrap.appendChild(App.h('h2',null,'👥 當日崗位分工'));
      var rl = App.h('table','meeting-table');
      rl.innerHTML = '<thead><tr><th>崗位</th><th>人數</th><th>人選</th><th>職責</th></tr></thead><tbody>'+
        d.roles.map(function(r){
          var qty = (r.qty!==undefined)?r.qty:'';
          var duty = r.duties || r.duty || '';
          var person = r.person || '__________';
          return '<tr><td>'+r.role+'</td><td>'+qty+'</td><td>'+person+'</td><td>'+duty+'</td></tr>';
        }).join('')+
        '</tbody>';
      wrap.appendChild(rl);
    }

    // 頒發物品清單（特別集會）—— x.to/x.qty 或 x.d
    if(d.items){
      wrap.appendChild(App.h('h2',null,'🎖️ 當日頒發/派發物品'));
      var it = App.h('ul','bullet');
      it.innerHTML = d.items.map(function(x){
        var who = x.to ? '（俾 '+x.to+'，'+x.qty+'）' : '';
        var desc = x.d || '';
        return '<li><b>'+x.n+'</b>'+who+(desc?' — '+desc:'')+'</li>';
      }).join('');
      wrap.appendChild(it);
    }

    // 領袖觀察記錄/清單（兩種格式：{title,items[]} 或 string array）
    if(d.observation){
      var isObsObj = !Array.isArray(d.observation);
      var obTitle = (isObsObj && d.observation.audience==='leader')?'✅ 領袖事後檢查清單':'👀 領袖觀察記錄（領袖用）';
      wrap.appendChild(App.h('h2',null,obTitle));
      var ob = App.h('div','card');
      var obsItems = isObsObj ? d.observation.items : d.observation;
      var obsTitle = isObsObj ? '<h3>'+d.observation.title+'</h3>' : '';
      ob.innerHTML = obsTitle +
        '<ul class="bullet">'+obsItems.map(function(x){return '<li><label><input type="checkbox"> '+x+'</label></li>';}).join('')+'</ul>';
      wrap.appendChild(ob);
    }

    // 禮成後跟進（c06 等）
    if(d.postCeremony){
      wrap.appendChild(App.h('h2',null,'📬 禮成後跟進'));
      var pst = App.h('div','card');
      pst.innerHTML = '<ul class="bullet">'+d.postCeremony.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';
      wrap.appendChild(pst);
    }

    // 實戰後備（兩種格式：舊版 物件 {fewPeople,... ,qa[]}；c10+ 陣列 [{situation, action}]）
    wrap.appendChild(App.h('h2',null,'🆘 實戰後備'));
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
    wrap.appendChild(pb);

    // 情境卡（如有）
    if(d.scenarios){
      wrap.appendChild(App.h('h2',null,'🃏 情境卡（領袖口頭講，每隊討論）'));
      var sc = App.h('div','card');
      sc.innerHTML = '<ol class="steps">'+d.scenarios.map(function(s){return '<li><b>情境：</b>'+s.s+'<br><b>處理：</b>'+s.a+'</li>';}).join('')+'</ol>';
      wrap.appendChild(sc);
    }

    // 小知識（兩種格式：舊版 {h,d}；c10+ {q,a}）
    if(d.trivia){
      wrap.appendChild(App.h('h2',null,'💡 補充小知識'));
      var tv = App.h('div','card');
      tv.innerHTML = d.trivia.map(function(t){
        var head = t.h || t.q || '';
        var body = t.d || t.a || '';
        return '<p><b>'+head+'：</b>'+body+'</p>';
      }).join('');
      wrap.appendChild(tv);
    }

    // 安全
    wrap.appendChild(App.h('h2',null,'⚠️ 安全注意'));
    var sf = App.h('ul','bullet');
    (d.safety||[]).forEach(function(s){ sf.innerHTML += '<li>'+s+'</li>'; });
    wrap.appendChild(sf);

    return wrap;
  }

  // Placeholder 顯示
  wrap.appendChild(App.h('h2',null,'🚧 本場完整教案籌備中'));
  wrap.appendChild(App.h('p',null,'本場（'+m.n+'）完整三步帶法、工作紙、出隊包將會喺後續版本補上。現階段可參考頂欄 📦 官方套包 PDF 相關程序。'));
  return wrap;
};

/* === 各分頁 render === */
App.pages = {};

App.pages.plan = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'📅 集會目錄'));
  wrap.appendChild(App.h('p','lede','跟住呢個目錄揀今日集會，撳場次名稱可以睇逐步帶領流程、物資清單、工作紙、家長通知。'));
  var table = App.h('table','meeting-table');
  table.innerHTML = '<thead><tr><th>場次</th><th>月份</th><th>主題</th><th>對應獎章</th><th>形式</th><th>狀態</th></tr></thead><tbody>' +
    DATA.meetings.map(function(m){
      var tag = m.placeholder ? '<span class="tag wip">🚧 規劃中</span>' : (m.full ? '<span class="tag ok">✓ 完整</span>' : '<span class="tag wip">🚧</span>');
      var spec = m.special ? '<span class="tag sp">特別</span>' : '';
      return '<tr><td>'+m.tid+'</td><td>'+m.month+'</td><td><a href="#plan/'+m.tid+'">'+m.n+'</a></td><td>'+m.badge+'</td><td>'+m.form+spec+'</td><td>'+tag+'</td></tr>';
    }).join('') + '</tbody>';
  wrap.appendChild(table);
  wrap.appendChild(App.h('h2',null,'🌟 特別集會／活動'));
  var ul = App.h('ul','bullet');
  DATA.specialEvents.forEach(function(e){
    ul.innerHTML += '<li><b>'+e.n+'</b>（'+e.month+'）— '+e.note+'</li>';
  });
  wrap.appendChild(ul);
  return wrap;
};

App.pages.ceremony = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🎪 集會儀式'));
  wrap.appendChild(App.h('p','lede','童軍團集會有固定儀式程序。以下 7 套儀式卡提供逐步程序、口令及安全注意；實際手勢、步操動作必須由熟悉正式程序之領袖現場示範。'));
  var ref = App.h('div','callout');
  ref.innerHTML = '📚 <b>參考文件：</b><ul class="bullet" style="margin:6px 0 0 18px;">' +
    CEREMONY.refs.map(function(r){return '<li><a href="'+r.url+'" target="_blank" rel="noopener">'+r.n+'</a></li>';}).join('') +
    '</ul>';
  wrap.appendChild(ref);
  CEREMONY.cards.forEach(function(c){
    var card = App.h('div','card ceremony-card');
    var stepsHtml = c.steps ? c.steps.map(function(s){return '<li><b>'+s.h+'</b>：'+s.d+'</li>';}).join('') : '';
    var typesHtml = c.types ? c.types.map(function(t){return '<li><b>'+t.t+'：</b>'+t.d+'</li>';}).join('') : '';
    var whenHtml = c.when ? '<p><b>時機：</b>'+c.when+'</p>' : '';
    var durHtml = c.duration ? ' <span class="tag">'+c.duration+'</span>' : '';
    var prepHtml = c.prep ? '<p><b>預備物資：</b>'+c.prep+'</p>' : '';
    var introHtml = c.intro ? '<p><b>動作要點：</b>'+c.intro+'</p>' : '';
    var safetyHtml = c.safety ? '<p class="safety"><b>⚠️ 注意：</b>'+c.safety+'</p>' : '';
    var whenSalute = c.when_to_salute ? '<p><b>使用場合：</b></p><ul class="bullet">'+c.when_to_salute.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>' : '';
    var noteHtml = c.note ? '<div class="callout warn">'+c.note+'</div>' : '';
    card.innerHTML = '<h3>'+c.icon+' '+c.n+durHtml+'</h3>'+whenHtml+prepHtml+introHtml +
      (stepsHtml ? '<ol class="steps">'+stepsHtml+'</ol>' : '') +
      (typesHtml ? '<ul class="bullet">'+typesHtml+'</ul>' : '') +
      whenSalute + safetyHtml + noteHtml;
    wrap.appendChild(card);
  });
  return wrap;
};

App.pages.uniform = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'👕 制服'));
  wrap.appendChild(App.h('p','lede','童軍支部、海童軍、空童軍男／女團員制服標準。下方圖片為 <b>香港童軍總會官網</b>官方圖片，內容以《儀容與制服手冊》為準。'));
  wrap.appendChild(App.h('div','callout','📚 <a href="'+UNIFORM.source.url+'" target="_blank" rel="noopener">儀容與制服手冊（官方網站）</a> ｜ <a href="'+UNIFORM.source.badgeGuide+'" target="_blank" rel="noopener">支部成員徽章佩戴指引（2023年第13號通告）</a>'));

  wrap.appendChild(App.h('h2',null,'基本制服式樣'));
  UNIFORM.types.forEach(function(t){
    var card = App.h('div','card uniform-card');
    var rows = t.items.map(function(i){return '<tr><th>'+i[0]+'</th><td>'+i[1]+'</td></tr>';}).join('');
    card.innerHTML =
      '<h3>'+t.name+'</h3>'+
      '<div class="uniform-split">'+
        '<a href="'+t.img+'" target="_blank" rel="noopener"><img src="'+t.img+'" alt="'+t.name+' 官方圖" loading="lazy" class="uniform-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';"></a>'+
        '<div class="uniform-img-fallback" style="display:none">⚠️ （圖片需上網載入；網址：'+t.img+'）</div>'+
        '<table class="uniform-table"><tbody>'+rows+'</tbody></table>'+
      '</div>';
    wrap.appendChild(card);
  });

  wrap.appendChild(App.h('h2',null,'徽章佩戴位置（按 2023 年第 13 號通告）'));
  var bpTable = App.h('table','meeting-table');
  bpTable.innerHTML = '<thead><tr><th>位置</th><th>徽章</th></tr></thead><tbody>' +
    UNIFORM.badgePositions.map(function(p){
      return '<tr><td>'+p.pos+'</td><td>'+p.items.join('、')+'</td></tr>';
    }).join('') + '</tbody>';
  wrap.appendChild(bpTable);

  wrap.appendChild(App.h('h2',null,'✅ 制服自查清單（每次集會前）'));
  var cl = App.h('ul','bullet');
  UNIFORM.checklist.forEach(function(x){ cl.innerHTML += '<li>'+x+'</li>'; });
  wrap.appendChild(cl);
  wrap.appendChild(App.h('p',null,'<i>'+UNIFORM.winter.note+'</i>'));
  wrap.appendChild(App.h('p','source-note','🖼️ '+UNIFORM.source.note));
  return wrap;
};

App.pages.book = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'📖 手冊'));
  wrap.appendChild(App.h('p','lede','新手領袖一本通：誓詞、規律、銘言、支部組織、考章程序、訓練班報名程序，都在呢度。'));

  wrap.appendChild(App.h('h2',null,'⚜️ 童軍誓詞'));
  var ol = App.h('ol','promise');
  DATA.facts.promise.forEach(function(l){ ol.innerHTML += '<li>'+l+'</li>'; });
  wrap.appendChild(ol);

  wrap.appendChild(App.h('h2',null,'📜 童軍規律'));
  var ul1 = App.h('ul','bullet');
  DATA.facts.law.forEach(function(l){ ul1.innerHTML += '<li>'+l+'</li>'; });
  wrap.appendChild(ul1);

  wrap.appendChild(App.h('h2',null,'🎯 童軍銘言'));
  var ul2 = App.h('ul','motto');
  DATA.facts.motto7.forEach(function(l){ ul2.innerHTML += '<li>'+l+'</li>'; });
  wrap.appendChild(ul2);

  wrap.appendChild(App.h('h2',null,'🏕️ 支部基本資料'));
  wrap.appendChild(App.h('p',null,'年齡：'+DATA.facts.age));
  wrap.appendChild(App.h('p',null,'教育目標：'+DATA.facts.goal));
  wrap.appendChild(App.h('p',null,'小隊制度：'+DATA.facts.patrol));

  wrap.appendChild(App.h('h2',null,'🎖️ 如何報考專科徽章（興趣組）'));
  var ol3 = App.h('ol','steps');
  INTERESTS.howToApply.steps.forEach(function(s){
    ol3.innerHTML += '<li><b>'+s.t+'</b>：'+s.d+'</li>';
  });
  wrap.appendChild(ol3);
  wrap.appendChild(App.h('p',null,'👉 報章系統入口：<a href="'+EXTERNAL.district+'" target="_blank" rel="noopener">'+EXTERNAL.district+'</a>（頂欄 📝 icon 一按即開）'));

  wrap.appendChild(App.h('h2',null,'📚 如何報考訓練班'));
  var ol4 = App.h('ol','steps');
  INTERESTS.howToApply.courseApply.steps.forEach(function(s){
    ol4.innerHTML += '<li><b>'+s.t+'</b>：'+s.d+'</li>';
  });
  wrap.appendChild(ol4);

  wrap.appendChild(App.h('h2',null,'📚 參考資料'));
  var ul3 = App.h('ul','bullet');
  ul3.innerHTML += '<li><a href="'+DATA.source.url+'" target="_blank" rel="noopener">《童軍訓練綱要》網上版（童軍支部）</a></li>';
  ul3.innerHTML += '<li><a href="'+EXTERNAL.officialPack+'" target="_blank" rel="noopener">官方集會套包 2026-09-01 版 PDF</a></li>';
  ul3.innerHTML += '<li><a href="'+EXTERNAL.badge+'" target="_blank" rel="noopener">童軍進度追蹤（外部 APP）</a></li>';
  ul3.innerHTML += '<li><a href="'+EXTERNAL.circulars+'" target="_blank" rel="noopener">通告圖書館</a></li>';
  wrap.appendChild(ul3);

  return wrap;
};

App.pages.print = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'✂️ 素材庫'));
  wrap.appendChild(App.h('p','lede','工作紙、歌紙、繩結卡、教材列印——即將推出。首版可以先用「🎖️ 興趣章」tab 查閱各興趣章要求。'));
  wrap.appendChild(App.h('div','callout','首版素材庫正在整理。工作紙將對應首 6 場會員章集會，每場一張 A4；歌書包含營火歌、團呼、國歌等。'));
  return wrap;
};

App.pages.play = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🎮 活動'));
  wrap.appendChild(App.h('p','lede','破冰、合作遊戲、課程活動、雨後備——即開即查即用。'));
  wrap.appendChild(App.h('h2',null,'常用遊戲'));
  DATA.games.forEach(function(g){
    var card = App.h('div','card');
    card.innerHTML = '<h3>'+g.n+' <span class="tag">'+g.cat+'</span> <span class="tag">'+g.minutes+'分鐘</span></h3>'+
      '<p><b>人數：</b>'+g.people+' &nbsp; <b>物資：</b>'+g.mats+'</p>'+
      '<p>'+g.desc+'</p>';
    wrap.appendChild(card);
  });
  wrap.appendChild(App.h('div','callout','更多遊戲、活動將在後續版本加入；c07 以後集會的活動會陸續補進來。'));
  return wrap;
};

App.pages.skills = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🪢 技能'));
  wrap.appendChild(App.h('p','lede','童軍核心技能：繩結、地圖指南針、營藝、急救、先鋒工程、追蹤、郊野守則——圖解卡即將推出。'));
  var skills = [
    {n:'繩結（10個）',d:'平結、八字結、雙套結、半結、反手結、稱人結、接繩結、繫木結、縮繩結、曳木結。'},
    {n:'收繩與繩索保養',d:'收繩方法、檢查繩索損耗、貯存環境。'},
    {n:'地圖與指南針',d:'習用圖例10種、十六方位、比例尺、北向、找地標。'},
    {n:'背囊收拾',d:'一日郊野／露營個人裝備、執包原則、輕重分佈。'},
    {n:'營藝',d:'帳篷、營燈、爐具、手鎚、小刀安全使用、保養露營物品。'},
    {n:'先鋒工程入門',d:'繩結應用、簡易紮作（框架、瞭望台、橋）。'},
    {n:'追蹤符號',d:'國際通用追蹤記號、路線標示。'},
    {n:'郊野守則',d:'不留痕、山火預防、天氣觀察、緊急撤離。'},
    {n:'急救 7 種',d:'流鼻血、燒傷、燙傷、抽筋、扭傷、割傷、刺傷。'}
  ];
  skills.forEach(function(s){
    var c = App.h('div','card');
    c.innerHTML = '<h3>'+s.n+'</h3><p>'+s.d+'</p><p class="wip-tag">⚠️ 圖解卡陸續補上</p>';
    wrap.appendChild(c);
  });
  return wrap;
};

App.pages.badges = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🎖️ 興趣章（興趣組專科徽章）'));
  wrap.appendChild(App.h('p','lede','童軍支部專科徽章分 4 組：興趣組（綠底，11-13 歲入門）、技能組（藍底，13-15 歲）、服務組（紅底）、教導組（金邊）。本 tab 只列出 <b>興趣組</b>，可由童軍團長直接安排考驗。其他組別詳情請看 <a href="'+EXTERNAL.badge+'" target="_blank" rel="noopener">🏅 童軍進度追蹤</a>。'));

  // Filter / category tabs
  var filt = App.h('div','filters');
  var btns = [{k:'all',n:'全部'}].concat(INTERESTS.categories.map(function(c){return {k:c.k,n:c.ic+' '+c.n};}));
  btns.forEach(function(b,i){
    var btn = App.h('button','filter-btn'+(i===0?' active':''),b.n);
    btn.setAttribute('data-cat',b.k);
    btn.onclick = function(){
      document.querySelectorAll('.filter-btn').forEach(function(x){x.classList.remove('active');});
      btn.classList.add('active');
      var cat = b.k;
      document.querySelectorAll('.badge-card').forEach(function(card){
        card.style.display = (cat==='all' || card.getAttribute('data-cat')===cat) ? '' : 'none';
      });
    };
    filt.appendChild(btn);
  });
  wrap.appendChild(filt);

  wrap.appendChild(App.h('p','source-note','📚 來源：'+INTERESTS.source.title+'（'+INTERESTS.source.version+'）｜<a href="#book">如何報考章／訓練班</a>｜<a href="'+EXTERNAL.district+'" target="_blank" rel="noopener">📝 前往區總部報章系統</a>'));

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

  // Cancelled badge note
  var cancel = App.h('div','callout warn');
  cancel.innerHTML = '⚠️ <b>已取消徽章（2026-08-15起生效）</b>：愛護動物章（興趣組）已取消，由新設「動物飼養章（興趣組）」及「愛護動物章（服務組）」取代；持有舊章者仍可佩戴至童軍身分完結。';
  wrap.appendChild(cancel);

  return wrap;
};

App.pages.patrol = function(){
  var wrap = App.h('div','page');
  wrap.appendChild(App.h('h1',null,'🧑‍🤝‍🧑 小隊'));
  wrap.appendChild(App.h('p','lede','小隊制度、小隊長職責、小隊會議、小隊歡呼、小隊計分、現場小工具——即將推出。'));
  var feats = [
    {n:'小隊制度說明',d:'小隊（Patrol）編制、小隊長／副小隊長／團隊長職責、小隊長會議。'},
    {n:'小隊會議記錄表',d:'可列印 A4，用於小隊會議記錄事項、分工。'},
    {n:'小隊歡呼庫',d:'收錄常用小隊歡呼口號及動作，可於比賽、營火會時帶領。'},
    {n:'小隊計分板',d:'現場即時計分，支援多小隊、多項目。'},
    {n:'現場小工具',d:'抽籤、集合訊號、倒數計時、隨機分組。'}
  ];
  feats.forEach(function(f){
    var c = App.h('div','card');
    c.innerHTML = '<h3>'+f.n+'</h3><p>'+f.d+'</p><p class="wip-tag">⚠️ 即將推出</p>';
    wrap.appendChild(c);
  });
  return wrap;
};
