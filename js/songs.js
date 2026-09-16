/* Scout Hub v19 — songs.js：童軍營火歌歌紙（🔥 營火歌 tab 專用）
 * 選曲原則（按用戶要求）：只用流傳嘅童軍／營火傳統歌，唔自創、唔放唔啱嘅歌。
 * 全部收錄歌詞均為 Public Domain（19 世紀民歌／傳統歌曲），可放心印歌紙。
 * 有版權嘅必唱歌（例：Campfire's Burning 熊熊烈火、Kookaburra）只列歌名＋點搵，唔抄歌詞。
 */
var SONGS = {};

SONGS.meta = {
  title: '童軍營火歌歌紙',
  note: '呢度 10 首歌全部係世界各地童軍營火會流傳咗成百年嘅傳統歌，歌詞進入版權期外（Public Domain），可以隨意唱、隨意印。旋律要學：跟領袖彈唱示範，或上網搜歌名睇官方歌譜。'
};

/* ── 領唱技巧（營火歌帶領 5 招）── */
SONGS.leaderTips = [
  '起音唔好太高：帶唱前自己細聲哼一次旋律，揀隊員最舒服嘅調。',
  '第一句自己唱先：其他句用手勢請大家接；唱錯唔緊要，继续帶住。',
  '手勢控制大細聲：手掌升高＝大聲，壓低＝細聲，握拳＝收。',
  '走音唔停：當住冇事繼續帶，气氛大過準確。',
  '尾句收細聲做結尾：營火晚會最尾一首一定要慢要細，收水先好散。'
];

/* ── 音樂總提示（伴奏／拍子）── */
SONGS.musicTips = [
  '歌紙上嘅和弦係 C 調編配：淨係 C（1 級）、F（4 級）、G7（5 級）三個和弦已經唱到晒全部歌；結他／烏克麗麗用「落 落 上 上 落」掃弦節奏，一拍一下起步。',
  '冇樂器都好办：領唱彈手槍和弦（拍口）＋全團拍手；歌紙上每行標咗每句用邊個和弦。',
  '拍子歌（例：This Old Man）可以逐段加速，最尾一段快過頭通常最爆笑。',
  '輪唱（Row/兩隻老虎）：分組隔 2 小節入，唱亂都唔好停；最尾齊齊收。「火圈」內面唔准企起衝出。'
];

