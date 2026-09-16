# Scout Hub — Handover Notes（交下一個 Agent 用）

> 最後更新：2026-09-15
> 目前 branch：`arena/01a0a749-scoutmeeting`（v19 完成：用戶 12 項回饋全落地！🎉 分頁化＋圖解＋指邊印邊＋營火歌 tab＋新 icon；v18 已併入）
> 本文件係交俾下一個 Agent 接手時嘅工作記錄，包含產品定位、技術架構、已完成項目、代碼約定、下一步優先次序。

---

## 1. 項目是什麼

**Scout Hub** = 香港童軍（11–15 歲童軍支部）團集會助手 PWA，俾領袖帶隊用。
- 參考：幼童軍 Cub Hub UI/架構（但唔抄佢哋 emoji icon）
- 內容來源：官方 2026-06-06《童軍訓練綱要》+ 2026-09-01 團集會套包
- 定位：**領袖帶隊工具**，三步帶法（領袖預備 → 集會流程 → 跟進）＋小隊長任務卡為主、成員工作紙為輔
- 主色：**森林綠 #2E7D32 + 金色 #F9A825**
- Icon：自製森林綠底＋金色百合花飾（fleur-de-lis），喺 `icons/icon-192.png`、`icons/icon-512.png`（唔用 Cubs Hub 嗰套 emoji icon）

## 2. 10 個 Tab（5+5 架構）

**上方 5 tab**：
| Tab | 狀態 | 說明 |
|---|---|---|
| 📅 集會目錄（plan） | ✅ 24/24 全完成！ | 24 場規劃表格，撳 tid 入教案詳情 |
| 🎪 集會儀式（ceremony） | ✅ 7 套儀式卡 | 開始/結束儀式、中式隊列、升旗、宣誓、三指敬禮、團呼 |
| 👕 制服（uniform） | ✅ 6 類官網圖＋佩戴表＋自查 | 官網圖片熱連（TLS 下載失敗先唔 mirror） |
| 📦 官方套包（official） | ✅ 外連 | `window.location.href = EXTERNAL.officialPack` |
| 📖 手冊（book） | ✅ 誓詞/規律/銘言 + 報章 + 報班 | 含「如何報考專科徽章」+「如何報考訓練班（訂閱通告圖書館）」 |

**下方 5 tab**：
| Tab | 狀態 | 說明 |
|---|---|---|
| ✂️ 素材庫（print） | 🚧 WIP | 首版 placeholder |
| 🎮 活動（play） | 🟡 4 個常用遊戲 | 未來補更多 |
| 🪢 技能（skills） | 🚧 WIP | 列出 9 大技能分類，圖解卡未做 |
| 🎖️ 興趣章（badges） | ✅ 33 個興趣組專科徽章 | 含官方要求 + 建議考核方式，filter 分類 |
| 🔥 營火歌（songs，v19 取代小隊 tab） | ✅ | 11 首公版傳統營火歌歌紙（和弦/拍子/動作）＋領唱 5 招＋火圈編排圖；小隊制度已併入手冊 |

**頂欄外連**（icon-only 按鈕）：
- 🔍 搜尋（暫跳去 #book，未做 search 功能）
- 🏅 scoutbadge.vercel.app（**進度性獎章全外連**：會員章/探索/標準/高級/總領袖，本 APP 唔做記錄/考核）
- 📨 scout-circulars.vercel.app（通告圖書館）
- 🆕 📝 districtbadgesystem30.vercel.app（**只係報考專科徽章用**，唔係訓練班系統——用戶明確更正）

## 3. 重要用戶約定（唔可以改）

0. **v19 用戶新约定（見下方第 16 節）**：①tab 內容要分頁（制服要陸/海/空小分頁）②兴趣组由团考核、興趣章 tab 唔放區總部報章系統連結③唔出繩結逐步圖卡（會錯）④儀式/活動/技能要補圖（興趣章唔使）⑤歌紙只用傳統童軍營火歌，唔自創唔放流行歌⑥列印指邊印邊⑦工作紙：上面教案「跟住做」＋素材庫「直接印」兩邊都要⑧集會目錄整行可撳
1. **唔好抄 Cubs Hub 嘅 emoji icon**——用自製森林綠+金百合花飾（v19 已更新為 192/512/maskable 三 size，原圖來自 generate_image）
2. **完全移除森林故事**（幼童軍先有，童軍支部冇）
3. **第 4 tab = 🪢 技能；第 5 tab 已由「小隊」改為 🔥 營火歌**（v19 用戶指示，取代舊約定）
4. **「活動章」tab 改名「興趣章」，只做興趣組**（藍底技能組/紅底服務組/金邊教導組全外連 scoutbadge）
5. **進度性獎章內容/記錄/考核全部外連 scoutbadge**，本 APP 唔做
6. **制服必須用香港童軍總會官網圖片**（熱連 `https://www.scout.org.hk/uploads/member/Scout_B.1.jpg` 等，唔好自己整/改圖）
7. **儀式內容唔自己作**，動作要領文字化；中式隊列參考總會《中式隊列指引》PDF
8. **誓詞/規律/銘言已核對《童軍訓練綱要》2026-06-06 版**，唔好亂改字眼
9. **「如何報考訓練班」**必須教用通告圖書館訂閱：通知面板 → 剔支部/分類 → 啟用通知 → 手機加入主畫面
10. **恆常集會為主、特別集會另設專區**；小隊長任務卡首版從簡、領袖主導
11. **集會以 9 段程序為標準結構**（c01-c12 全部 9 段）
12. **🚫 唔准生成「制服圖」**（v21 用戶指正：AI 一定畫錯帽章／巾圈／袋蓋／布章位置）。AI 插畫只畫**中性練習衫**（灰T＋深灰短褲、冇帽冇領巾冇章），目標只係俾領袖睇明**動作／站位／程序**；制服標準一律用官網圖＋《儀容與制服手冊》。同埋唔出：繩結逐步圖、營火袍布章插畫（呢啲屬制服／徽章範圍，只用平面圖解＋文字）

## 4. 已完成教案（24/24 場，狀態：✅ full:true）🎉

