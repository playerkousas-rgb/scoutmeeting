# 集會教案統一改法（2026-10-22）

> 對象：童軍集會 APP（`c01`–`c24`）及其他 MEETING APP。
> 目標：同一份資料格式、同一條時間合約、同一個檢查工具；改完一次過可以驗，唔使逐場靠眼。

---

## 一、每場必備欄位（`DATA.meetings[]`）

| 欄位 | 要求 | 例子 |
|---|---|---|
| `tid` | `c01`–`c24`，唯一 | `c07` |
| `n` | 主題（唔好寫成「第 X 次集會」咁空泛） | `童軍歷史與世界／香港童軍運動` |
| `month` | 可被 `App.monthNums()` 解析（`9-10月`／`5月`／`7–8月`） | `9-10月（第2次集會）` |
| `badge` | 對應獎章／專章，冇就寫「恆常訓練」 | `會員章 m3` |
| `venue` | 場地要求（室內／室外／泳池／沙灘…） | `室內（可貼世界地圖…）` |
| `form` | `恆常集會`／`特別集會`／`室外活動` | `恆常集會` |
| `duration` | 全場分鐘（正整數） | `90` |
| `buffer` | 報到／小息／收場／交通等**無逐段列出**嘅分鐘；冇就省略（視為 0） | `10` |
| `goal` | 3–4 個可觀察目標 | `(1) 講出…(2) 知道…(3) 完成…` |
| `evidence` | 用咩證明達到目標（觀察／作品／工作紙） | `小隊完成時間線＋…` |
| `gap` | 本場**未涵蓋**乜、要邊場補 | `本場未涵蓋完整敬禮…需 c02–c05 補足` |
| `full` | 教案係咪完整（`true` 才入素材庫工作紙） | `true` |
| `data` | 以下 9 個子項 | 見下 |

`data` 必備：

- `program`：**9 段**，每段有標題＋分鐘（≥0 的數字）。兩種寫法都得：
  - `{ n:1, min:5, type:'準備', label:'場地及儀式準備', leader:'…', mats:['…'] }`
  - `{ n:'集合＋開始儀式', t:5 }`（`n` 係標題、`t` 係分鐘）
- `bag`：≥3 項（`{n,qty,type,note}`）
- `notice`：家長通知（字串，或 `{title,items[]}`）
- `worksheet`：`prompts[]` 或 `fields[]`，≥3 題；成員用，**唔可以有領袖答案**
- `observation`：`items[]`（或 `{title,items[]}`），≥3 條
- `safety`：≥3 條
- `practical`：人少／缺物資／唔投入等後備方案
- `script`：領袖開場白（可選但建議）
- `meta`：`tid/n/month/badge/venue/form/duration/goal` 鏡像（部分渲染用）

---

## 二、時間合約（最常錯）

```
Σ(每段 program 分鐘) + (buffer || 0) === duration
```

- `buffer` 係**已計算但無逐段列出**嘅時間（報到、小息、收場、交通、事後跟進）；唔好同「預備」段重複計。
- 例：c16 過夜露營 `1260 + 360 = 1620`（27 小時）；c08 `170 + 10 = 180`。
- 前端會顯示「程序表 N 分鐘＋預留 M 分鐘＝全場 D 分鐘」；數字對唔上就係內容 bug，唔係顯示 bug。

---

## 三、四條鐵律

1. **官方原文唔可以改**：誓詞、規律、銘言、團呼口令、急救條件逐字照抄；`gap` 只講「未涵蓋」，唔好淡化。
2. **練習 ≠ 考核**：寫「練習／示範／初步掌握」，唔可以寫「已通過考核」。
3. **工作紙只收學習內容**：唔可以有領袖答案、唔可以要求小朋友填姓名以外嘅個人資料／相片。
4. **每場都要有 `gap`**：講明未涵蓋乜、要邊場或邊個途徑補。

---

## 四、批量改次序（唔會改到亂）

1. 先改 `js/data.js` 的 `tid/n/month/badge/venue/form/duration/buffer/goal/evidence/gap`。
2. 再改 `js/cXX-lesson.js` 的 `data.program`（保持 9 段）；如要加／減時間，先加 `buffer`，唔好硬塞第 10 段。
3. 改 `data.worksheet`／`observation`／`safety`（成員用 vs 領袖用分清楚）。
4. 跑 `node tools/meeting-audit.mjs`；逐場睇 ❌。
5. 改 `js/app.js` 只在**共通邏輯**（例如時間合約提示、摺疊、分批），唔好逐場寫 if。
6. `npm test`＋jsdom 掃路由；最後升 `CACHE`。

---

## 五、檢查工具

```bash
node tools/meeting-audit.mjs            # 逐場列表（✅／❌）
node tools/meeting-audit.mjs --strict   # 有問題 exit 1（合併／部署前用）
node tools/meeting-audit.mjs --json     # 出 JSON
npm run test:meetings                   # 同上 --strict
```

工具會驗：`tid` 格式／重複、必備欄位、`duration`、9 段程序、每段分鐘係數字、`Σ + buffer = duration`、`bag`／`data.bag`、家長通知、`safety`、`practical`、工作紙題目、觀察記錄。

現況（2026-10-22）：**24 場全部 ✅**。

---

## 六、驗收清單

- [ ] `node tools/meeting-audit.mjs --strict` exit 0
- [ ] `npm test` 全綠
- [ ] 每場手動開一次：9 段程序、時間合約句、家長通知、工作紙、觀察記錄、安全
- [ ] 工作紙／家長通知列印出紙（`App.printSec` 會自動開 `details`）
- [ ] `gap` 睇得明（家長／新領袖都明）
- [ ] 冇任何「已通過考核」字句（練習場合）
