# `img/dia/` 手繪圖解來源（54 張 AVIF）

## 呢啲圖係咩

- 全部由 app 自己嘅**手繪 SVG 底稿** raster 而成：底稿喺 `js/diagrams.js`／`js/svg-kit.js`（`DIAGRAMS.*`）。
- 2026-09 用戶回饋「SVG 好醜，盡量唔要 SVG」→ 54 張手繪圖解一律先 raster 成 PNG 再轉 AVIF 出圖；
  前端仍然用 `DIAGRAMS.*`，由 `js/svg-kit.js` 尾段一次過換成 `<img src="img/dia/…">`。
- 換走嘅 SVG 會存落 `IMG.svg`，**只做後備**：瀏覽器唔支援 AVIF 或者圖檔 load 唔到時，`IMG.fallback()` 會換返手繪版。
  所以底稿唔可以刪——`tests/smoke.mjs` 亦係驗底稿入面嘅尺寸線／角度（見下）。

## 檔案清單（54）

| 前綴 | 張數 | 內容 |
| --- | --- | --- |
| `cer-` | 13 | 儀式／步操：集隊、睇齊、立正、稍息、敬禮、三指手形、升旗禮、宣誓站位、集會開始／結束、團呼馬蹄鐵 |
| `uniform-` | 9 | 制服：胸袋／全身徽章位置、局部放大、陸海空顏色配搭、領帶四色、旅巾、木章 |
| `skill-` | 9 | 技能：收繩、地圖圖例、帳篷、爐具、小刀、RICE、SOS、迷路、復原臥式 |
| `fire-` | 3 | 營火：火圈座位、流程、營火袍 |
| `dgm-` | 2 | 指南針八方位、背囊分層 |
| `track-` | 6 | 追蹤符號（箭嘴／圓圈／交叉／轉彎／水／訊息） |
| `game-` | 12 | 遊戲場地俯視圖 |

## 製作方法

1. 底稿 SVG（340 單位闊，除遊戲圖）→ `resvg-js` raster：
   - `cer`／`uniform`／`game`／`skillx`／`fire`：放大 3 倍
   - 指南針／背囊：放大 4 倍　·　追蹤符號：放大 5 倍
   - 字體：`Noto Sans CJK SC`（Regular ＋ Bold），`loadSystemFonts: false`（避免揀錯字）
2. `convert` 轉 AVIF：大圖 `-resize 720x -strip -quality 50`；追蹤符號 `-resize 240x`。
3. 尺寸寫入 `js/dia.js`（`IMG.map`）嘅 `w`／`h`，同 `alt` 文字一齊——前端出圖時一定要有 `width`／`height`，避免跳位。

## 質量檢查

- `node /home/user/svgrender/qa-textink.js`：逐張圖 render 兩次（完整／剷走文字），
  用「文字 bbox 內嘅深色像素比例」＋「文字 bbox 互相重疊」捉**文字壓住圖形**、**文字疊文字**。
  2026-09 用呢個腳本執好 8 處（立正腳形重畫、集隊尺寸線搬位、左胸袋／右袖編號加白底、
  睇齊「一手位」改量 375mm、營火圈標籤搬位等）。目標：0 個壓圖問題。
- `node /home/user/svgrender/qa-render.mjs`：跑 app 所有頁面，確認冇任何頁面再出 `<svg>`。
- `npm test`：`tests/smoke.mjs` 驗 `IMG.map` 每張圖（路徑／尺寸／alt／入 sw.js／檔案存在）、
  驗底稿嘅尺寸線比例（0.05 px/mm）、角度（立正 30°、睇齊 90°）、文字唔出框。

## 重製方法

```bash
node /home/user/svgrender/render-dia.js    # 底稿 → /tmp/diapng → img/dia/*.avif（約 25 秒）
node /home/user/svgrender/gen-dia-js.js    # 按渲染結果更新 js/dia.js（含 alt 文字表）
node /home/user/svgrender/qa-textink.js    # 檢查文字壓圖
```

改咗底稿（`js/diagrams.js`／`js/svg-kit.js`）之後一定要重跑上面三步，否則 app 出嘅 AVIF 會同底稿唔一致。

## 注意

- 圖入面嘅比例係 **0.05 px = 1 mm**（`fS`）；尺寸線一律用 `fDIM()` 出，測試會逐條核對。
- 圖解只畫**中性練習衫**嘅人形，唔會畫制服；制服一律用官方圖（見 `../uni/SOURCES.md`）。
- 繩結照產品規則**不設圖**。