| tid | 主題 | 獎章 | 形式 | 特色檔案標記 |
|---|---|---|---|---|
| c01 | 加入小隊＋中式隊列基礎 | 會員章 m1+m2+m5 | 恆常（90min） | — |
| c02 | 童軍歷史 | 會員章 m3 | 恆常（90min） | — |
| c03 | 國旗國徽區旗區徽＋保護自己 | 會員章 m6+m7+m10 | 恆常（90min） | **sensitive:true**（橙色警告） |
| c04 | 升旗禮儀＋國歌 | 會員章 m8+m9 | 恆常（90min） | — |
| c05 | 誓詞規律銘言 | 會員章 m4 | 特別（90min） | — |
| c06 | 宣誓儀式 | 會員章 m11 | 特別（90min） | **special:true**（崗位/物品/事後跟進） |
| c07 | 身心健康＋小隊歡呼＋運動 | 探索 B1+B2 | 恆常（90min） | — |
| c08 | 生態環境參觀 | 探索 D3（選修） | **室外半日特別（210min）** | special + **outdoor:true**（個人裝備/禁帶/長版家長同意書） |
| c09 | 地圖圖例＋執背囊 | 探索 A2a+b | 恆常（90min） | — |
| c10 | 一日郊野 5km 徒步 | 探索 A2b+c + C2b | **室外一日特別（270min/4.5h）** | special + outdoor（1:6+急救證書/對講機×4/救生毯/16 項個人裝備/SOS/三長哨/Leave No Trace） |
| c11 | 農曆新年團拜＋揮春創作 | 探索 C3a（文化藝術） | 室內特別（120min/2h） | special（書法/過敏專區/哈姆立克/鼓勵利是/唔設字靚獎） |
| c12 | 童軍創辦人紀念日（思善日） | 探索 C2a+C2b | 室內特別（90min） | special（2/22 BP 伉儷生日/全球靜默 3 分鐘/電子蠟燭/自願一毫子捐款/6 國分享/思善卡/尊重多元宗教） |
| c13 | 先鋒工程（一）：平結八字雙套半結反手結 | 探索 A3a | 恆常（90min） | knots 速查表（C13.knots：n/en/use/how/check，供日後技能 tab 用） |
| c14 | 先鋒工程（二）：稱人接繩繫木縮繩曳木結＋收繩保養 | 探索 A3a+b | 恆常（90min） | knots＋ropeCare 速查表（C14.knots/C14.ropeCare）＋十結大點名 |
| c15 | 營藝（一）：露營背囊＋危險工具安全 | 探索 A1b+c | 恆常（90min） | 小刀手鋸實作＋斧頭爐具示範（c16 前預備） |
| c16 | 小隊露營（兩日一夜） | 探索 A1a+d+A4+C1a | 室外特別（1620min） | special+outdoor 紮營煮食營火拔營＋指南針定向（呼應 c09）+Leave No Trace |
| c17 | 七種急救＋4小時服務 | 探索 D1a+b | 恆常（90min） | 沖脫泡蓋送/RICE/復原臥式＋C17.firstaid 速查表 |
| c18 | 母親節特別集會 | （特別活動） | 室內特別（90min） | special 心意卡＋紙康乃馨＋媽媽茶點送花儀式 |
| c19 | 小隊會議 | 探索 C1a | 恆常（90min） | 7 步程序＋主席 5 招＋真會議真記錄 |
| c20 | 生活分享＋探索獎章頒發儀式 | 探索 C2a | 室內特別（90min） | special 全年回顧＋頒獎＋補考表 |
| c21 | 暑期戶外同樂日（沙灘） | （暑期特別活動） | 室外特別（180min） | special+outdoor 沙灘遊戲＋HELP＋淨灘 |
| c22 | 社區考察：文化習俗/傳統節慶 | 標準 D2 選修 | 室外特別（180min） | special+outdoor 兩站參觀＋小隊訪問 |
| c23 | 游泳章（興趣組） | 標準 B1 | 特別（120min/泳池） | special 6 項考核＋C23.requirements（引官方要求） |
| c24 | 模型製作（興趣組） | 標準 B2 | 恆常（90min） | 𠝹刀安全＋理想營地大模型＋展覽（全年最後一場） |

**剩餘 placeholder 場次：無——24 場已全數完成！🎉**（v16 補完 c15–c24）

**10 個 tab 內容：已全數補齊！🎉**（v17：✂️素材庫＋🎮12遊戲＋🪢9技能卡＋🧑‍🤝‍🧑小隊制度工具）

**歌紙＋SVG 圖解＋全站搜尋：已全數完成！🎉**（v18：國歌＋2 原創營火歌＋歌單；17 個 SVG 圖；85 項搜尋索引）

## 5. 檔案結構

```
scoutmeeting/
├── index.html              # 入口（載入所有 js）
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service Worker（版本號 scout-v{N}-c{XX}-YYYYMMDD）
├── css/app.css             # 所有樣式
├── README.md               # 公開 README
├── HANDOVER.md             # ← 你而家睇緊
├── POSITIONING.md          # 初期定位確認記錄
├── package.json            # 只有 npm test 指令
├── icons/
│   ├── icon-192.png        # 192×192 自製百合花飾 PNG
│   └── icon-512.png        # 512×512
├── img/
│   └── icon-192.svg        # 原始 SVG（convert 缺 rsvg-convert，所以用 generate_image 出 PNG）
├── js/
│   ├── app.js              # 核心：路由、App.renderMeeting()、所有 page render
│   ├── data.js             # DATA 物件：meetings[] 24 場、facts、games、specialEvents、EXTERNAL 外連
│   ├── interests.js        # INTERESTS：33 個興趣章、categories、howToApply（報章＋報班流程）
│   ├── ceremony.js         # CEREMONY：7 套儀式卡（含 refs 連結）
│   ├── uniform.js          # UNIFORM：6 類制服官網圖＋badgePositions＋checklist＋winter
│   ├── c01-lesson.js ~ c24-lesson.js  # 24 個完整教案（含 C13/C14.knots/C14.ropeCare/C17.firstaid/C23.requirements 速查表）
└── tests/
    └── smoke.mjs           # 主要 test：`npm test`，97 項全通過（c01–c24）
```