/* ── 10 首歌紙 ── */
SONGS.sheets = [
  {
    k:'skip', zh:'與我同跳', en:'Skip to My Lou', cat:'大合唱・營火常規',
    meter:'4/4', tempo:'♩≈112（輕快彈跳）', keyName:'C 大調', chords:['C','F','G7'],
    form:'每段：A 句 ×2 → 副歌 ×1；段數任唱',
    lines:[
      ['C        F    C','Skip to my Lou, my darlin\','],
      ['G7   C','Skip to my Lou and count me ten;'],
      ['C      F   C','Skip to my Lou, my darlin\','],
      ['G7    C','Skip to my Lou and all is well.'],
      ['C','（傳統 verses 例）Flies in the buttermilk, shoo, fly! …'],
      ['C','Kettle on the fire and it won\'t boil! …（領唱即興砌詞都得）']
    ],
    acts:['玩法：圍圈行，副歌嗰下配對換位（美式 circle game 玩法）；唔識英文就用「（小隊名），我哋最叻！」自填節拍唱。'],
    howto:['第一遍領唱慢唱，第二遍加快速度；加速就係气氛。'],
    note:'美國傳統民歌（19 世紀已流傳），Public Domain。'
  },
  {
    k:'susanna', zh:'蘇珊娜', en:'Oh! Susanna', cat:'大合唱・行軍歌',
    meter:'4/4', tempo:'♩≈132（行軍步頻）', keyName:'C 大調', chords:['C','A7','Dm','G7'],
    form:'主歌＋副歌；副歌全團拍手齊唱',
    lines:[
      ['C','I came from Alabama with my banjo on my knee,'],
      ['G7      C','I\'m going to Louisiana, my true love for to see;'],
      ['C','It rain\'d all night the day I left, the weather it was dry,'],
      ['G7       C','The sun so hot I froze all o\'er—Susanna, don\'t you cry!'],
      ['F      G7','Oh! Oh! Susanna, oh don\'t you cry for me,'],
      ['C','I come from Alabama with my banjo on my knee.']
    ],
    acts:['行軍版本：邊踏步邊唱，「dry」嗰句故意大力踏腳；適合開場炒熱全場。'],
    howto:['副歌「Oh! Oh!」位留畀大家出聲，領唱淨係舉手；兩拍後收。'],
    note:'Stephen Foster, 1848 年作品，全球童軍營火經典，Public Domain。'
  },
  {
    k:'railroad', zh:' railway 開工歌', en:'I\'ve Been Working on the Railroad', cat:'輪唱・拍手歌',
    meter:'2/4', tempo:'♩≈116（機械感）', keyName:'C 大調', chords:['C','F','G7'],
    form:'兩句一循環，可輪唱（第二組遲兩小節入）',
    lines:[
      ['C','I\'ve been working on the railroad'],
      ['F    C    G7  C','All the live long day.'],
      ['C','Tip cart falls over, spills on the ground,'],
      ['F  G7  C','Dinah, won\'t you come out?']
    ],
    acts:['邊唱邊做「掘路」動作：左右互疊掌敲地，扮打鐵；副拍拍手。'],
    howto:['輪唱測試隊員抗干扰能力：兩組鬥邊組唔亂。'],
    note:'美國傳統歌曲（1850s），Public Domain。'
  },
  {
    k:'homerange', zh:'草原家園', en:'Home on the Range', cat:'慢歌・收尾歌',
    meter:'4/4', tempo:'♩≈84（開揚舒展）', keyName:'G 大調（C 調指法亦可）', chords:['G','D7','C','G'],
    form:'一段主歌＋副歌；全場細聲合唱',
    lines:[
      ['G        D7  G','Oh, give me a home where the buffalo roam,'],
      ['G    D7    G','Where the deer and the antelope play;'],
      ['C    G   D7  G','Where seldom is heard a discouraging word,'],
      ['G   D7    G','And the skies are not cloudy all day.'],
      ['C     G','Home, home on the range,'],
      ['G     D7  G','Where the skies are not cloudy all day.']
    ],
    acts:['收尾專用：唱到副歌叫大家坐低、眼望火／星空。'],
    howto:['領唱拖長拍子，唔好催；最尾一句減慢減細。'],
    note:'1872 年詩＋傳統旋律，Public Domain。'
  },
  {
    k:'bonnie', zh:'我嘅邦妮', en:'My Bonnie Lies Over the Ocean', cat:'動作歌・全場郁身',
    meter:'3/4', tempo:'♩≈126（waltz 擺動）', keyName:'G 大調', chords:['G','C','D7'],
    form:'一段；重唱加速',
    lines:[
      ['G','My Bonnie lies over the ocean,'],
      ['C  G','My Bonnie lies over the sea,'],
      ['G  D7','My Bonnie lies over the ocean,'],
      ['G','Oh bring back my Bonnie to me.']
    ],
    acts:['經典玩法：每當唱到「B」字（Bonnie/bring）全場擺身；唱到「low」字（over/below/low）屈膝；「high」字（my / sky）舉手踮脚。'],
    howto:['動作歌規則先演示一次慢慢試，先開住唱；做错嘅隊做下次領唱。'],
    note:'蘇格蘭傳統民歌（19 世紀），Public Domain。'
  },
  {
    k:'clementine', zh:'克蕾曼汀', en:'Clementine', cat:'大合唱・故事歌',
    meter:'4/4 拍半（waltz 感）', tempo:'♩≈100', keyName:'C 大調', chords:['C','G7'],
    form:'一段主歌＋副歌',
    lines:[
      ['C','In a cavern, in a canyon,'],
      ['G7    C','Excavating for a mine,'],
      ['C','Dwelt a miner forty-niner'],
      ['G7  C   G7  C','And his daughter Clementine.'],
      ['C       G7   C','Oh, my darling! Oh, my darling! Oh, my darling Clementine!'],
      ['C       G7   C','Clementine, you are lost and gone forever—'],
      ['G7    C','Dreadful sorry, Clementine!']
    ],
    acts:['副歌舉手拖長音合唱；「Dreadful sorry」裝做大細喉，好笑到爆。'],
    howto:['多段版本（19 世紀流傳）可任揀；領唱淨係唱第一句，餘下交俾大家。'],
    note:'美國淘金潮時期民歌（1860s），Public Domain。'
  },
  {
    k:'thisoldman', zh:'呢個老伯', en:'This Old Man', cat:'數字歌・拍手歌',
    meter:'2/4', tempo:'♩≈108，可逐段加速', keyName:'C 大調', chords:['C','G7'],
    form:'數碼循環（1→10），每段手指部位都要改',
    lines:[
      ['C','This old man, he played one,'],
      ['G7','He played knick-knack on my thumb;'],
      ['C','With a knick-knack, paddywhack,'],
      ['G7','Give the dog a bone,'],
      ['C   G7   C','This old man came rolling home.']
    ],
    acts:['每段改手指部位：thumb→shoe→knee→door→…；唱嗰下即指住自己嗰個位。'],
    howto:['鬥快遊戲：1 到 10 逐段加速，甩嘴就淘汰／做鬼。全場齊唱唔使分組都得。'],
    note:'英國傳統 nursery song，Public Domain。'
  },
  {
    k:'rowboat', zh:'划艇歌', en:'Row, Row, Row Your Boat（輪唱）', cat:'輪唱・入聲練習',
    meter:'4/4', tempo:'♩≈96', keyName:'C 大調', chords:['C','F','G7'],
    form:'4 部輪唱：每組遲一小節（4 拍）入',
    lines:[
      ['C','Row, row, row your boat,'],
      ['F  C  G7  C','Gently down the stream;'],
      ['C','Merrily, merrily, merrily, merrily,'],
      ['F  G7  C','Life is but a dream.']
    ],
    acts:['邊唱邊做划槳：全團前後搖，輪唱叠聲嗰陣最似海上大風浪。'],
    howto:['先齊唱一次，再分 2 組輪唱，熟咗先 4 組；領袖企中間用手勢入拍。'],
    note:'傳統歌曲（1852 年刊），Public Domain。'
  },
  {
    k:'blindmice', zh:'三隻盲人鼠', en:'Three Blind Mice（輪唱）', cat:'輪唱・動作歌',
    meter:'6/8 感・兩拍', tempo:'♩≈100', keyName:'C 大調', chords:['C','G7'],
    form:'2 部輪唱（每組遲一句入）',
    lines:[
      ['C','Three blind mice! Three blind mice!'],
      ['C','See how they run! See how they run!'],
      ['C','They all ran after the farmer\'s wife,'],
      ['C','Who cut off their tails with a carving knife,'],
      ['C','Did you ever see such a sight in your life,'],
      ['G7   C','As three blind mice?']
    ],
    acts:['扮鼠：手指做眼睛貼面；「run」原地碎步；「cut」橫掌一揮（空手勢，唔使真道具）。'],
    howto:['故事引入：細聲講「有三隻鼠……」先起唱；尾段愈快愈好。'],
    note:'1744 年已刊印（傳統 nursery），Public Domain。'
  },
  {
    k:'bottles', zh:'十隻綠樽', en:'Ten Green Bottles', cat:'數字歌・倒數歌',
    meter:'4/4', tempo:'♩≈104，愈倒愈慢愈細聲', keyName:'C 大調（淨係 C 和弦）', chords:['C'],
    form:'倒數循環：10→1，每循環改個數字',
    lines:[
      ['C','Ten green bottles hanging on the wall,'],
      ['C','Ten green bottles hanging on the wall,'],
      ['C','And if one green bottle should accidentally fall,'],
      ['G7     C','There\'ll be nine green bottles hanging on the wall.']
    ],
    acts:['每段倒一只「樽」：叫一位隊員瞓低／放低一支道具樽；最尾一段變細聲氣音。'],
    howto:['識數碼就玩倒數；溫書版可改十隻「帳篷/繩結」自填名詞。'],
    note:'英國傳統酒館／營火歌，Public Domain。'
  }
];

