/* ceremony.js — 童軍團集會儀式卡
 * 參考：官方 2026-09-01 集會套包程序表
 *      《隊列和升掛國旗及區旗指引》（2024）https://www.scout.org.hk/uploads/tc/circulars/16450/
 *      《童軍基本技能教材手冊》二.禮儀篇
 *      《步操手冊》DRILL MANUAL（香港童軍總會 2003 年 7 月第二版）— 立正/稍息/休息/轉法/抽膝/彈前腳/口令/步速步幅/致敬/旗操/集隊手號 全部照呢本
 * 注意：所有程序為文字指引；手勢、步操實際動作必須由熟悉正式程序之領袖現場示範。
 */

var CEREMONY = {};

CEREMONY.source = {
  title:'童軍團集會儀式及中式隊列基本動作',
  refs:[
    '《童軍基本技能教材手冊》二.禮儀篇',
    '《步操手冊》DRILL MANUAL（香港童軍總會 2003 年 7 月第二版・第2章施教步操／第3章立定步操／第4章快步步操／第5章慢步步操／第6章排列隊形／第7章旗操／第8章集隊手號／附錄甲口令表・戊檢閱須知）',
    '《隊列和升掛國旗及區旗指引》（2024年版）',
    '官方 2026-09-01 童軍團集會套包'
  ]
};