**注意**：tests/ 資料夾仲有幾個舊嘅 *.mjs 檔（audit/browser-*/content/nav/practical/print-songs-art/quickkeys/runtime/ui）係前期遺留，**唔係**現行測試——現行只用 `tests/smoke.mjs`。唔好因為其他 test 壞而卡住，可以留低/刪除都得。

## 6. 教案物件結構（重要代碼約定）

每個 `Cxx` 物件可以包含以下欄位（全部 optional，按場次屬性 render）：

```js
var C12 = {};
C12.timing = { prepWeek, leaderMeeting, setBefore, packAfter, venue };
C12.leaderPrep = [{when, what}] | [string]; // 兩種格式都支援
C12.words / C12.countries / C13.knots / C17.firstaid / C23.requirements / ...  // 隨教案自訂（UI 唔渲染，備課＋日後技能 tab 用）
C12.program = [                             // 必備，9 段
  {
    n: '段落名（string）', t: 分鐘（number）,
    steps: [string,...],                    // 新格式（c10+）
    leader: {leader:'...', patrol:'...'} | string,  // 兩種格式都支援
    leaderScript: '...',                    // 段內領袖講稿（新格式，app.js 會渲染為金色 callout）
    materials: '...' | mats: [...],         // 物資（新舊格式）
    safety: '...',                          // 段內安全提示（新格式）
    // 舊格式仲支援：sub[], activities[], talking[], blocks[], tip, key
  },
];
C12.bpMessage / C12.bpMessage = '...';     // 可放教案特設文字
C12.roles = [{role, qty（可數字或字串）, duties|duty, person?}];
C12.items = [{n, to?, qty?, d?}];
C12.bag = [{n, qty（數字或字串，數字+中文如「2卷」一定要引號！）, type, note?}];
C12.personalKit = [string] （室外場）； C12.doNotBring = [string] （室外場）；
C12.notice = {title,items[]} | long string; // 兩種格式，string 會用 <pre> 保留換行
C12.worksheet = {title, audience, prompts[]} | {title, audience, fields:[{label,type}], footer?};
C12.pledgeCard = {...}; // c05 用
C12.scenarios = [{s,a}]; // c03 用
C12.observation = {title, items[]} | [string]; // 領袖檢查清單
C12.practical = {fewPeople, lackMat, ..., qa:[{q,a}]} | [{situation, action}]; // 新舊兩種
C12.safety = [string];
C12.postCeremony = [string];
C12.trivia = [{h,d}] | [{q,a}]; // 新舊兩種（h/d 舊，q/a 新）
```

**⚠️ 關鍵 bug 紀錄**：bag 內 qty 如包含中文單位（如 `qty:2卷`、`qty:數支`、`qty:3-4`）必須用引號包住，否則 JS parse 會 crash。c09/c10/c11/c12 已經全部修正為字串；c13/c14 直接用字串。

## 7. renderMeeting 通用渲染規則（app.js）

`App.renderMeeting(tid)` 根據 `DATA.meetings` 入面 `m` 物件嘅 flag 自動渲染：

- `m.sensitive:true` → 橙色警告卡（c03）
- `m.outdoor:true` → 藍色室外警告卡 + `m.personalKit` / `m.doNotBring` 清單
- `m.full:true` → 用 `m.data = Cxx` 完整渲染
- `m.special:true` → 自動顯示崗位表（roles）、頒發物品（items）、禮成後跟進（postCeremony）、補充小知識（trivia）
- 通用區塊：領袖預備（leaderPrep）、🎤開場白（script，如有；c10+ 已改為 segment-level leaderScript）、9 段程序表、🎒執袋、📝家長通知、✂️工作紙、💌承諾卡（如有）、👥崗位、🎖️物品、👀觀察/檢查、📬禮成、🆘後備、🃏情境卡、💡小知識、⚠️安全

renderMeeting 已升級支援兩種格式混合——c01-c09 用 inline `{ n:1, min:5, ...}` 舊格式，c10–c24 用 multi-line `{ n:'...', t:10, steps:[...]}` 新格式，兩者皆可正常渲染。24 場已全完成，無需再寫新教案。

## 8. PWA 與 Cache

- Service Worker 檔案：`sw.js`
- Cache 命名：`scout-v{N}-c{XX}-YYYYMMDD`
- 每加一個新 cXX-lesson.js，要做 3 件事：
  1. `index.html` 加 `<script src="js/cXX-lesson.js"></script>`
  2. `data.js` 將對應 placeholder 替換為 `full:true, special?/outdoor?/sensitive?, data:Cxx, bag?/notice?/personalKit?/doNotBring?`
  3. `sw.js`：升級 CACHE 版本字串，ASSETS 加 `js/cXX-lesson.js`
- 清 cache 方法：用戶 hard reload 或 SW 更新時自動換

## 9. 外部資源來源（已 fetch，內容已應用）

| URL | 用途 |
|---|---|
| https://prog.scouting.org.hk/scouts/ | 童軍支部大綱（c02 歷史、全球童軍資料） |
| https://uniform.scouting.org.hk/ + https://www.scout.org.hk/uploads/member/Scout_B.1.jpg 等 6 張 | 制服官網熱連圖 |
| https://www.scout.org.hk/uploads/tc/circulars/16450/guidelines-of-chinese-foot-drill...pdf | 中式隊列指引 |
| https://scout-circulars.vercel.app/ | 通告圖書館（報班流程截圖教學） |

## 10. 測試

```bash
cd /home/user/scoutmeeting
npm test    # 跑 tests/smoke.mjs，97 項，必須全部 ✅ 先好 merge
```

**注意**：之前嘅 test 用正則去 count program segments，c11/c12 用多行格式之後改咗做直接 `vm.runInContext()` 載入後數 `.program.length`，呢個方法穩陣好多。日後加新場都係沿用呢個方式。

測試依家會驗：
- 所有檔案存在、icon 係 PNG、HTML 有齊外連/script
- 制服官網 URL 存在、通告圖書館「訂閱」提及、districtbadgesystem30 標明只係專章
- 7 套儀式卡、33 個興趣章
- 每個 c01-c24 都 parse 到、program.length === 9、bag/safety 陣列存在
- 每個 lesson 獨有關鍵字存在（例如 c10 一定要有「Leave No Trace」/「撤退」；c12 一定要有「電子蠟燭」/「自願」/「思善卡」；c13 一定要有「左壓右」/「接力賽」；c14 一定要有「兔仔」/「拖木頭」/「收繩」；c16 一定要有「帳篷」/「拔營」/「指南針」；c23 一定要有「踩水」/「HELP」）
- renderMeeting(c01-c24) 全部可正常呼叫（用 fake DOM stub）
- sw.js cache 版本升級、README 提及最新 cXX