/* ── 兩隻老虎（輪唱廣東話版，旋律同 Frère Jacques）── */
SONGS.sheets.push({
  k:'laofu', zh:'兩隻老虎（輪唱）', en:'Frère Jacques（兩隻老虎）', cat:'輪唱・廣東話',
  meter:'4/4', tempo:'♩≈100', keyName:'C 大調（淨係 C 和弦）', chords:['C'],
  form:'2–4 部輪唱：每組遲 4 拍入',
  lines:[
    ['C','兩隻老虎！兩隻老虎！'],
    ['C','跑得快！跑得快！'],
    ['C','一隻沒有耳朵，一隻沒有尾巴,'],
    ['C','真奇怪！真奇怪！']
  ],
  acts:['小隊對壘：一隊唱「兩隻老虎」一隊唱「真奇怪」位接力；勝出法＝最齊最唔笑場。'],
  howto:['旋律同英文 Frère Jacques 完全一樣，識一個就識兩個；入拍前領唱畀「one-two-go」手勢。'],
  note:'法國傳統旋律（18 世紀）＋華語傳唱舊詞，一般視為 Public Domain。'
});

/* ── 營火章「必識十首」清單：有版權者只列歌名，唔抄歌詞 ── */
SONGS.mustKnow = {
  why:'考「營火」興趣章（2026 新增）要認識至少 10 首營火歌，其中一首必須係 Campfire\'s Burning「熊熊烈火」。本 tab 嘅 10 首公版歌＋以下官方必學歌，已經夠數。',
  list:[
    { n:'Campfire\'s Burning（熊熊烈火）', must:true, tip:'考章指定必學！歌詞有版權，請向團長／區訓練組攞官方歌紙，或睇總會出版嘅營火歌曲集。' },
    { n:'Kookaburra（笑翠鳥）', must:false, tip:'澳洲童軍大合唱歌；動作簡單（張手扮鳥飛）。版權未到期，唔喺呢度印歌詞，可跟領袖學。' },
    { n:'Auld Lang Syne（友誼萬歲／友誼之光）', must:false, tip:'蘇格蘭傳統旋律（公版），壓軸搭膊唱；廣東話歌詞有版權，用正版本。' },
    { n:'童軍歌（Scout Hymn 系列）', must:false, tip:'典禮場合用；向團長攞官方歌紙，唔好亂上网搵野唱。' }
  ],
  check:'自查方法：畀小隊長抽唱任何一首嘅第一段＋講得出場合，就當「認識」。'
};