CEREMONY.cards = [
  {
    k:'open',
    n:'團集會儀式（開始）',
    icon:'🎌',
    fig:'open',
    figcap:'集隊場景（由隊員背後睇）：每小隊排一條直線・小隊長企本隊右前方・負責領袖面向全團・團旗喺隊列右翼。⚠️「右翼」以隊員面向領袖時嘅右手邊為準（呢張圖從後面睇，畫面右邊即啱邊）；小隊長位唔確定就展開下面平面圖解',
    rel:['c01'],
    duration:'約 5 分鐘',
    when:'每次集會開始，全體集合後進行',
    steps:[
      { h:'1. 集合', d:'小隊長集合各小隊成員，整齊排列成橫隊；小隊長站在小隊右前方。手冊術語：全隊要<strong>睇齊</strong>（Dressing）＝與兩旁及前後隊員排成直線；用作睇齊嗰一邊叫<strong>引導翼</strong>（Directing Flank），另一兩側叫<strong>側翼</strong>（Flank）；被委派企喺基準位畀其他人對齊嘅隊員叫<strong>標號員</strong>（Markers）。' },
      { h:'2. 負責領袖就位', d:'負責領袖（通常是團長或值班領袖）面向全團站立；持旗隊員持團旗立於右側。' },
      { h:'3. 升旗（如有安排）', d:'如當日安排升旗，於此時進行（見「升旗禮」儀式卡）。一般恆常集會可免。' },
      { h:'4. 團呼', d:'由領袖帶領進行童軍團呼（注意：童軍團呼與幼童軍 Grand Howl 不同，程序較簡潔；必須由熟悉程序之領袖帶領）。' },
      { h:'5. 宣佈及簡介', d:'領袖簡介今日集會主題、負責領袖分工、安全注意事項。' },
      { h:'6. 小隊時間', d:'小隊長帶領小隊進行小隊歡呼或小隊報到，之後開始當日第一節。' }
    ],
    types:[
      { t:'集隊手號（手冊第8章）', d:'手冊列出七款：直線・直線（由高至矮）・直行・闊橫排・窄橫排・馬蹄鐵形・開口正方形。⚠️ 手部動作喺圖中，我哋份電子檔嗰啲頁冇可讀文字 → <strong>動作照紙本核對先教</strong>，唔好憑呢檔自創手號。' },
      { t:'空行（手冊述語定義）', d:'人數不足唔好企埋一舊：排三排時留空「最左手邊數起第二行」嘅中排（或中排＋後排）；排兩排時留空「後排最左手邊數起第三行」。' },
      { t:'收窄排／開闊排', d:'排與排之間距離：收窄排 750 毫米（30 吋）、開闊排 1500 毫米（60 吋）；教原地敬禮用開闊排。' }
    ],
    safety:'必須先清場、點名、確認出口暢通；所有成員面向領袖及團旗；集隊時唔好令全隊面向太陽或當風位置（手冊第2章§2.1）。'
  },
  {
    k:'close',
    n:'團集會儀式（結束）',
    icon:'🏁',
    fig:'close',
    figcap:'場景示意：聽宣佈＋表揚→折旗→敬禮解散→逐個交返俾家長（未完成家長交接唔准走）；五步程序以上面文字為準',
    rel:['c01'],
    duration:'約 5 分鐘',
    when:'每次集會結束，收拾場地完成後進行',
    steps:[
      { h:'1. 集合', d:'收拾完畢後，小隊長再次集合各小隊。' },
      { h:'2. 宣佈事項', d:'領袖宣佈下次集會日期、時間、地點、需帶備物品、家長通知事項；特別事項（如訓練班、比賽、服務）於此時公佈。' },
      { h:'3. 感謝與回顧', d:'簡短回顧今日活動、表揚優異表現之小隊或成員。' },
      { h:'4. 降旗（如有升旗）', d:'如當日有升旗，於此時降旗（見「升旗禮」卡）。' },
      { h:'5. 禮成解散', d:'領袖下達解散口令，成員敬禮（或注目禮），回應「準備」；有序解散。' }
    ],
    safety:'未完成家長交接之成員不得自行離開；清場後再次確認沒有遺留物品、火種已熄滅。'
  },
  {
    k:'footdrill',
    n:'中式隊列基本動作',
    icon:'🎖️',
    fig:'drill',
    figcap:'三格要領：A 立正（側身：腳尖向外與中線成 30°・雙手握拳、拇指壓住食指貼褲骨）· B 童軍動作（從後面睇：右手疊左手、拇指扣緊）· C 齊步（步幅 750 毫米、快步步速每分鐘 116 步；圖只係一般行進姿勢，腳手次序照文字）——照住圖逐個示範，唔好淨係讀文字',
    rel:['c01','c02'],
    duration:'每次集會練 3–5 分鐘；初入團需 4–6 集會練熟',
    when:'小隊時間或課程中進行',
    intro:'童軍動作：提起左腳直至大腿和地面平衡、左小腿放鬆；用力將左腳向外踏下，雙腳距離約與肩膀同寬；同時雙手沿身體向後移，直至身後中央位置，立即由拳變為掌，並將右掌疊在左掌上，雙手拇指緊扣。（出處：官方套包 Week 1）',
    steps:[
      { h:'1. 立正〔手冊第3章§2〕', dgm:'attn', dgmc:'立正・抽膝・彈前腳（第3章§1–2）', d:'口令「<b>Alert！</b>」：兩腳掌平放地面、腳尖向外分開<strong>與中線成 30 度角</strong>（即兩腳尖之間約 60 度；舊版寫 45 度係錯）；雙膝蹬直；<strong>雙手握拳</strong>、手踭蹬直、母指指甲向前放喺食指上面、母指壓住褲骨；身體挺直、後顎繫貼衣領、眼望無限遠。⚠️ 手冊註明：Attention／Squad Shun／Parade Shun 動作跟立正一樣，但只適用於典禮、訓練班或其他制服團體，<strong>一般童軍集會不建議用</strong>——集會就嗌「立正（Alert）」。' },
      { h:'2. 稍息〔手冊第3章§2・圖7〕', dgm:'rest', dgmc:'稍息・休息・回立正（第3章§2）', d:'口令「Stand at — <b>ease</b>!」，打數「Out!」：提起左腳直至大腿與地面平行、左小腿放鬆，用力將左腳向外踏下；同一時間雙手沿身體向後移，直至身後中央，<b>立即由拳變為掌，右掌疊喺左掌上面，雙手拇指緊扣</b>。姿勢：腳掌平放、腳尖向外與中線成 30 度、<b>兩腳腳踭分開 305 毫米</b>（約肩寬）、雙膝蹬直、重心放喺兩腳之間、<b>所有手指同手踭都要蹬直</b>、頸至頭保持立正向前。⚠️ 唔係「左手握右手腕」（嗰個係中式跨立）——手冊版本同「童軍動作」係同一個手勢。手踭放鬆＝休息「Stand — easy!」（無打數）；回稍息喊「<b>Squad!</b>」；回立正「<b>Alert!</b>」打數「In!」。' },
      { h:'3. 休息〔手冊第3章§2・圖8〕', d:'口令「Stand — <b>easy</b>!」（無打數）：喺稍息嘅基礎上，淨係<strong>將雙手手踭自然放鬆</strong>，其餘身體部位不變。回到稍息：口令「<b>Squad</b>!」— 手踭用力拉緊蹬直。' },
      { h:'4. 轉姿勢嘅順序〔手冊第3章§2 注意〕', d:'由稍息轉立正：「<b>Alert</b>!」打數「In!」— 提起左腳至大腿平行、腳尖微微指向地下、用力踏返右腳旁；同一時間雙手<strong>由掌變拳</strong>沿身體向前移，直至母指去到褲骨。⚠️ <strong>唔准由立正直接轉休息</strong>，一定要先稍息；同樣唔准由休息直接轉立正。' },
      { h:'5. 抽膝踏步〔手冊第3章§1〕', d:'口令「Bend the left (right) knee!」：原地提高左（右）腳至<strong>大腿與地面平行</strong>，小腿放鬆；支撐腳腳掌平放、膝頭蹬直；雙手握拳緊貼褲骨，身體保持立正向前；然後盡快將腳踏回另一腳旁。' },
      { h:'6. 彈前腳〔手冊第3章§1〕', d:'口令「Shoot the right (left) foot forward!」：向前彈出<strong>半步（375 毫米）</strong>；支撐腳腳掌平放地面、前腳腳掌離地、雙膝蹬直、重心放支撐腳、身軀保持立正。兩步熟咗之後交替練：「Bend the left knee, shoot the right foot forward!」' },
      { h:'7. 原地向右／左／後轉＋斜轉〔手冊第3章§3–6〕', dgm:'turns', dgmc:'原地四轉・打數（第3章§3–6）', d:'口令「Turning, right (left, about) — <b>turn</b>!」，打數「<b>One — Two — Three — One</b>」（Two—Three 係停留時間，唔准郁）。① 微微提高右腳脚尖同左腳腳踭，以<strong>右腳踭＋左腳尖為軸</strong>，用頭、肩膊同身體嘅力向右轉 90 度（後轉轉 180 度、斜轉轉 45 度）；② 向前提高左膝至大腿與地面平行，盡快將左腳踏喺右腳旁。⚠️ 全程雙手緊貼身體兩旁；用標準停頓時距（每分鐘 40 個動作）連貫做。斜轉：「Inclining, right (left) — <b>incline</b>!」分部教學：「Turning by numbers, right turn — one!」（打數 One）做轉身，「Squad — two!」（打數 Two）做提膝併腳。' },
      { h:'8. 齊步——走／立——定〔中式＋手冊第2章§12〕', d:'預令「齊步」、動令「走」，聽動令後左腳先邁出，兩臂自然擺動；「立——定」預令「立」動令「定」，動令落於右腳，左腳再向前一步後右腳靠攏成立正。手冊數字：<strong>步幅快及慢步操 750 毫米</strong>（大跨步 830、短跨步 530、加快步 1000、橫移 305 毫米）；<strong>步速快步操每分鐘 116 步</strong>（新隊員可快至最多 140）、慢步操 65 步、加快 180 步。' },
      { h:'9. 原地向前敬禮〔手冊第3章§7・圖15–16〕', d:'口令「Saluting, salute to the front — <b>salute</b>!」，打數「<b>Up — Two — Three — Down</b>」。Up：右手向橫提升至<strong>與肩膊平</strong>，握成童軍敬禮手號，再用力將右前臂擺至食指喺右眼對上；姿勢＝雙腳平放、雙膝蹬直、<strong>左手握拳緊貼褲骨</strong>、右手前臂與指尖成一直線、頭向前望、<strong>右食指放喺右眼眼球中心對上 25 毫米（1 英吋）</strong>。Down：右手握拳用<strong>最短距離</strong>放回右邊褲骨。（手冊無寫「要接触帽沿」— 帽沿講法屬中式／單位慣例）' },
      { h:'10. 橫移〔手冊第3章§8〕', dgm:'sidepace', dgmc:'橫移・300mm・上限 8 步（第3章§8）', d:'口令「<b>One pace, left (right) close — march</b>!」，打數「One — Two」（多於一步時，每步完成後加一個「Up」，最後一步唔加）。動作：左腳向左橫移約 300 毫米，右腳不動；再提起右膝至大腿平行、踏返左腳旁。<strong>橫移不得多於 8 步</strong>。全隊打數「<b>One — Two — Up — One — Two ···</b>」——多於一步先加「Up」，<b>最後一步之後唔加</b>；向右橫移用「Right close — march!」，動作相反。' },
      { h:'11. 口令結構〔手冊第2章§7–9〕', d:'口令分三部分：<strong>介令</strong>（Move to the right in threes）→<strong>預令</strong>（Right）→<strong>動令</strong>（March）；有時毋須介令（Squad — halt）。時間：原地動作預令與動令之間停「標準停頓時距」＝<strong>1.5 秒（即每分鐘 40 個動作嘅一個動作）</strong>；快步行進由預令至動令唔好多於<strong>四步</strong>、慢步唔多於<strong>三步</strong>。' },
      { h:'12. 打數練習法〔手冊第2章§11〕', d:'初學一定用打數：全隊一邊做一邊叫數，叫「Two—Three」期間<strong>全身保持不動</strong>；每課開始先複習上課動作，純熟先教新動作。課節盡量喺一小時內完成，課與課之間 10 分鐘休息。' },
      { h:'13. 教具〔手冊第2章§3〕', d:'拍子機、鼓、步規。進行原地分部動作時鼓手企喺<strong>全隊後方</strong>跟打數打鼓；原地動作時可將拍子機預先校每分鐘 40 次放喺身旁地上（放到隊員聽唔到嘅距離）；步規用嚟量步幅同排與排距離——教練喺全隊最前位置打開示範，隊員熟咗之後不時喺隊後抽查。' },
      { h:'14. 隊形與位置〔手冊第2章§2.1〕', d:'教咩動作就用啱隊形：<strong>直行＝步操、半圓＝棍操／旗操、開闊排＋斜轉＝原地敬禮</strong>；列隊時唔好令全隊面向太陽或當風位置。' },
      { h:'15. 集合／解散／取消口令〔中式＋手冊〕', d:'「集隊——集合」／「解散」等口令及手號必須由領袖或小隊長下達，動作整齊（解散見手冊第6章§8）。想取消頭先個口令，用「<strong>As you were</strong>（取消口令）」：隊員即刻回復先前姿勢（手冊述語定義）。' }
    ],
    safety:'練習場地清空，地面平坦；穿合適鞋；口令由熟悉程序之領袖下達。⚠️ <b>手冊第2章§3.1(己)：步操可以用嚟提升水平，但無論如何唔准用作懲罰方式</b>——用步操罰人係違反手冊。'
  },
  {
    k:'flag',
    n:'升旗禮（國旗、區旗）',
    icon:'🇨🇳',
    fig:'flag',
    figcap:'場景示意（由全團後面睇）：中央旗桿較高掛國旗、側邊較矮掛區旗・旗手護旗立桿旁・全體面向旗桿。⚠️ 圖刻意唔畫帽／領巾（避免画錯制服）；手冊第2章§3(丙)、§6.3 係以「制服整唔整齊」為標準則（穿便服或制服不整齊 → 只肅立、不舉手敬禮），唔係以有冇戴帽為準。旗面只係色塊，實際國旗／區旗樣式以《隊列和升掛國旗及區旗指引》為準',
    rel:['c04'],
    duration:'約 5–8 分鐘',
    when:'特別集會、慶典、大會操及指定場合；一般恆常集會毋須每次升旗',
    prep:'直立旗桿、國旗及區旗（國旗在中央且高於區旗）、旗繩、廣播設備（國歌）；領袖熟悉程序及敬禮時機。',
    steps:[
      { h:'1. 全體肅立', d:'所有人員面向旗桿成立正姿勢。' },
      { h:'2. 旗手就位', d:'旗手及護旗隊員持旗在旗桿旁就位。' },
      { h:'3. 奏國歌', d:'播放國歌，國歌開始時同步揚旗、緩緩將旗升至頂部。' },
      { h:'4. 敬禮〔手冊第2章§3、§5.1〕', d:'奏國歌時，<strong>隊列中嘅童軍必須立正致敬</strong>；領隊（或單獨一人、脫隊時）需<strong>舉手敬禮</strong>。制服不整齊或穿便服時<strong>只肅立、不舉手敬禮</strong>（§3(丙)、§6.3）；行進間升旗由領隊發「MARCH TO ATTENTION！」再「EYES — RIGHT!／LEFT!」。保持肅立直至國歌完結、旗幟升至頂部。⚠️ 有地域／單位會另外要求「戴帽先行三指禮」，呢條屬單位慣例，唔係手冊條文 → 問你區總部跟邊個。' },
      { h:'5. 禮畢', d:'國歌完畢後聽口令「禮畢」，方可放手或轉動頭部。' },
      { h:'6. 降旗（儀式完結時）', d:'降旗同樣肅立敬禮，旗幟不得碰觸地面；降下後小心摺疊保管。' }
    ],
    note:'🚩 <strong>旗手動作（持旗立正・持旗稍息・攜旗・托旗・換手・讓旗幟飄揚・抓回旗幟・原地／行進間敬禮）已獨立成卡：</strong><a href="#ceremony/colour">旗操（12 節全本）</a>——升旗時旗手就照嗰張卡做。',
    safety:'注意事項：(1) 國歌奏唱時必須站立、肅穆、不可談話或走動；(2) 國旗永遠在較高及中央位置；(3) 旗幟破損或褪色不可使用；(4) 惡劣天氣（八號風球或以上、暴雨警告）不舉行戶外升旗；(5) 手冊第2章§5.1：行進間遇國旗、區旗及會旗都屬於要致敬嘅對象。'
  },
  {
    k:'oath',
    n:'宣誓儀式',
    icon:'🤲',
    fig:'oath',
    figcap:'宣誓站位：新成員與團長<strong>面對面</strong>，中間地下的空嘅——旗唔可以插喺二人之間；團旗喺新成員側後方由持旗者直立持住；團長無握手嗰隻手照立正要領<strong>握拳貼褲骨</strong>（唔係開掌、更唔係合十）；後排成員立正＝腳尖向外 30°・雙拳貼褲骨；家長前排坐見證、全團後方圍馬蹄。對應 c06 完整流程',
    rel:['c06'],
    duration:'約 10–15 分鐘',
    when:'新成員完成會員章所有項目後於特別集會（c06）進行',
    prep:'團旗、誓詞卡（每位新成員一份）、見證家長席位、相機、布章（會員章／旅巾）；資深成員持旗旁立。',
    steps:[
      { h:'1. 集合肅立', d:'全團整齊排列，新成員及其家長在前排。企喺後面嘅成員立正（腳尖向外與中線成 30 度、雙拳貼褲骨、眼望無限遠——手冊第3章§2）。' },
      { h:'2. 團長簡介', d:'團長說明宣誓之意義：成為童軍是對自己、對他人、對國家的承諾。' },
      { h:'3. 新成員出列', d:'新成員逐一步出至團旗前，面對團長及團旗。' },
      { h:'4. 舉手三指禮', d:'新成員舉起右手作童軍三指禮，左手按旗桿或置於胸前（由所屬旅團按傳統決定）。' },
      { h:'5. 跟讀誓詞', d:'團長讀一句，新成員跟讀一句：「我願以信譽為誓，竭盡所能；對神明，對國家，盡責任；對別人，要幫助；對規律，必遵行。」' },
      { h:'6. 佩戴旅巾及會員章', d:'團長或資深領袖為新成員佩戴旅巾及巾圈、頒發會員章。' },
      { h:'7. 歡呼及握手禮', d:'全團給予新成員歡呼；新成員以左手與團長及在場領袖行童軍左手握手禮。' },
      { h:'8. 家長見證', d:'家長可拍照留念；新成員歸隊。' }
    ],
    safety:'必須於新成員已完成會員章全部 11 項要求後才安排宣誓；誓詞原文必須準確，不可自創口號。'
  },
  {
    k:'salute',
    n:'童軍三指敬禮',
    icon:'✋',
    fig:'salute',
    figcap:'兩格分別淨係高度：左＝全禮指尖齊右眉／帽沿，右＝半禮手齊肩（離肩一拳、手心向下）。👉 要數手指就照右格：三條伸直並攏、小指收起、拇指壓住（左格角度會遮到無名指）。兩個動作都要領袖逐個執手，睇圖唔夠',
    rel:['c04'],
    duration:'練習 3–5 分鐘',
    when:'課程或每次集會小隊時間練習',
    types:[
      { t:'全禮（大禮）〔手冊第3章§7〕', dgm:'salute3', dgmc:'原地向前敬禮・Up—Two—Three—Down（第3章§7）', d:'右手先<strong>向橫提升至與肩膊平</strong>，握成童軍敬禮手號，再用力將右前臂擺至食指對上眼：官方準則係<strong>右食指放喺右眼眼球中心對上 25 毫米（1 英吋）</strong>；食指、中指、無名指並攏伸直，拇指壓住小指，手心向前略向下；左手握拳緊貼褲骨，頭向前望。打數「Up — Two — Three — Down」，Down 時用<strong>最短距離</strong>握拳放回右邊褲骨。（「指尖接觸帽沿或眉梢」屬中式禮節講法 — 教嘅時候講清邊個場合跟邊個。）適用於升旗、國歌、宣誓、見長官、正式典禮。' },
      { t:'半禮', d:'手停於肩高，約離肩膀一拳距離，手心向下；食指對齊約右眼對上 2 厘米位置；一般場合向上級或長官問候時使用。' },
      { t:'握手禮', d:'用左手握手，是童軍獨有之禮儀；代表信任——右手空出可幫忙他人。' },
      { t:'注目禮', d:'面向受禮者立正，目迎目送，頭部左右轉動不超過 45 度；適用未戴帽、持旗、或隊列中不便舉手時。行進間隊員就係行注目禮（手冊第2章§5.1）。' },
      { t:'誰來舉手〔手冊§6.1／§6.2〕', d:'兩人以上需要致敬時，由<strong>一名領袖或領隊</strong>負責舉手敬禮，其餘童軍立正；若冇領袖或領隊在場，就由<strong>全隊最右方嘅一名隊員</strong>舉手，其他人立正。' },
      { t:'唔舉手嘅情況〔手冊§3(丙)／§6.3〕', d:'奏國歌時穿便服 → 只須肅立；制服不整齊時 → 只須立正，<strong>不須舉手敬禮</strong>（寧可不舉手，唔好穿住唔整齊嘅制服舉手）。' },
      { t:'行進間致敬〔手冊§5.1〕', d:'領隊先發「MARCH TO ATTENTION！」，全隊準備；再發「EYES — RIGHT！」或「EYES — LEFT！」，同時領隊自己舉手敬禮，其他同行領袖亦須舉手。' }
    ],
    when_to_salute:[
      '唱國歌、升國旗／區旗時（制服整齊先舉手；隊列中童軍立正致敬）',
      '宣誓儀式（行全禮）',
      '團呼時（按正式程序）',
      '遇見團長、區總監、總監等高級領袖時',
      '喪禮、追悼會等肅穆場合',
      '頒獎、晉團、見證等正式場合',
      '典禮中<strong>必須</strong>致敬嘅對象（手冊§2.1）：國家領導人及其代表・行政長官及其代表・總領袖及香港總監及其代表・主禮嘉賓',
      '行進間遇國旗、區旗及會旗（手冊§5.1(丁)）',
      '葬禮：童軍行過靈柩時須向靈柩敬禮，隊伍遵照總司令員指示（手冊§4.1）'
    ],
    note:'⚠️ 手冊§5：每隊或每團<strong>每日只需向同一位童軍人士致敬一次</strong>——唔使一日到黑舉手；§2.2 普通場合遇上其他童軍人士（不論職級）致敬係表示尊重，唔係禮節評分。',
    safety:'三指代表誓詞三部分（對神明國家／對別人／對規律）；拇指壓小指代表「以大助小」。手冊§1.1：舉手敬禮係向受禮人表示善意、忠心及信任——教嘅時候講返意義，唔好做成人體機械動作。動作必須由領袖示範，不單靠文字。'
  },
  {
    k:'howl',
    n:'童軍團呼（待核）',
    icon:'🐺',
    duration:'約 1–2 分鐘',
    when:'正式開始及結束儀式',
    note:'⚠️ 童軍團呼程序與幼童軍 Grand Howl 不同。本卡文字仍待核對《儀容與制服手冊》及《童軍基本技能教材手冊》第五章正式程序後補上；現階段請由熟悉程序之領袖帶領。摺旗／繫旗、隊長就職、晉團儀式亦待官方示範核對後補。'
  },
  {
    k:'march',
    n:'快步行進／慢步行進',
    icon:'🥾',
    dgm:'march',
    figcap:'行進間動作嘅口令、動令落腳時間同打數（手繪圖解）',
    rel:['c08'],
    duration:'每次 5–10 分鐘；一個動作練一課',
    when:'步操時段、會操排練、大會操前',
    intro:'教初學一定要用「分部動作」：司令員逐個 Squad One／Two／Three… 分開喊，熟咗先連實做完整動作（手冊每一節都係呢個格式）。',
    steps:[
      { h:'1. 快步開步〔第4章§1〕', dgm:'qmarch', dgmc:'快步開步・三個分部（第4章§1／第5章§1）', d:'多於一排：「By the (right / left), QUICK — MARCH!」；面向前／後方：「Squad will advance (retire), by the (right / left), quick — march!」；只有一排：「Step off together, quick — march!」。打數 Left — Right — Left；每步 750 毫米、<strong>每分鐘 116 步</strong>；腳踭先著地，前面隻手提升至與肩膊平、後面隻手盡量拉後。開步口令分三種：多於一排「By the left (right), quick — march!」；面向前／後「Squad will advance (retire), by the left, quick — march!」；一排「Step off together, quick — march!」——<b>「march」呢個動令喺右腳腳踭著地時發出</b>。' },
      { h:'2. 快步停步〔第4章§2〕', dgm:'qhalt', dgmc:'快步停步・Freeze—One—Two（第4章§2）', d:'「Squad — HALT!」打數 One — Two；動令喺<strong>左腳腳踭著地</strong>時發出。順序：右腳行前一步 750mm → 左腳行前半步 375mm → 提起右腳至大腿與地面平行、同一時間雙手用力夾回褲骨 → 踏下右腳喺左腳旁。後面兩個分部要用<strong>雙倍速度</strong>完成。' },
      { h:'3. 行進間向左／右轉〔第4章§3–4〕', dgm:'marchturn', dgmc:'行進間轉向・四个分部（第4章§3–4）', d:'「Turning, left (right) — TURN!」打數 <strong>Check — Down</strong>。四個分部：① 行前一步 750mm（右手前、左手後）② 提起另一腳至大腿平行、雙手夾回褲骨 ③ 以支撐腳腳踭為軸、用頭肩身嘅力轉 90 度，踏落嗰隻腳並立即向前伸出半步 375mm ④ 繼續完成一步再向前操。慢步版打數係 Freeze — Two — Three — Forward。' },
      { h:'4. 行進間向後轉〔第4章§5〕', dgm:'marchabout', dgmc:'行進間向後轉・In—Left—Right—Left—Forward（第4章§5）', d:'「Turning, about — <b>TURN!</b>」打數 <b>In — Left — Right — Left — Forward</b>。①「In」：左腳行前一步 750mm，右腳再行一小步 <b>150mm</b> 將右腳踭貼紧左腳腳掌內側，同時雙手夾回褲骨；②「Left」提左膝、以右腳踭為軸向右轉 90 度；③「Right」提右腳、以左腳踭為軸再轉 90 度；④「Left」踏回；⑤「Forward」右腳行前 750mm 繼續操。⚠️ 係<b>兩次 90 度</b>，唔准一腳掃過去；初學可將①②合併做（打數 In — Left）。動令喺右腳腳踭著地時發出。' },
    { h:'5. 行進間換步〔第4章§6〕', dgm:'changestep', dgmc:'行進間換步・右腳踏喺左腳踭後（第4章§6）', d:'「Changing step, <b>CHANGE — STEP!</b>」打數 Left — Right — Left：①「Left」左腳行前一步 750mm；②「Right」右腳提高至大腿與地面平行、雙手夾回褲骨，然後<b>踏下喺左腳腳踭後</b>（腳掌內側緊貼左腳踭）；③「Left」左腳再行前 750mm 繼續操。後兩步要用<b>雙倍速度</b>完成；「Change」喺左腳腳踭著地時喊、「Step」喺右腳腳踭著地時喊。手冊註：可以左右相反做，打數就改為 Right — Left — Right。' },
    
      { h:'6. 原地踏步〔第4章§10／第5章§7〕', d:'由立正開始：「Quick mark — TIME!」（慢步：「MARK — TIME!」）打數 Left — Right — Left；左右腳交替提至大腿與地面平行、小腿放鬆、<strong>雙手握拳緊貼褲骨</strong>；快步 116 步/分鐘、慢步 65 步/分鐘。行進間轉踏步：「Mark — time!」（先做快步行進間向後轉嘅第一分部，再轉踏步）。踏步轉停步「Squad — halt!」；踏步繼續前行「FORWARD!」。' },
      { h:'7. 慢步操〔第5章§1–2〕', d:'「By the left (right, centre), SLOW — MARCH!」— <strong>每分鐘 65 步</strong>，步幅同快步（750mm）；第一步行到 375mm 時要稍作停頓以配合時間。停步同樣「Squad — halt!」打數 One — Two（動令喺左腳經過右腳之時）。慢步行進間向後轉打數 One Stop — Two Stop — Three Stop — Forward。分部教學（by balance step）：①「Left foot — <b>half pace — forward</b>」左腳行前半步 375mm（腳掌向外側斜向離地、脚尖向下）；②「Left foot — <b>forward</b>!」先完成 750mm（腳掌外側先著地）；③右腳同樣，行到 375mm 時稍作停頓配合 65 步/分鐘。' },
      { h:'8. 快步↔慢步轉換〔第5章§8〕', d:'轉慢步：「Break into slow time, SLOW — MARCH!」（動令喺右腳腳踭著地）。轉快步：「Break into quick time, QUICK — MARCH!」—「Break／into／quick／time」逐個喺腳外側著地時喊，喊完再向前操四步先喊「quick」，再行前一步喊「march」。' },
      { h:'9. 行進間向右／左敬禮〔第4章§7–8〕', d:'「Saluting, salute to the right (left) — SALUTE!」打數 <strong>Up — Two — Three — Four — Five — Down — Swing</strong>。Up：行前兩步後，右手向橫提升至與肩平 → 握成童軍敬禮手號 → 前臂擺至食指喺右眼對上 25mm，同時頭轉 90 度（三件事要同一時間完成，左手握拳留喺左邊褲骨）；Two—Five：保持姿勢用快步操四步；Down：頭用力轉回向前＋右手握拳以最短距離放回褲骨；Swing：繼續向前操。' },
      { h:'10. 行進間向前敬禮〔第4章§9〕', d:'「Saluting, salute to the front — SALUTE!」— 先行進間停步，再以標準停頓時距做<strong>兩次</strong>原地向前敬禮，跟住原地向後轉，最後向前操。手冊註明：呢個動作係<strong>模擬領取證書、獎章及獎項</strong>嘅形式（兩次敬禮之間就係頒獎時間）；打數「Two — Three」期間唔准做任何動作。' },
      { h:'11. 行進間注目禮〔第6章§10〕', d:'隊員<strong>唔使舉手</strong>，淨係轉頭：慢步「Eyes — RIGHT (LEFT)!」打數 <strong>Up</strong>，動令喺<strong>右腳腳外側著地</strong>；聽「Right」後繼續操一步，至左腳腳掌著地時將頭轉向右（左）90 度，身體其餘部分保持慢步行進間姿勢。回復「Eyes — FRONT!」打數 Down（同樣喺右腳腳外側著地時喊）。<strong>快步版</strong>：打數 Check — Up、動令喺<strong>左腳腳踭著地</strong>，聽完繼續操<strong>兩步</strong>至左腳踭著地時先轉頭；回復用 Check — Down。⚠️ 必須喺列隊期間進行；<strong>最右（左）前方嗰名隊員唔使轉頭</strong>（佢就係基準）。' },
      { h:'12. 斜轉與轉彎〔第6章§9〕', d:'斜轉「Diagonal march, left (right) — INCLINE!」打數 Down!（慢步）／Check — Down!（快步）— 同行進間轉向一樣，但角度係 <strong>45 度</strong>；斜行時格外注意睇齊。轉彎「Right (Left) — WHEEL!」：隊形<strong>不得超過 6 排</strong>、面向左或右；翼側最前嘅隊員收到口令後以<strong>半徑 600 毫米</strong>喺 4 步內完成 90 度轉向，其後同排隊員按距離跟住轉。' }
    ],
    safety:'行進間敬禮必須係單行，或排三排時<strong>已排成開闊排</strong>（手冊兩處都寫明）；練習前清場、留夠直線距離；新隊員步速可放快至最多 140 步/分鐘，唔好為咗整齊拖到無節拍。',
    note:'⚠️ 步操唔准用嚟做懲罰（第2章§3.1(己)）；練習位置唔准面向太陽或當風（§2.1）。'
  },
  {
    k:'fallin',
    n:'集隊手號・睇齊・解散',
    icon:'🖐️',
    dgm:'handsign',
    figcap:'《步操手冊》第8章七款集隊手號（司令員手部姿勢）— 手繪圖解，唔靠 AI 生成',
    rel:['c01','c08'],
    duration:'集隊 1 分鐘；手號練習 5 分鐘',
    when:'每次集會集隊、小隊時間、會操排練',
    intro:'童軍有獨有的集隊手號：司令員先立正 → 發出口令（例如「Scout / Troop, FALL-IN!」）→ 立即用雙手做手號，全團就排成所需隊形。',
    steps:[
      { h:'1. 距離同跟手動作〔第8章概言〕', d:'司令員與最前排隊員相距 <strong>2250 毫米（90 英吋）</strong>。隊排好之後大家<strong>仍要保持立正</strong>，直至司令員<strong>放下雙手</strong>，先一次過由立正轉為稍息。' },
      { h:'2. 直線 Line〔§1〕', d:'兩手握拳向身旁<strong>兩側平提升</strong>至兩手與肩膀成一直線。各分隊喺司令員前 2250mm 排成一直線；企喺正中央嘅隊員面對司令員；每名隊員相距 <strong>750mm</strong>，隊與隊之間 <strong>1500mm</strong>。' },
      { h:'3. 直線（由高至矮）〔§2〕', d:'左（右）手握拳喺面前舉起，前臂與上臂成 <strong>90 度</strong>、手背向前；另一手握拳向側平提升至與肩齊。最高嘅隊員面對司令員，其餘按高矮次序排喺其右（左）方，相距 750mm。' },
      { h:'4. 直行 Columns〔§3〕', d:'兩手握拳<strong>向前</strong>提升至與肩齊、<strong>手背向天</strong>。以隊為單位排成直行：隊長喺隊員前方、副隊長最後，前後相距 750mm；第二隊喺第一隊<strong>左方</strong>，隊與隊 750mm；整隊中央前方位置對齊司令員。' },
      { h:'5. 闊橫排 Open Order〔§4〕', d:'兩手握拳向左右平提升至與肩齊，<strong>前臂向上彎 90 度、手背向外</strong>。第一隊橫排每人左右 750mm（隊長喺全隊右方、副隊長最左）；第二隊喺第一隊<strong>後方 1500mm</strong>。' },
      { h:'6. 窄橫排 Close Order〔§5〕', d:'兩手握拳向前提升至與肩齊，<strong>前臂向上彎 90 度、手背向前</strong>。第一隊橫排 750mm；第二隊喺後方 <strong>750mm</strong>。' },
      { h:'7. 馬蹄鐵形 Horse Shoe〔§6〕', d:'雙手<strong>蹬直向前（連手掌）</strong>，<strong>左手腕疊喺右手腕上</strong>、手背向前。以隊為單位排 U 形，隊長喺右、副隊長喺左，所有隊員面向內；左右 750mm、隊間約 1500mm。' },
      { h:'8. 開口正方形 Open Square〔§7〕', d:'雙手手掌互相緊握，<strong>右手手背向前，高舉喺頭頂上</strong>。以隊為單位排開口正方形，面向內；750mm、隊間約 1500mm。' },
      { h:'9. 集隊成三排〔第6章§1〕', d:'「Squad, FALL — IN!」— 用快步操去自己位置：最先到嘅企 <strong>F1（右標號員）</strong>，跟住 C1、R1、F2… 依次向左伸延；到咗位置先<strong>面向司令員</strong>，隨即由立正轉稍息。' },
      { h:'10. 報數／排高矮〔第6章§2〕', d:'「From the right — NUMBER!」由右至左報數，報數時頭同眼唔准郁；<strong>最後一位除咗號碼之外要加喊 Sir!／Madam!</strong>；中排同後排唔使報，跟返前排嘅號數。排高矮：「Sizing, tallest on the right, shortest on the left, in single rank — SIZE!」→「Stand fast the right hand man, remainders right — TURN!」→「Form three ranks, quick — MARCH!」。四種排列法以「高嘅喺兩邊、矮嘅喺中央」最常用。' },
      { h:'11. 空行（人唔啱數）〔第6章§1〕', d:'「BLANK — FILE!」打數 One — Two — Up — One — Two。例：排五行欠一名 → 企 R4 嘅隊員向左橫移兩步，佢橫移第一步（喊 Up）之後，C4 隊員向後移一步，兩人要同時到定位。原則：留空<strong>最左手邊數起第二行</strong>嘅中排（或中排＋後排）。' },
      { h:'12. 睇齊〔第6章§4〕', d:'「Dressing, right — DRESS!」打數 <strong>Up — Two — Three — Move</strong>：除右標號員外，前排右手握拳<strong>向橫</strong>提升至與肩平（手背向天）、頭轉右 90 度；最右行嘅中排及後排右手<strong>向前</strong>提升；再用碎步移到與右邊隊員得<strong>一隻手位</strong>。完成後「EYES — FRONT!」打數 Down — 右手放回右邊褲骨、頭轉回向前。熟咗之後唔使起手，淨係轉頭。兩排版：「Dressing, in two ranks, right — dress!」前排右手<strong>叉腰</strong>（手背向天、手放喺皮帶對上），行與行相隔 <strong>375mm</strong>、排與排 1500mm。' },
      { h:'13. 開闊排／收窄排〔第6章§5〕', d:'開闊排「Dressing, in open order, right — DRESS!」：前排行前一步 750mm、中排唔郁、後排行後一步 750mm → 排與排 1500mm（前排腳踭對後排腳尖）。收窄排「Dressing, in close order, right — DRESS!」：前排向後、後排向前 → 排與排 750mm。行進間版本：「Marching in open (close) — ORDER!」— 前排斜操四步、後排反方向斜操四步、中排照行。' },
      { h:'14. 轉變隊形方向／成單行〔第6章§6–7〕', d:'「Change direction right, at the halt, right — FORM!」→「SLOW — MARCH!」：第一排最右嘅隊員原地向右轉再操五步停步，第一排其他隊員向右 45 度斜行返自己位置，其他人以「行（file）」形式操返定位，全程同右鄰保持合適距離。三排轉單行：「Front rank, quick — march!」→「Centre rank, quick — march!」（動令喺前排最後一名經過中排最前時發）→「Rear rank, quick — march!」；回三排「Reform three ranks on the front rank, centre and rear ranks, quick — march!」。' },
      { h:'15. 解散〔第6章§8〕', d:'暫時性（要致敬）：「Turn to the right, and salute, FALL — OUT!」；暫時性（唔使致敬）：「Turn to the right, do not salute, FALL — OUT!」；正式解散：「Turn to the right, and salute, DISMISS!」— 打數 One—Two—Three—One—Two—Three—Up—Two—Three—Down—Two—Three—Left—Right—Left：向右轉 →（原地向前敬禮）→ 向前操三步 → 自行解散。⚠️ 隊形必須係<strong>開闊排或單行、面向前方</strong>（Squad will advance）。' }
    ],
    types:[
      { t:'小隊位置〔第8章〕', d:'幼童軍團及童軍團以小隊為基本單位：<strong>小隊長喺所有隊員最右方，副隊長喺最左</strong>；排直行時小隊長最前、副隊長最後。隊員次序按各團習慣（入團先後或高矮）。深資童軍團／樂行童軍團無小隊制，按傳統習慣（活動小組、高矮或入團先後）。' },
      { t:'標號員／引導翼〔第6章§1〕', d:'F1 係<strong>右標號員</strong>（Right marker），最左邊係左標號員；全隊用<strong>引導翼</strong>（Directing Flank）嗰邊嚟睇齊。前後排名稱：前排 Front rank、中排 Centre rank、後排 Rear rank；「行」叫 File。' },
      { t:'口令與動令時間表', d:'介令／預令／動令、每個動作嘅動令落邊隻腳、全隊打數 —— 已全部併入 <a href="#ceremony/commands">口令與動令時間表</a> 卡（照手冊附錄甲＋乙）。' }
    ],
    safety:'戶外集隊時司令員要企喺整隊中央前方對齊；場地細可以按比例縮短距離，但每人 750mm 呢個位唔好慳；做手號之前自己一定要先立正。',
    note:'⚠️ 上面七款手號係《步操手冊》第8章嘅官方手號。我哋之前寫嘅「橫排＝單臂平伸、馬蹄＝雙手舉過頭頂成弧形」等屬自創，已撤銷 — 教小隊長之前請照呢頁再對手冊圖 131–144。'
  },
  {
    k:'parade',
    n:'會操／檢閱須知',
    icon:'🎖️',
    rel:['c08'],
    duration:'視乎規模；排練至少 2 節',
    when:'大會操、就職典禮、頒獎禮、訓練班結業、區級檢閱',
    intro:'手冊第1章§4：會操分兩類 — <strong>檢閱會操（Muster Parade）</strong>適用於大型場合點算人數、安排人手、公佈事項；<strong>結業會操（Passing Out Parade）</strong>適用於大型典禮（大會操、就職典禮、頒獎禮及訓練結業），有兩種型式，按實際情況揀。',
    steps:[
      { h:'1. 五條一般指引〔第1章§4.2〕', d:'① 會操之前必須先<strong>檢閱</strong>參加嘅童軍成員；② 不論領袖或童軍，進入或離開會場必須先<strong>向總司令員報告並得其同意</strong>；③ 唔係參加步操嘅童軍<strong>唔准橫越會場</strong>；④ 總司令員同籌備步操者必須事前慎密策劃整個步操形式；⑤ 會操結束時參加者須<strong>向總司令員致敬</strong>。' },
      { h:'2. 結業會操次序〔附錄丁摘要〕', d:'GET ON PARADE → march on（BY THE LEFT/RIGHT, QUICK — MARCH）→ SQUAD — HALT → PARADE WILL ADVANCE LEFT/RIGHT — TURN → DRESSING, RIGHT — DRESS → EYES — FRONT → FORM TWO RANKS → dress → STAND AT — EASE →（副司令員等司令員到場並移交會操）→ PARADE — SHUN → GENERAL SALUTE — SALUTE → 報告「Sir, XX, XX persons are forming up ready for your inspection please」「Sir, permission to carry on please」→ FORM THREE RANKS → dress → MOVE TO THE RIGHT IN THREES, RIGHT — TURN → MARCH PAST, BY THE LEFT — QUICK MARCH → 各小隊 LEFT — WHEEL／BY THE RIGHT, EYES — RIGHT → EYES — FRONT → 收隊：DRESSING, IN CLOSE ORDER, RIGHT — DRESS → 請求准離場「Sir, May I have your permission to march off, please」→ IN COLUMN OF ROUTES, RIGHT — TURN → MARCH OFF, BY THE LEFT, QUICK — MARCH。⚠️ 全長 47 步，邊個喊、做完啲咩都照手冊附錄丁逐項執行；呢度淨係順序提示。' },
      { h:'3. 檢閱會操程序〔附錄丙 12 步〕', d:'<strong>RIGHT — MARKER</strong>（各右標號員喺喊「Right」時稍息、喊「Marker」時立正，跟住操 14 步、halt (one,two)）→ <strong>MARKER OUTWARD — TURN</strong>（用規定停頓向右轉，向第一個右標號員睇齊）→ <strong>MARKER — STEADY</strong>（向左轉回稍息）→ <strong>GET ON — PARADE</strong>（全隊立正，標號員除外，操 14 步停）→ <strong>PARADE, IN OPEN ORDER, RIGHT — DRESS</strong>（全隊向右注目；Extra Right Marker 向右操 4 步、停、向後轉檢查睇齊）→ <strong>STAND STILL, THE FRONT RANK</strong>（前排唔郁；Extra Right Marker 向左轉、慢步操 2 步、停、向右轉檢查前排）→ <strong>STAND STILL, THE CENTRE RANK</strong>（同上查中排）→ <strong>STAND STILL, THE REAR RANK</strong>（查後排）→ <strong>PARADE, EYES — FRONT</strong>（操 4 步、停、向右轉、以左邊睇齊、eyes front）→ <strong>CALL THE ROLL</strong>（各小隊長報告出席人數）→ <strong>PARADE, STAND AT — EASE</strong>（等受閱者到場之訊號）→ <strong>PARADE — SHUN</strong>（司令員向後轉，操到檢閱位置）。' },
      { h:'4. 結業會操有兩號，要揀返邊號〔附錄丁〕', d:'兩號前半大致相同（march on → advance → dress → form two ranks → 交接 → SHUN → GENERAL SALUTE → 報告 → form three ranks → march past → wheel／eyes right）。分別喺收隊段：<strong>第一號</strong>用「TURNING, MOVE TO THE LEFT IN THREES, LEFT — TURN → ON THE LEFT FORM — SQUAD → FORWARD → TURNING, SQUAD WILL MOVE TO THE LEFT, LEFT — TURN → SQUAD — HALT」；<strong>第二號</strong>係「TURNING, MOVE TO THE RIGHT IN THREES, RIGHT — TURN → BY THE LEFT, LEFT — WHEEL（連續三次 LEFT — WHEEL）→ SQUAD — HALT」。揀咗邊號就成場跟返邊號，唔好溝住用。' },
      { h:'5. 步操之前要check嘅嘢〔附錄戊§1–2〕', d:'必須先檢閱參加步操嘅隊伍，確保：正確穿著制服；帽、帽徽、皮具、衣服、鞋及襪保養良好及整潔；儀容整潔及精神飽滿。<strong>檢閱進行時所有受檢閱嘅隊伍必須立正</strong>。' },
      { h:'6. 檢閱時檢查項目〔附錄戊§3–11〕', d:'先查「有冇正確立正」「有冇睇齊並整齊排列」；到達每一名隊員前面要<strong>盡快</strong>檢查。細節：頭部（帽整潔正確佩帶／帽徽位置正確潔亮／頭髮整齊長度適中）、上身（衣領整潔／領巾或領呔正確／上衣稱身整齊已熨／<strong>衣袋唔准隆起</strong>／徽章勳章位置正確潔亮／鈕扣全扣唔准露線頭）、皮帶（合身唔寬唔緊／皮帶扣喺身前正中／潔亮扣好）、褲或裙褲（前後熨骨、稱身、扣好鈕扣拉鏈）、裙（熨好、稱身）、襪（合乎本團顏色、長度恰當、拉直無扭曲）、鞋（潔亮、鞋帶綁緊唔易鬆脫）。' },
      { h:'7. 檢閱員唔准做〔附錄戊§12〕', d:'唔准：與隊員爭吵；<strong>用手接觸隊員身體任何部分</strong>；取笑或羞辱個別隊員；企喺某一名隊員前面太耐；讓陪同檢閱嘅人去檢閱隊員；含糊咁指出錯處。' },
      { h:'8. 檢閱員必須做〔附錄戊§13〕', d:'必須：作風一致、唔准針對個別隊員；清楚向陪同嘅領袖或隊長講明要佢做啲咩；值得稱讚時就稱讚。' }
    ],
    safety:'會操前確認場地、集合線、受禮者位置同退場路線；行進間敬禮（EYES — RIGHT）要先排成開闊排；八號風球或以上或暴雨警告唔舉行戶外會操。',
    note:'呢張卡係俾領袖睇次序用；真正帶會操時，「邊個喊、喊咩、做完啲咩」全部照手冊附錄丙／丁張表逐項執行（呢度已錄咗檢閱會操 12 步＋結業會操兩號嘅分別）。'
  },
  {
    k:'colour',
    n:'旗操（持旗・攜旗・托旗・敬禮）',
    icon:'🚩',
    dgm:'colour',
    figcap:'旗手四式側面姿勢圖解：持旗立正／攜旗／托旗／原地敬禮（竿角同手位係重點）',
    rel:['c01','c08'],
    duration:'旗手專練 10–15 分鐘',
    when:'有團旗／隊旗嘅儀式、升旗禮、會操、頒獎禮前排練',
    intro:'《步操手冊》第7章：<strong>旗操係同步行操進行嘅，所以口令完全跟步操嗰套</strong>（介令／預令／動令、動令落腳時間見「口令與動令時間」卡）。旗手要識嘅就係下面 12 節，我哋全部照手冊寫齊。',
    steps:[
      { h:'1. 持旗立正 The Order〔§2〕', d:'<strong>右手緊握旗竿及旗嘅外端下角</strong>；旗竿保持<strong>與地面垂直</strong>，竿底放喺<strong>右腳尾趾旁</strong>；右手手踭微曲並緊貼身軀；身體其他部分保持立正向前。⚠️ <strong>唔准將旗向下拉緊</strong>——容許旗自然掛喺旗竿上。' },
      { h:'2. 持旗稍息〔§3〕', d:'提起左腳直至大腿與地面平行，然後向左踏下，<strong>兩腳腳踭距離 300 毫米（12 英吋）</strong>；右手維持握旗竿及旗外端下角、竿垂直、竿底喺右腳尾趾旁；<strong>左手握拳蹬直、拇指緊貼褲骨</strong>；身體其他部分挺直向前。（同樣唔准拉緊旗）' },
      { h:'3. 持旗立正 → 攜旗 The Carry〔§4〕', d:'甲：<strong>右手把竿向上提升</strong>至身體正前方中央、竿底對準旗套（提升期間竿要一直保持垂直），右手前臂緊貼旗竿，左手緊握旗套及竿底。乙：<strong>盡快將旗竿插入旗套</strong>；同一時間左手擺回身旁、<strong>右前臂提升至與地面平行</strong>、右手握竿放喺<strong>口部對出</strong>嘅位置、右手背向前、手腕與前臂成一直線。' },
      { h:'4. 攜旗 → 托旗 The Slope〔§5〕', d:'甲：右手握竿及旗外端下角向上提升，直至竿底<strong>剛剛離開</strong>旗套，右手手踭緊貼旗竿；同一時間左手向前擺緊握旗套及竿底。乙：右手盡快將旗連竿<strong>拉落</strong>，同時用左手橫過身體協助扶持，直至旗竿<strong>放喺右肩上</strong>。丙：旗連竿一到右肩，左手立即擺回左邊褲骨旁。丁：完成後<strong>旗竿與地面成 45 度</strong>，右手手踭屈曲至前臂與地面平行；⚠️ <strong>由右肩至右手嗰段旗竿要用旗身覆蓋</strong>（唔准外露）。' },
      { h:'5. 換手〔§6〕', d:'托旗時由右手換左手：甲 左手橫過身軀喺右手對上位置握緊旗竿；乙 雙手握竿，將竿提起橫過身體，放喺<strong>左肩</strong>上；丙 一到左肩，右手立即擺回右邊褲骨旁；丁 完成後竿與地面 45 度、左手手踭屈曲至前臂與地面平行、<strong>左肩至左手段用旗身覆蓋</strong>。由左手換右手動作相同、左右相反。' },
      { h:'6. 托旗 → 攜旗〔§7〕', d:'⚠️ <strong>事前必須先轉為右手托旗</strong>。甲 右手握竿及旗外端下角提升至身體正中央、竿底對準旗套，右前臂貼竿，左手握旗套及竿底。乙 盡快插入旗套，左手擺回身旁，右前臂提升至與地面平行，右手握竿放喺口部對出、手背向前、手腕前臂成一直線（竿保持垂直）。' },
      { h:'7. 攜旗 → 持旗立正〔§8〕', d:'甲 立即將右前臂擺回緊貼旗竿，右手握竿及旗外端下角微微上提，直至竿底剛剛離開旗套；同一時間左手向前移握緊旗套及竿底。乙 盡快將竿下降回右方，直至竿底放回<strong>右腳尾趾旁</strong>；同一時間左手橫過身軀、與地面平行以扶持旗竿完成動作（竿保持垂直）。丙 左手擺回左方，回復立正姿勢。' },
      { h:'8. 讓旗幟飄揚〔§9〕', d:'右手立即放鬆讓旗幟飄揚，隨即再緊握旗竿保持平行，回復<strong>攜旗</strong>姿勢。' },
      { h:'9. 抓回旗幟〔§10〕', d:'右手立即抓回旗幟，回復攜旗動作。⚠️ 風大時可用<strong>左手協助</strong>抓回。' },
      { h:'10. 原地敬禮 Lower the colour〔§11〕', d:'收到「General Salute」先讓旗幟飄揚；收到「Salute」：甲 右前臂擺回貼竿→握竿微微上提至竿底離開旗套，左手前移握旗套及竿底；乙 用右手將旗<strong>向右橫掃</strong>（風從右嚟就向左掃）至竿頂去到右腳前方、微微離開地面，左手擺回身旁；丙 完成後旗身完全展開喺竿右方，<strong>竿夾喺腋下</strong>、右手手背向地、手踭緊貼身軀。⚠️ <strong>眼球必須保持向前直望，唔准望住旗竿郁</strong>；雨天或泥濘地面橫掃至與地面平行就得。' },
      { h:'11. 慢步行進間敬禮〔§11〕', d:'「Eyes — RIGHT!」打數「Up」，動令喺<strong>右腳腳外側著地</strong>時發出，動作四步內完成：聽「Eyes」讓旗幟飄揚 → 聽「Right」握竿上提＋左手握旗套 → 向右橫掃至竿頂在前方、<strong>整支竿與地面平行</strong> → 旗身展開喺竿下方、夾腋下、右手手背向地。回復「Eyes — FRONT!」打數「Down」：右手把竿升到身體正中央、插入旗套、右前臂提升至與地面平行、右手放喺口部對出。' },
      { h:'12. 快步行進間敬禮〔§12〕', d:'「Eyes — RIGHT!」打數「Check — Up」，動令喺<strong>左腳腳踭著地</strong>時發出：聽「Right」之後<strong>繼續向前操兩步</strong>，先做讓旗幟飄揚。回復「Eyes — FRONT!」打數「Check — Down」— 立即做抓回旗幟。' },
      { h:'13. 步操時旗手嘅口令〔第7章〕', d:'旗手自己要做邊個動作，小隊長／司令員就喊：<strong>「Carry — COLOUR!」</strong>（攜旗）·<strong>「Slope — COLOUR!」</strong>（托旗）·<strong>「Order — COLOUR!」</strong>（持旗立正）·<strong>「Present — COLOUR!」</strong>（向旗敬禮）。' },
      { h:'14. 旗手口令與口號〔§12〕', d:'「<strong>CARRY COLOUR!</strong>」— 分三路：甲 將旗舉至右手肩膊水平；乙 左手握住旗竿底部；丙 將竿插入腰帶旗套內。之後喊「<strong>ORDER COLOUR!／AT EASE!／SALUTE!／CARRY ON!</strong>」，全隊要用口號回應：<strong>AW-AWAY-YEA</strong>（喊口號時要將旗置喺胸前）。' }
    ],
    types:[
      { t:'一個重點：竿角', d:'持旗／攜旗＝竿<strong>與地面垂直</strong>；托旗＝竿<strong>與地面成 45 度</strong>（放喺肩上）；行進間敬禮＝竿<strong>與地面平行</strong>；原地敬禮＝竿夾腋下。四種角度睇落好快分唔分旗手有冇做啱。' },
      { t:'練習方法', d:'用第3章「分部動作」教：先練甲部（上提＋左手就位），再練乙部（插入旗套／放肩上），最後連實。旗手單獨練完先加入小隊，配合第4章行進間敬禮一齊操。' },
      { t:'邊個做', d:'手冊第7章係<strong>旗手（持旗者）</strong>嘅動作；護旗隊員就照步操立正／稍息，唔使持旗。團旗、隊旗儀式都適用。' }
    ],
    safety:'旗竿底端要有金属尾箍／唔准對住人掃；練習範圍淨空 2 米（掃旗時竿頂橫掃距離唔短）；風大時改用左手協助抓回，唔好硬拗；旗身濕水會重好多，注意握力。',
    note:'✅ 第7章 §1–§12 已全數照《步操手冊》寫齊（§1 概言＝旗操口令跟步操）。旗手唔使再靠印象教。'
  },
  {
    k:'commands',
    n:'口令與動令時間表',
    icon:'📣',
    rel:['c08'],
    duration:'常備參考（印出嚝貼喺旗桿旁）',
    when:'帶步操、教小隊長發口令、會操排練',
    intro:'手冊第2章§7.2：口令分三部分 — <strong>介令</strong>（Move to the right in threes）→<strong>預令</strong>（Right）→<strong>動令</strong>（TURN）。預令通常喺動令前四步內發出；原地動作預令與動令之間停「標準停頓時距」1.5 秒（每分鐘 40 個動作）。',
    steps:[
      { h:'1. 打數規則〔附錄乙 註〕', d:'原地動作打數係「<strong>ONE/UP — TWO THREE — ONE/DOWN</strong>」：<strong>淨係喺 ONE／UP／DOWN 先做動作</strong>，Two—Three 係停留時間，全身唔准郁。行進間動作就照下面嗰張表，動令要喺啱隻腳著地時喊。' },
      { h:'2. 常見動作口令〔附錄甲〕', d:'立正 <strong>Squad/Parade — SHUN</strong> 或 <strong>ALERT</strong>；稍息 Stand at — <strong>EASE</strong>；休息 Stand — <strong>EASY</strong>（回稍息用 <strong>SQUAD</strong>）；集隊 Squad — <strong>FALL IN</strong>；暫時解散 Turn to the right (and salute / do not salute) — <strong>FALL OUT</strong>；解散 — <strong>DISMISS</strong>；向右轉 (Turning) Right — <strong>TURN</strong>；斜轉 (Inclining) Right — <strong>INCLINE</strong>；齊步開步 (Squad will advance) Quick — <strong>MARCH</strong>；停步 Squad — <strong>HALT</strong>；原地踏步 Quick mark — <strong>TIME</strong>／行進間 MARK — TIME；換步 (Changing step) CHANGE — <strong>STEP</strong>；敬禮 (Saluting) Salute to the front/right/left — <strong>SALUTE</strong>；注目 EYES — <strong>RIGHT/LEFT</strong>／EYES — <strong>FRONT</strong>；睇齊 (Dressing) Right — <strong>DRESS</strong>；開闊/收窄排 Marching in open/close — <strong>ORDER</strong>；成三排/兩排 Form three/two — <strong>RANKS</strong>；轉彎 (By the right/left) RIGHT/LEFT <strong>WHEEL</strong>；報數 From the right — <strong>NUMBER</strong>；排高矮 — <strong>SIZE</strong>；空行 — <strong>BLANK FILE</strong>；橫移 One to eight pace(s) Right/left close — <strong>MARCH</strong>；取消口令 <strong>AS YOU WERE</strong>。' },
      { h:'3. 行進間動令落腳〔附錄乙〕', d:'見下面對照表。要記住嘅核心：<strong>HALT 喺左腳腳踭著地時喊</strong>；RIGHT-TURN 快步喺左腳腳踭、慢步喺右腳經過左腳；ABOUT-TURN 快步喺右腳腳踭；EYES RIGHT／FRONT 快步喺左腳腳踭、慢步喺右腳腳掌。喊錯腳，成隊就會有半步亂。' },
      { h:'4. 教發口令〔第2章§10.1〕', d:'兩個練習：① 發令練習—全隊立正，逐個自己喊口令自己做；再分兩排面對面相隔 30 米（約 32 碼）、左右相隔 5 步，互相操練 10 分鐘後互調。② 口令練習—分三排，講解介令與引導翼，逐個去司令員位喊口令畀全隊，另一位隊員負責觀察同評論。' },
      { h:'5. 鼓與拍子機配合〔第2章§3〕', d:'原地分部動作：鼓手企<strong>全隊後方</strong>，跟打數時間打鼓。原地動作：拍子機預校<strong>每分鐘 40 次</strong>放喺鼓手身旁地上，鼓手與隊員之間距離要令隊員聽唔到拍子機。行進間：照動作設定頻率（快步 116、慢步 65），司令員喊完動令鼓手跟住打。' }
    ],
    types:[
      { t:'HALT（行進間）', d:'快步：左腳腳踭著地｜慢步：左腳經過右腳｜打數 ONE — TWO' },
      { t:'QUICK／SLOW — MARCH（行進間）', d:'快步：QUICK 喺左腳著地、MARCH 喺右腳踭著地（連續發出）｜慢步：SLOW 喺左腳掌、MARCH 喺右腳掌' },
      { t:'RIGHT — TURN／INCLINE（行進間）', d:'快步：左腳踭著地｜慢步：右腳經過左腳｜打數 快步 CHECK — DOWN、慢步 DOWN（LEFT — TURN 左右相反）' },
      { t:'ABOUT — TURN（行進間）', d:'快步：右腳踭著地｜慢步：右腳經過左腳｜打數 快步 IN—LEFT—RIGHT—LEFT—FORWARD、慢步 ONE STOP—TWO STOP—THREE STOP—FORWARD' },
      { t:'MARK — TIME（行進間）', d:'快步：MARK 左腳踭、TIME 右腳踭（連續）｜慢步：完成右腳一步｜打數 快步 IN' },
      { t:'HALT／FORWARD（原地踏步時）', d:'快步同慢步：喺<strong>左腳大腿提高至與地面平行</strong>時喊｜打數 DOWN' },
      { t:'CHANGE — STEP', d:'CHANGE 喺左腳、STEP 喺右腳踭（連續）｜打數 行進間 LEFT—RIGHT—LEFT、原地踏步 LEFT—LEFT—RIGHT' },
      { t:'BREAK INTO QUICK TIME, QUICK — MARCH', d:'慢步轉快步：QUICK 喺左腳掌著地、MARCH 喺右腳掌著地（連續發出）' },
      { t:'BREAK INTO SLOW TIME, SLOW — MARCH', d:'快步轉慢步：右腳腳踭著地' },
      { t:'OPEN／CLOSE — ORDER（行進間）', d:'慢步：完成右腳一步時喊' },
      { t:'EYES — RIGHT／LEFT', d:'快步：左腳踭著地｜慢步：右腳掌著地｜打數 快步 CHECK — UP、慢步 UP' },
      { t:'EYES — FRONT', d:'快步：左腳踭著地｜慢步：右腳掌著地｜打數 快步 CHECK — DOWN、慢步 DOWN' },
      { t:'RIGHT — FORM（轉隊形）', d:'快步：左腳經過右腳｜慢步：左腳掌將著地前（LEFT — FORM 相反）；ON THE RIGHT (LEFT) FORM — SQUAD 同 RIGHT／LEFT TURN 一樣' },
      { t:'SALUTE TO THE FRONT（行進間）', d:'左腳踭著地｜打數 ONE—TWO、TWO THREE UP、TWO THREE DOWN、TWO THREE UP、TWO THREE DOWN、TWO THREE TURN、TWO THREE IN、TWO THREE LEFT RIGHT LEFT' },
      { t:'SALUTE TO THE RIGHT／LEFT（行進間）', d:'左腳踭著地｜打數 UP—TWO—THREE—FOUR—FIVE—DOWN—SWING' }
    ],
    safety:'喊口令前自己先企好（立正）；動令要短而響亮；全隊未靜落嚟唔好喊；有隊員聽唔明英文口令就用中文講解、但照手冊喊英文口令，方便日後會操一致。',
    note:'呢張表係《步操手冊》附錄甲＋附錄乙嘅節錄；正式會操、訓練班考核請用手冊原本對照。'
  },
];

// 升旗／隊列相關參考檔
CEREMONY.refs = [
  { n:'《隊列和升掛國旗及區旗指引》（2024版）', url:'https://www.scout.org.hk/uploads/tc/circulars/16450/guidelines-of-chinese-foot-drill-and-national-flag-and-regional-flag-raising.pdf' },
  { n:'《支部成員徽章佩戴指引》（2023 通告13號）', url:'https://www.scout.org.hk/uploads/tc/circulars/11057/p013-23.pdf' },
  { n:'《儀容與制服手冊》官方網站', url:'https://uniform.scouting.org.hk/' },
  { n:'《步操手冊》DRILL MANUAL（2003 年 7 月第二版・本檔立正／口令／步速／致敬／集隊條文嘅出處）', url:'https://drive.google.com/file/d/1g4M6C7e1K7tVDkr2IADdkebm1CjljI-l/view' }
];

if (typeof module !== 'undefined' && module.exports) module.exports = CEREMONY;