## 11. 已知限制 / 技術債

1. **制服圖片熱連**——官網 TLS 曾經 wget/curl fail，但瀏覽器入到，暫時熱連；如將來官網改路徑要更新 uniform.js
2. **素材庫/技能/小隊 tab** 全部係 placeholder（🚧），需要做：
   - ~~素材：c01-c24 工作紙列印版、技能 9 卡、小隊制度工具、歌紙、SVG 圖解~~（v17＋v18 已完成 ✅）
3. ~~**搜尋功能（🔍）** 暫時跳去 #book~~（v18 已做真搜尋 ✅：即時搜尋＋85 項索引＋熱門關鍵字）
4. **c01-c05 仲用舊 inline 格式**（leaderPrep 其實冇、d.script 有），將來可考慮統一到新格式，但唔強制——renderMeeting 已經兼容
5. ~~**game/activities** 淨係得 4 個常用~~（v17 已擴充到 12 個 ✅，全部有完整玩法/物資/安全）
6. **browser-app-review/browser-practical/browser-print-scope** 等測試檔係早期規劃遺留，未完成，可視乎需要整理或刪除
7. **http server（python3 -m http.server 8080）** 如果 restart 會 kill 咗之前個 process，可再 `python3 -m http.server 8080 &` 重開
8. **img/icon-192.svg** 有 SVG 源檔，但 ImageMagick 缺 rsvg-convert 所以唔可以直接 convert 去 PNG，將來改 icon 可以繼續用 generate_image 出 1024×1024 PNG 再 resize 覆蓋 icons/icon-512.png
9. ~~**print CSS** 未特別優化~~（早已有完整 `@media print` 系統；v17 再加咗隱藏 `.print-btn`/`.filters` ✅）
10. ~~**歡呼庫/歌書**完全未做~~（v17 歡呼＋v18 歌紙 ✅：國歌＋2 原創營火歌＋歌單＋自創工作坊）
11. ~~指南針方位已由 c13 延後~~（v16 已落實：c16 Day2 加入指南針定向遊戲＋C16 gap 註明呼應 c09 承諾，閉環完成 ✅）
12. **index.html 載入 `js/redesign.js` 但檔案唔存在**（404，前人遺留；暫無害因為 App.init 有 try/catch，但最好下次清走或補回檔案）
13. ~~執袋表冇 note 會顯示 undefined~~（v15 已修：app.js 加咗 `(x.note||'')` fallback）

## 12. 下一步優先次序（建議）

> v16 已完成：c15–c24 全數補完，24 場集會 24/24 全完成！🎉（指南針閉環：c16 落實）
> v17 已完成：10 個 tab 內容全補齊！🎉（素材庫/12遊戲/9技能卡/小隊工具＋列印隱藏）
> v18 已完成：歌紙＋SVG 圖解＋全站搜尋！🎉（國歌/原創歌/歌單；17 SVG；85 項搜尋索引）

1. 清走 `js/redesign.js` 死引用（見第 11 節第 12 點）
2. （預留）更多 SVG 圖解（復原臥式、十字紮）、歌紙加歌

## 13. 開發命令

```bash
cd /home/user/scoutmeeting
python3 -m http.server 8080   # 開 dev server（如需）
npm test                      # 跑 smoke test
```

## 14. Git 狀態

- working branch 規則：**永遠留喺 `arena/01a0a4b6-scoutmeeting` 做嘢**，合併先落 `main`
- 本 session 已經喺 `arena/01a0a4b6-scoutmeeting` 上開發（由 main v14 fast-forward 合併起步）；完成後經 PR 或 merge 落 `main`，唔好開新 branch（Arena 用呢個 branch 追蹤 session）
- 可以 push：`git push origin arena/01a0a4b6-scoutmeeting`（認證已配置）；合併 main 用 PR（由用戶批）

## 15. 用戶口吻／文案風格

- 全部文案用**香港口語中文**（唔用台灣/大陸用語，唔寫「什么/怎麼/程序」要寫「什麼/怎麼/程序」——其實用返「程序/咩/點/嘅/咗/喺/嘅/啲/唔/係」呢種日常講法）
- 對象係**香港童軍領袖**（包括新手領袖），所以要 step-by-step、白話、唔使用童軍術語唔解釋
- 家長通知要**正式但親切**，一定要有簽署欄
- 安全條款一定要用 ⚠️ 標示，同埋講明「兩人規則」「1:6 比例」「持急救證書」呢啲硬規則
- 家長 Q&A 要預先回答家長最關心嘅問題（收費？安全？宗教？過敏？）

---
**Last agent 完成時間**：2026-09-16（v18：歌紙＋SVG 圖解＋全站搜尋全完成！）
**最後完成**：v18（歌紙/17 SVG/搜尋85項索引）
**smoke test**：108 項全通過
**http server**：如需要可 `cd /home/user/scoutmeeting && python3 -m http.server 8080` 重開


---

## 16. v19 改動記錄（2026-09-15，用戶 12 項回饋）

