# Scout Hub — Handover Notes（交下一個 Agent 用）

> 最後更新：2026-09-15
> 目前 branch：`arena/01a0a4b6-scoutmeeting`（v18 完成：24 場教案＋10 tab＋歌紙＋SVG 圖解＋全站搜尋全齊！🎉，待合併 main；main 目前為 v14）
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
| 🧑‍🤝‍🧑 小隊（patrol） | 🚧 WIP | 列出 5 個功能，未實作 |

**頂欄外連**（icon-only 按鈕）：
- 🔍 搜尋（暫跳去 #book，未做 search 功能）
- 🏅 scoutbadge.vercel.app（**進度性獎章全外連**：會員章/探索/標準/高級/總領袖，本 APP 唔做記錄/考核）
- 📨 scout-circulars.vercel.app（通告圖書館）
- 🆕 📝 districtbadgesystem30.vercel.app（**只係報考專科徽章用**，唔係訓練班系統——用戶明確更正）

## 3. 重要用戶約定（唔可以改）

1. **唔好抄 Cubs Hub 嘅 emoji icon**——用自製森林綠+金百合花飾
2. **完全移除森林故事**（幼童軍先有，童軍支部冇）
3. **下方第 4 tab = 🪢 技能，第 5 tab = 🧑‍🤝‍🧑 小隊**（唔好轉位）
4. **「活動章」tab 改名「興趣章」，只做興趣組**（藍底技能組/紅底服務組/金邊教導組全外連 scoutbadge）
5. **進度性獎章內容/記錄/考核全部外連 scoutbadge**，本 APP 唔做
6. **制服必須用香港童軍總會官網圖片**（熱連 `https://www.scout.org.hk/uploads/member/Scout_B.1.jpg` 等，唔好自己整/改圖）
7. **儀式內容唔自己作**，動作要領文字化；中式隊列參考總會《中式隊列指引》PDF
8. **誓詞/規律/銘言已核對《童軍訓練綱要》2026-06-06 版**，唔好亂改字眼
9. **「如何報考訓練班」**必須教用通告圖書館訂閱：通知面板 → 剔支部/分類 → 啟用通知 → 手機加入主畫面
10. **恆常集會為主、特別集會另設專區**；小隊長任務卡首版從簡、領袖主導
11. **集會以 9 段程序為標準結構**（c01-c12 全部 9 段）

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