/* ── 營火歌環節編排（10–15 分鐘範本）── */
SONGS.hostPlan = [
  { t:'開場團呼', d:'全團圍圈企定，一句口號/歡呼開始（例如「準備！準備！準備！耶！」）——企穩先開聲。' },
  { t:'大合唱', d:'揀人人識嘅（例：Oh! Susanna），唱足全曲炒熱氣氛；領袖帶拍。' },
  { t:'輪唱對壘', d:'Row/兩隻老虎分組鬥：兩隊輪唱，睇邊隊撐到最尾唔亂。' },
  { t:'動作歌', d:'My Bonnie / This Old Man：郁身郁手；做错嘅做下一輪領唱。' },
  { t:'慢歌收尾', d:'Home on the Range / 十隻綠樽：坐低細聲唱，將火圈氣氛收埋。' },
  { t:'晚安呼', d:'搭膊細聲：「晚安～童軍～聽日見～」（呼應 c07 歡呼練習）。' }
];

/* ── 安全／禮儀底線 ── */
SONGS.safety = [
  '火圈內唔准企起身衝入；道具、裙擺、領巾收好先玩動作歌。',
  '淨係用 LED／受控火坑先進行營火環節（按場地許可）；水同沙放喺領唱背後。',
  '唱歌唔好離隊形四散；收水後先解散。',
  '歌詞內冇人嘅名：唔借歌取笑隊員／領袖。'
];

if (typeof module !== 'undefined' && module.exports) module.exports = SONGS;