| # | 要求 | 做法 |
|---|---|---|
| 1 | tab 內容太長要分頁 | 新增 `App.subnav`（tab/sub 路由）＋`App.chiprow`（錨點跳位）；制服=陸/海/空/徽章/自查、儀式=7套逐一、手冊=6分頁、技能=9分頁、營火歌=11首歌紙分頁；集會詳情頁頂部加節位 chips |
| 2 | 做 APP ICON | generate_image 出 1024 原圖→ImageMagick crop/resize：icons/icon-192.png、icon-512.png、icon-maskable-512.png；img/icon-192.svg 重畫成對應源檔；manifest 更新 |
| 3 | 興趣章唔放區系統連結 | app.js badges 移除「📝 前往區總部報章系統」；interests.js howToApply 改「團內考核 7 步」（no system CTA）；topbar 📝 保留（供其他組用，註明只係報專科徽章用） |
| 4 | 儀式加分頁補圖 | svg-kit.js 新增 DIAGRAMS.cer（open/close/drill/flag/oath/salute 6 套場位圖）；ceremony.js 每卡加 fig/figcap/rel；#ceremony/<k> 單頁模式＋上一套/下一套導航 |
| 5 | 工作紙定位 | 素材庫直接列 24 場工作紙（.ws-item，逐張「只印呢張」）；集會頁內工作紙保留（跟住做）；lede 寫明上下定位分別 |
| 6 | 列印指邊印邊 | `App.printSec(el)`：clone 目標 .sec/.card/.ws-item 去 #printzone＋body.print-one，@media print 收埋 #app 淨印 printzone；「只印本節」掣遍布各區塊；全場印＝「整場教案全部列印」明示按鈕 |
| 7 | 唔出繩結卡 | 刪素材庫「繩結卡」區、技能「平結/八字/稱人圖解」卡、diagrams.js reef/fig8/bowline 資料；換成 warn callout 指向 c13/c14 教案 |
| 8 | 活動/技能/儀式補圖（興趣章除外） | DIAGRAMS.game 12 張場地擺位圖；DIAGRAMS.skillx（ropecare/legend/tent/stove/knife/rice/sos/lost）；DIAGRAMS.fire（circle/flow/scarf）；badges 維持文字 |
| 9 | 歌紙用童軍營火歌 | 新 js/songs.js：11 首 Public Domain 傳統歌（含兩隻老虎輪唱）＋有版權歌只列名（Kookaburra/熊熊烈火/友誼之光/童軍歌）；刪自創歌＋流行歌單＋自創工作坊 |
| 10 | 小隊tab改營火歌 | 底部 #tabbar 第五格 = 🔥 營火歌 #songs；route 舊 #patrol → #book/patrol redirect；sw/manifest shortcut 更新 |
| 11 | 小隊制度入手册 | book 新增「小隊制度」（制度/小隊長3職責/會議記錄表）＋「集會工具」（計分板/抽籤/倒數/分組）；歡呼庫去營火歌 tab |
| 12 | 目錄整行可撳 | plan-table tr.meet-row onclick＋tabindex＋▶；hover 高亮 |

**測試**：tests/smoke.mjs 已改 v19 版（加：svg-kit/songs 檔存在、icon 尺寸、無繩結卡/無區系統CTA negative test、DIAGRAMS.cer/game/skillx/fire 計數、傳統歌 positive/自創歌 negative、manifest maskable）——108+ 項全綠。
**注意**：sw.js CACHE=scout-v19-c24-20260915（測試斷言 'scout-v19'）；#ceremony/#songs 用 hash sub，SW 唔使理。

---

## 17. v20 改動記錄（2026-09-16，補圖：SVG → 真圖 AVIF，批次 1／3）

用戶指正：**補圖唔好再用我手畫嘅 SVG**（唔專業、又好慢），一次大概只能出 10 張，圖檔格式用 **AVIF**。

### 做法（pipeline，下次繼續照做）
1. `generate_image` 出 1024 級原圖去 `assets_src/figsrc/<key>.png`（呢個 dir 已入 `.gitignore`，唔提交，每次只提交 AVIF）。
2. prompt 必帶風格 lock：`Clean editorial flat illustration with soft shading, warm muted palette, very light off-white background, no text no letters no numbers no watermark no logos`＋**制服必須照 uniform.js 寫實**（陸童軍：深綠軟帽連帽章／杏色短袖恤兩胸袋／草青短褲／棕皮帶童軍扣／深草青直坑紋長襪／黑皮鞋／旅巾連巾圈）。
3. 逐張 `read_file` 睇成品 **有冇畫錯**（手勢、指數、腳位、旗位）；錯嘅部分宁可 crop 走（例：cer-salute 右格半禮畫成兩指 → 淨 crop 左格全禮，半禮改做文字），**唔好擺錯圖教錯人**（同繩結卡同理）。
4. 編 AVIF：`convert src.png -resize '1000x1000>' -strip -quality 58~64 -define avif:pixel-format=yuv420p img/fig/<key>.avif`（IM 6.9 有 libaom，0.5s/張；1000px 約 10–80KB）。
5. 喺 `js/figs.js` 加 key：`{src,w,h,alt,cap}`（w/h 必填防 CLS；alt 寫清楚畫面內容俾螢幕閱讀器＋冇圖時嘅交代；cap 係圖說）。
6. 渲染：`App.ph(key, cap, svgFallback)`（app.js）→ `<figure class="ph-fig">`＋`<img loading=lazy onerror=...>`＋`<details class="dgm-alt no-print">`（舊 SVG 變折疊後備）。load 唔到 AVIF（舊瀏覽器）→ `.imgfail` 收埋圖、auto-open 圖解。
7. 收尾：sw.js ASSETS＋CACHE 版本、`index.html` script、`npm test`（smoke 已加 v20 斷言）。

### 本批（批次 1／3）已出 9 張
| key | 用咩位置 |
|---|---|
| cer-open / cer-close / cer-drill / cer-flag / cer-oath / cer-salute | `#ceremony/<k>` 每張儀式卡主圖（ceremony.js 用 `fig:'open'` → key `'cer-'+fig`；figcap 已改寫到啱「場景示意」） |
| fire-circle | 🔥 營火歌 tab hero（取代 DIAGRAMS.fire.circle 做主圖；flow 仍係圖解） |
| fire-song | 🔥 營火歌 tab 頂部 banner |
| fire-robe | 營火章「營火袍」位（DIAGRAMS.fire.scarf 退居折疊後備） |

cer-flag 圖內旗面刻意只畫色塊（國旗／區旗細節唔好靠 AI），caption 已註明「實際樣式以《隊列和升掛國旗及區旗指引》為準」。

### 未做（下一批先做）
- **批次 2**：遊戲 12 張場圖（`DIAGRAMS.game` 逐個換 AVIF；遊戲名做 key，建議 `game-<slug>`）。
- **批次 3**：技能 8 張（ropecare／legend／tent／stove／knife／rice／sos／lost）＋補返 cer-salute 正確嘅「全禮＋半禮」兩格圖。
- **永遠唔做**：繩結逐步圖（用戶明確禁止）。
- 測試 guard：`smoke.mjs` 會 fail 掉任何 key 符合 `/knot|reef|bowline|fig8|繩結|結/` 嘅 FIGS 項目、任何 >140KB 嘅 AVIF、任何非 `ftypavif` header、以及 sw.js 漏 cache 嘅圖。

