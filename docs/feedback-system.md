# 📮 意見回報系統（Scout Admin 統一回報 v1）

> 加入日期：2026-10-22 ｜ 影響檔案：`index.html`、`js/app.js`、`css/app.css`、`sw.js`
> 結論：童軍集會 APP **原本冇**任何回報／意見渠道；現在接上 Scout Admin 的**統一回報 v1**：一行腳本、無後端、無 API Key，同其他童軍系統同一個看板。

---

## 一、加了什麼

| 位置 | 內容 | 檔案 |
|---|---|---|
| 全站右下角浮動掣 | 官方 widget：`🐛💬 回報 · 意見`（問題回報／意見回饋兩個分頁） | `index.html`（Vercel insights 之後） |
| 手冊 `#book/refs` | 「📮 意見回報」卡：開表單掣＋網頁版表單＋私隱提示＋離線做法 | `js/app.js`（`App.feedbackCard`） |
| 離線／腳本被封 | 撳「開回報表單」→ 模態：可複製文字 `#fb-ta`＋「🌐 網頁版表單」 | `App.feedback()` / `App.copyFeedback()` |
| 樣式 | `#scoutw-fab` 升到底部導覽＋投屏掣之上、≥44px、列印隱藏 | `css/app.css` 尾段（v42 區塊） |

接入碼（就係這一行，放 `index.html` 最後）：

```html
<script src="https://scout-admin-blue.vercel.app/widget.js" data-app="童軍集會" defer></script>
```

- **`data-app="童軍集會"`** 一定要用這個名。
  用「童軍」會被 Scout Admin 的 `SOURCE_ALIASES` 歸入**專章系統**（`badge` 的別名單已有 `童軍`、`scoutbadge`、`scoutbadge.vercel.app`），你嘅回報就會同獎章 APP 撈亂。
- 提交**不需要 API Key、不需要登入**；`name`／`contact`／`troopId` 全部選填（可匿名）。
- 統一 payload：`type`（`issue`／`feedback`）、`sourceApp`、`title`／`desc`／`severity` 或 `fbType`／`content`。
- `defer` 一定要有：唔好阻住首屏 render；離線時腳本載入失敗，頁面照常運作、0 console error。

---

## 二、後台會見到什麼

在 Scout Admin（`https://scout-admin-blue.vercel.app/`）的「問題回報 / 意見回饋」看板：

- 未登記來源：顯示 **`🔹 童軍集會`**（原樣顯示，照樣分流、照樣統計，**唔會漏單**）。
- 想看正式名稱／專屬圖示／固定排序，才需要在 **scout-admin 倉庫**加一行（可選，非必須）：

```js
// scout-admin/index.html  SOURCE_APPS（約第 2145 行）
{ key:'scoutmeeting', icon:'⚜️', label:'童軍集會',
  aliases:['scoutmeeting','scoutmeeting.vercel.app','童軍集會','童軍團集會'] }
```

```js
// scout-admin/apps-script/Code.gs  SOURCE_ALIASES（約第 102 行）加同一組
"童軍集會": ["scoutmeeting", "scoutmeeting.vercel.app", "童軍團集會"]
```

改完依文件重新部署（管理部署 → 編輯 → 版本：新版本），Apps Script 網址不變。

> ⚠️ 別名**唔可以**加 `"童軍"`。`SOURCE_ALIASES` 已把「童軍」對應到「專章系統」；加落去只會令所有童軍支部徽章系統回報變成同一個來源。
> 這兩行**未做**（唔屬本 APP 範圍）；未做都照收得到，只係後台顯示 `🔹 童軍集會`。

---

## 三、離線／被封網時的退路（重要）

本 APP 係離線優先 PWA，但 widget 係**外部腳本**，Service Worker 唔會跨網域快取它。

| 情況 | 行為 |
|---|---|
| 有網 | 右下角出現 `🐛💬 回報 · 意見`，撳開兩個分頁（問題／意見），提交後顯示「✅ 已提交」 |
| 離線／腳本載入失敗 | 浮動掣唔會出現（頁面照常運作、0 錯誤）；手冊「📮 意見回報」卡仍然開得 → 撳「開回報表單」出可複製文字＋網頁版連結 |
| 恢復上網 | 浮動掣自動再出現，唔需要重裝 |

後備模態的行為（`App.feedback()`）：

1. 先搵 `#scoutw-fab`；有就 `fab.click()`，回傳 `true`（用官方 widget）。
2. 搵唔到就開 `App.modal()`，內含 `readonly #fb-ta.fb-copy`（`App.feedbackTemplate()` 文字）、「📋 複製回報文字」、「🌐 網頁版表單」，回傳 `false`（**唔可以靜靜失敗**）。
3. 網頁版表單＝`https://scout-admin-blue.vercel.app/report.html?app=童軍集會`（`encodeURIComponent` 過）。

模板文字（照抄）：

```
【童軍集會｜問題／意見】
類別：（問題回報／意見回饋）
邊一頁：（例：#plan／#plan/c04／#uniform/badge／#book/refs）
發生咩事：（一句講清楚，例如「撳列印冇反應」）
裝置同瀏覽器：（例：iPad Safari）
（可留聯絡方法；唔好填小朋友姓名、班別、地址或相片）
```

---

## 四、私隱界線（寫入 UI，亦寫入測試）

- 只收**問題本身**；卡片同後備模板都寫明：**唔好填小朋友姓名、班別、地址或相片**。
- 無出席／考章資料，無帳戶，無 cookie；提交內容唔會寫入本機儲存。
- 領袖如要留聯絡方法，屬自願欄位（`name`／`contact`）。
- 本 APP 的 `scout.last`／`scout.done` 只存「邊場用過、第幾版」，**唔含人名、隊員名單或考章結果**。

---

## 五、測試鎖（`tests/v42.mjs`）

- `index.html` 有官方 widget 腳本、`data-app="童軍集會"`、有 `defer`；
- **唔准**用 `data-app="童軍"`（會被歸入專章系統）；
- `App.FEEDBACK.app === '童軍集會'`；`page` 含 `report.html?app=`；模板含類別／頁面／裝置＋私隱句；
- 手冊有回報卡（`feedback-card`）、私隱提示、離線做法；
- CSS：`#scoutw-fab` 有 `bottom:calc(var(--tabbar-height) + 62px)`、`min-height:44px`、列印隱藏；
- `App.feedback()`／`copyFeedback()` 存在；腳本未載入時 `feedback()` 回 `false` 並開後備模態。

---

## 六、其他 MEETING APP 要照做的最小步驟

1. `index.html` 最後加一行，只改 `data-app`（見下表）。
2. 可選：手冊／設定頁加一張「📮 意見回報」卡（照抄 `App.feedbackCard()` 結構）。
3. `sw.js` 升 `CACHE` 版號，令舊用戶換新。
4. 跑一次 `npm test`，加一條「唔准用單一支部名做 `data-app`」的斷言。

| APP | `data-app` | 後台 `key`（可選） |
|---|---|---|
| 童軍集會（本 APP） | `童軍集會` | `scoutmeeting` |
| 幼童軍集會 | `幼童軍集會` | `cubmeeting` |
| 深資童軍集會 | `深資童軍集會` | `vsmeeting` |
| 樂行童軍集會 | `樂行童軍集會` | `rovmeeting` |
| 旅團通用 | `旅團集會` | `troopmeeting` |

⚠️ 共通禁忌：**唔好用**「童軍」「幼童軍」「深資童軍」「樂行童軍」單獨做 `data-app`——全部會被 `SOURCE_ALIASES` 歸入「專章系統」。
