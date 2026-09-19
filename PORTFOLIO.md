# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。
專案從基本的待辦事項管理開始，逐步加入主題切換與清單篩選。
目前也支援批次清除功能。
並保留使用者的資料與偏好設定。

## 線上展示

[開啟 GitHub Pages](https://coffee0127.github.io/my-copilot-workshop/)

## 功能

- 新增待辦事項，空白內容不會被加入清單。
- 勾選待辦事項為已完成，文字會顯示刪除線並淡化。
- 刪除單筆待辦事項。
- 顯示整體未完成項目數量。
- 清單沒有項目時顯示提示文字。
- 使用「全部」、「未完成」、「已完成」篩選待辦事項。
- 篩選結果為空時顯示對應提示。
- 使用者仍可切回「全部」查看資料。
- 清除所有已完成項目，操作前會使用瀏覽器內建確認對話框。
- 沒有已完成項目時停用「清除已完成」按鈕。
- 使用深色模式切換按鈕，在淺色與深色介面之間切換。
- 使用者沒有手動選擇主題時，跟隨作業系統的深淺色設定。
- 將待辦事項與主題偏好保存到 `localStorage`，重新整理後仍會保留。
- 支援手機螢幕與鍵盤操作，並提供按鈕的 `aria-label`。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 沒有使用框架或第三方套件。
- 沒有引用外部 CDN，可離線開啟與使用。
- CSS 顏色集中使用 `:root` 與主題變數管理。
- 待辦事項與主題偏好使用瀏覽器的 `localStorage` 保存。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依照逐步提示建立待辦清單介面與互動功能。
- 使用 MCP 連接 Microsoft Learn 與 GitHub，查詢官方文件與讀取 issue。
- 依 issue 內容進行修正，並保留可追蹤的修改依據。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義 agentic workflow。
- 依序完成讀取問題、提出計畫、建立分支、修改與驗證。
- 接著提交、推送並建立 Pull Request。
- 使用 Git 分支與 Pull Request 管理功能變更。
- 讓每次修改都能對應到明確的 issue。

## 我學到什麼

- 如何用 Agent Mode 將需求拆成可執行的開發步驟。
- 如何使用 CSS 變數與 `prefers-color-scheme` 建立可切換的主題配色。
- 如何用原生 JavaScript 管理篩選、批次刪除與 `localStorage` 狀態同步。
- 如何透過 MCP 查詢官方文件與 GitHub issue，讓修改依據更清楚。
- 如何使用分支、commit 與 Pull Request 管理功能開發與修正流程。