**注意**：sw.js `CACHE=scout-v20-c24-20260916`（測試斷言 'scout-v20'）；改圖必需要改 CACHE 名，先至會踢走舊 cache。

### v21 修正（2026-09-16）：補圖唔畫制服
用戶：「唔好生成制服嘅圖，因為會生錯；我哋目標只係讓領袖知道動作」→ 批次 1 全部 9 張**重畫**：
- prompt 加硬規則：`plain neutral practice clothing — light grey t-shirt, dark grey shorts, bare head, NO hat, NO neckerchief, NO badges/patches/emblems/insignia; the image teaches only body position / spacing / sequence`
- 旗照舊只畫**純色塊**（紅高綠矮），caption 註明樣式以《隊列和升掛國旗及區旗指引》為準
- `cer-salute` 由「淨全禮」改成**兩格（全禮＋半禮）**，兩格手勢一致先至夠clear；`cer-drill` C 格喺圖說寫明「圖只係一般行進姿勢，腳手前後次序照文字」（AI 分唔掂左右腳配對邊隻手）
- **抽走 `fire-robe.avif`**（營火袍＝布章位置，屬制服範圍）→ 退回 `DIAGRAMS.fire.scarf` 平面圖解
- 新增 `game-banner.avif`（🎮 活動 tab 封面：設場安全位＋內外圈方向）
- 每張圖說自動加 `FIGS_NOTE`（全域變數，唔放落 FIGS key 入面，避免比 test 當成一張圖）：「圖內人物只係中性練習衫，唔代表制服標準 → 睺 👕 制服 tab 官網圖」
- `App.ph()` 負責 append note；`sw.js` CACHE 升 `scout-v21-c24-20260916`
- 9 張 AVIF 合計 **318KB**（比 v20 更細，因為冇制服細節／紋理）

**smoke test 新增 guard**：FIGS 任何 key 命中 `/robe|uniform|scarf|制服|領巾|布章|章/` 即 fail；`alt` 提到帽章/布章/領巾/杏色/草青 即 fail；`img/fig/fire-robe.avif` 存在即 fail；圖說冇 ph-note 即 fail。
**下一批照跟**：遊戲 12 張、技能 8 張 — 全部中性練習衫，唔画制服、唔画章。

## 18. v22 改動記錄（2026-09-16，補圖批次 2：遊戲 10 張場地圖插畫）

沿用 v21 條鐵律：**唔畫制服**（人物一律灰T＋深灰短褲、冇帽冇領巾冇章）、唔畫繩結打法、唔畫醫療手法細節。

- 新增 10 張 AVIF（`img/fig/`，1000×545 為主，共約 380KB）：`game-ball 直呼其名`、`game-shape 繩索挑戰`、`game-tarp 飛毯`、`game-pack 執包比賽`、`game-relay-cards 結繩接力賽`、`game-tug 拖木頭挑戰`、`game-aid 急救情境賽`、`game-orienteer 定向尋寶`、`game-beachflag 沙灘旗`、`game-water 運水接力`
- `js/figs.js` 加 `GAME_FIG`（遊戲名 → key）；**未入表嘅 2 個遊戲（有口難言／大風吹）自動退回平面擺位圖**（呢兩個「排直線」「圍圈少張凳」用俯視圖已經夠清楚，唔揀佢哋佔額度）
- `App.pages.play`：每卡 `App.ph(GAME_FIG[g.n], cap, DIAGRAMS.game[g.n])` → 有圖＝AVIF 主圖＋折疊平面圖；冇圖＝照舊 dgm-fig（唔會出空白）
- 圖說帶安全提示：`game-tug`／`game-relay-cards` 寫明「結點打照 c13/c14，本 app 唔出結圖」；`game-aid` 寫明「手法照 c17」；`game-beachflag` 寫明「圖上海喺盡頭係場景，實際旗線要離水線好遠」；`game-pack` 寫明「利器唔入物料池」
- 搜尋索引 desc 會分「附實景示意圖＋場地圖」／「附場地圖」
- `sw.js` CACHE=`scout-v22-c24-20260916`，ASSETS 加入 10 張
- smoke test 新增：`GAME_FIG` 覆蓋 10／未補圖必須得 2／逐遊戲 render 檢查 ph-fig 或 dgm-fig／game-* 嘅 alt 命中 `帽章|領巾|布章|巾圈|旅巾|制服|童軍帽` 即 fail／alt 出現繩結打法名即 fail／sw 漏圖即 fail

**批次 3（最後一輪）待辦**：`DIAGRAMS.skillx` 八張（ropecare／legend／tent／stove／knife／rice／sos／lost）換 AVIF ＋ `game-lineup 有口難言`、`game-chairs 大風吹`。注意 `skillx.rope care`／`stove`／`knife` 三張：只畫**場合同要點**（捲繩手法唔出逐步圖、爐具只示擺位同通風、刀只示「唔傳刀、刀尖向自己」呢類原則），涉及結法／包紮／切法步驟一律留文字＋教案連結。

## 19. v23 改動記錄（2026-09-16，補圖批次 3：技能 6 張＋有口難言；QA 擋走 3 張）

出咗 10 張、**收 7 張**，另外 3 張我 QA 自己 fail 咗冇放落 repo（原圖喺 `assets_src/figsrc/`，gitignore 內）：

| 狀態 | 圖 | 理由 |
|---|---|---|
| ✅ | skill-ropecare / skill-legend / skill-tent / skill-stove / skill-rice / skill-lost | 動作＋距離＋位置講得啱（45° 營繩、3 米線、抬高過心口、氣罐直立分開） |
| ✅ | game-lineup（有口難言） | 直線＋手指貼嘴＋袋水放界外，冇可畫錯嘅細節 |
| ❌ | skill-knife | 右格畫成「刃向人交接」（應該俾柄）＋左格扶木隻手喺刀前；呢類一錯就會傷人 |
| ❌ | skill-sos | 天上音波畫咗 4 組（要 3 短 3 長 3 短）；節奏错＝教錯 |
| ❌ | game-chairs | 凳數冇滿足「少一張」，睇圖設場會玩唔成 |

**守住唔准回流**：`tests/smoke.mjs` 有斷言——`img/fig/skill-knife.avif`／`skill-sos.avif`／`game-chairs.avif` 一出現即 fail；`SKILL_FIG` 出現 `knife`／`sos` 即 fail；`GAME_FIG` 出現「大風吹」即 fail；`img/fig` 有孤兒圖（冇入 FIGS 或冇入 sw）即 fail。
=> 下一批重出呢三張時，prompt 要寫死：刀「blade folded, handle toward receiver, blade end held by giver only」；SOS「exactly three groups of arcs: 3 short, 3 long, 3 short, nothing else」；凳「chairs = players − 1, count them: 10 chairs, 11 players」。

### 其他接入
- `App.pages.skills` 嘅 `figFor()` 改行 `SKILL_FIG` → 有圖用 `App.ph()`（AVIF＋折疊平面圖解），冇圖（rope 口訣/SOS/先鋒紮作）自動退回 `dgm-fig`；`css` 加 `.svg-steps .ph-fig{flex:1 1 100%}`
- 圖說全部寫明邊度「圖冇畫、要照文字」：收繩圈繞步驟、爐具漏氣／熄火次序、包紮力度與燙傷五步
- `sw.js` CACHE=`scout-v23-c24-20260916`，ASSETS 26 張圖；全場插畫 886KB（AVIF q58–64／1000px）
- 而家覆蓋率：儀式 6/6、遊戲 11/12、技能 6/8（另 2 張刻意用圖解）、營火／歌 3/3、制服 0（只用官網圖，永久規則）、興趣章 0（用戶話唔使）

## 20. v24 改動記錄（2026-09-16，用戶抓錯：儀式圖逐張 QA）

用戶指出 `cer-oath` 兩個錯：**(1) 領袖雙手合什（祈禱式，唔係童軍動作）(2) 團旗插喺團長與新成員中間 → 二人無法「面對團長及團旗」；排位怪**。跟手要求「儀式認真睇返有冇錯」（遊戲/活動按文字生成、錯嘅機會低、無傷大雅 → 唔使逐張重做）。

### 逐張核對結果（對住 `js/ceremony.js` 程序）
| 圖 | 發現 | 處理 |
|---|---|---|
| cer-oath | 合什＋旗喺中間 | 重出：`COMPLETELY EMPTY floor between them — no pole, no stand`＋`no praying hands, no palms pressed together, no folded/clasped hands`＋`ONE SINGLE flag pole, no second pole, no pennant` |
| cer-salute | 左格全禮像得兩指（角度遮無名指），右格三指啱 | 重出（手畫大、兩格幾何一致、寫明「exactly three straight extended fingers」）＋圖說加「數手指照右格」 |
| cer-open | 「團旗喺右側」有歧義（畫面右 vs 隊員右手邊）；隊列散 | 改由**隊員背後**睇（畫面右＝隊列右翼，零歧義）＋整齊直排；顺手 crop 走左邊多餘木架（1392→1000×727，FIGS w/h 已更新） |
| cer-flag | 人物冇戴帽卻行三指禮（程序：戴帽三指禮、無帽注目禮） | 圖冇再重出（重出風險係旗位又錯）；改喺 figcap＋FIGS cap 補返呢條，話明「圖冇畫帽係避免畫錯制服，教嗰陣要補」 |
| cer-close | 折旗／交接無硬傷 | 保留 |
| cer-drill | 行進腳手配對圖唔可靠 | 保留（圖說已寫「次序照文字」） |
| skill-knife／skill-sos（v23 被 QA fail） | 用硬指令重出通過：刀「俾柄唔俾刃」＋跌刀後退舉手；SOS 恰好「三組、每組三條、冇第四組」 | 入 `SKILL_FIG`（技能插畫 8/8 齊） |
| game-chairs | 凳數仍唔啱「少一張」 | **繼續 ban**（smoke test 断言檔案唔准存在） |

### 下次補圖／改圖必守（QA SOP）
1. 圖生成後**一定要 `read_file` 睇返**，逐項對程序文字：手勢手指數、旗／物位置、人與人關係（面對面／背向）、物件有冇多餘、帽與程序條文有冇矛盾。
2. prompt 用**可數嘅硬約束**：`exactly three groups of arcs, nine arcs total, no fourth group`／`ONE SINGLE flag pole`／`no praying hands, no clasped hands`／`chairs = players − 1`。
3. 有歧義嘅「左／右」改用視角消歧義（例如由隊員背後睇，畫面右＝右翼）。
4. 錯得會教錯人 → **唔 ship**：檔名入 `tests/smoke.mjs` ban 名單（一出現即 fail），原圖留 `assets_src/figsrc/`（gitignore）等改 prompt 重出。
5. 圖做唔到但程序要緊 → 寫入 `figcap`／`cap`（例：升旗戴帽條文、敬禮以邊格作準、收繩步驟照文字）。
6. 改咗圖就改 CACHE（`scout-vNN`）；改咗尺寸就改 `FIGS.w/h`（新断言會用 `identify` 對實際尺寸）。

### 容量／測試
- 28 張 AVIF = 929KB（上限放寬到 1.2MB，逐張 ≤140KB；smoke test 有斷言）
- 新斷言：oath「唔係合十」＋「旗唔准喺二人之間」、salute「照右格數手指」、open「右翼定義」、flag「戴帽行三指禮」缺席即 fail；每張儀式圖實際像素要等於 `FIGS.w/h`；`SKILL_FIG` 必須 8 項；`game-chairs.avif` 存在即 fail
- `sw.js` CACHE=`scout-v24-c24-20260916`（+skill-knife、+skill-sos）

## 21. v25 改動記錄（2026-09-16，用戶提供官方《步操手冊》→ 逐項對照修正）

用戶比咗 Drive 連結（`https://drive.google.com/file/d/1g4M6C7e1K7tVDkr2IADdkebm1CjljI-l/view`）＝**《步操手冊》DRILL MANUAL，香港童軍總會 2000 新版**（青少年活動總監陳肖齢序、步操教練員黃志樂主席編訂）。用 `fetch_page` 讀到嘅係**文字層**：序／目錄／述語定義／第1章／第2章（施教步操・致敬）／第3章§1–§2 開頭。**第3章其餘、第4–8章、附錄甲–戊大部分係掃描圖冇文字層 → 攞唔到**，呢啲位置一律標「照紙本核對」，唔好自創。

### 改咗啲（全部標明章節出處）
| 位置 | 之前（憑印象） | 依家（手冊） |
|---|---|---|
| 立正 c01 教案＋步操卡＋圖解 | 腳尖向外**約 45 度**、雙手下垂手指自然彎曲 | 腳尖向外**與中線成 30 度**、雙膝蹬直、**雙手握拳**、手踭蹬直、母指指甲向前放食指上面、母指壓住**褲骨**、後顎貼衣領、眼望無限遠；口令「立正（**Alert**）」 |
| 集會用嗰個口令 | 冇講 | Attention／Squad Shun／Parade Shun 動作相同，但**只適用於典禮、訓練班、其他制服團體，一般童軍集會不建議用**（第3章§2 註） |
| 熱身 | 冇 | 新增**抽膝踏步**（Bend the left (right) knee!，大腿與地面平行、小腿放鬆、拳貼褲骨）＋**彈前腳**（Shoot the right (left) foot forward!，半步 **375mm**）＋交替練習（第3章§1）；c01 加咗 4 分鐘步驟（分鐘數重新配平：2+8+5+5+4+4+2=30） |
| 口令結構 | 「預令＋動令」 | **介令 → 預令 → 動令**（Move to the right in threes / Right / March）；原地停「標準停頓時距」＝**1.5 秒（每分鐘 40 個動作）**；快步預令→動令 ≤4 步、慢步 ≤3 步；打數期間「Two—Three」全身不動（第2章§7–11） |
| 步速步幅 | 步幅約 75cm | 快/慢步操步幅 **750mm**、大跨步 830、短跨步 530、加快 1000、橫移 305；快步 **116 步/分鐘**（新隊員最多 140）、慢步 65、加快 180（第2章§12） |
| 教具 | 冇 | 拍子機／鼓／步規＋鼓手站位＋40 次/分鐘校法（第2章§3）；隊形用途：**直行＝步操、半圓＝棍操／旗操、開闊排＋斜轉＝原地敬禮**；唔好面向太陽／當風（第2章§2.1） |
| 紅線 | 「唔係罰企」（口頭） | 明文引用：**步操無論如何唔准用作懲罰**（第2章§3.1(己)） |
| 升旗「敬禮」 | 「戴帽行三指禮、**無帽行注目禮**」（無據） | 改用手冊條文：奏國歌時**隊列中童軍立正致敬**、領隊或單獨一人**舉手敬禮**、**穿便服／制服不整齊→只肅立不舉手**（§3(丙)、§6.3）；「戴帽先舉手」降為單位慣例 → 要問區總部 |
| 敬禮卡 | 只有四種禮 | 加：**§6.1** 兩人以上由一名領袖／領隊舉手，其餘立正；**§6.2** 冇領袖時由**最右方隊員**舉手；**§5.1** 行進間「MARCH TO ATTENTION!」→「EYES — RIGHT!/LEFT!」；**§5** 每日向同一童軍人士只致敬一次；**§2.1** 典禮必須致敬對象（國家領導人・特首・總領袖/港監及其代表・主禮嘉賓）；**§4.1** 靈柩；§1.1 敬禮嘅意義 |
| 集隊卡 | 「右翼」口語 | 官方術語：**睇齊**（Dressing）、**引導翼**（Directing Flank，用作睇齊嗰邊）、**側翼**、**標號員**（Markers）、**空行**留空規則（三排留最左數起第二行中排／中排＋後排；兩排留後排最左數起第三行）、**收窄排 750mm／開闊排 1500mm**、**As you were**（取消口令）；第8章七款**集隊手號**名稱已列（直線／直線由高至矮／直行／闊橫排／窄橫排／馬蹄鐵形／開口正方形），⚠️動作喺圖冇文字層 → 標「照紙本核對先教」 |

### 圖（三張重出＋尺寸更新）
- `cer-oath`：其他人立正改成**握拳貼褲骨**（舊圖開掌）；二人中間真空、淨返一支旗（v4 通過 QA）
- `cer-open`：v2 出咗**制服＋膊頭布章**（違反「唔准画制服」）→ v3 全部灰色練習衫、無帽無章；全员握拳立正
- `cer-drill`：加**握拳放大圓圈**（拇指壓食指）＋稍息／行進拳；檔底有英文 panel 標籤（POSITION OF ATTENTION／STAND AT EASE／MARCHING）＝手冊口令原文，可接受
- FIGS 尺寸跟住改：`cer-open 1000×558`、`cer-oath 1000×545`、`cer-drill 1000×330`（smoke test 會用 `identify` 核對實際像素）
- 插畫總量 28 張 967KB；`sw.js` CACHE=`scout-v25-c24-20260916`

### QA SOP 加多一條（第 8 步）
**有官方手冊嘅項目（儀式／步操／禮節）一定要查手冊原文先寫**——唔好靠印象或別本指引嘅數字；AI 圖 prompt 要寫到手冊級細節（角度、握拳與拇指位置、腳位），否則畫出嚅就係錯。手冊冇文字層嘅章節：標「照紙本核對」＋喺 cards 內寫明我哋份電子檔睇唔到，唔准自創。

### 仍然未做（要用戶幫手）
1. 第4–5章（快步／慢步開步停步、行進間轉向、行進間敬禮）動作文字 → 需要紙本頁（可影相畀我）
2. 第6章 集隊成三排／報數／睇齊／開闊排／解散／行進間注目禮 → 一樣
3. 第7章 **旗操**（持旗立正・持旗稍息・攜旗・托旗・換手・讓旗幟飄揚・抓回旗幟・原地敬禮）→ 呢啲先至係旗手真正要學嘅嘢，依家只能列術語
4. 第8章 集隊手號**動作**
5. 附錄丙 檢閱會操／附錄丁 結業會操／附錄戊 檢閱須知 → 大会操程序若要做到「照手冊」就要呢三頁
