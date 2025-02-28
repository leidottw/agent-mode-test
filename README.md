# DeltaGrid

Angular-based power grid management system.

## 概述 (Overview)

DeltaGrid 是一個基於 Angular 19.2.0 搭建的電網管理系統，提供直觀的使用者介面和高效能的數據處理能力。

## 開發環境設置 (Development Setup)

### 前置需求

- Node.js (18.x 或更高版本)
- npm 或 yarn
- Angular CLI

### 安裝步驟

1. 克隆儲存庫:
```bash
git clone [repository-url]
cd DeltaGrid
```

2. 安裝依賴:
```bash
npm install
```

## 啟動開發伺服器 (Development Server)

執行以下命令啟動本地開發伺服器:

```bash
npm start
# 或使用 Angular CLI
ng serve
```

開發伺服器啟動後，打開瀏覽器訪問 `http://localhost:4200/`。當源文件發生更改時，應用將自動重載。

## 建立專案 (Building)

執行以下命令以構建專案:

```bash
npm run build
# 或使用 Angular CLI
ng build
```

構建後的文件將存儲在 `dist/` 目錄中。默認為生產環境優化構建。

## 測試 (Testing)

### 單元測試

執行單元測試:

```bash
npm test
# 或使用 Angular CLI
ng test
```

### 代碼品質

檢查代碼品質:

```bash
npm run lint
```

## 專案架構 (Project Structure)

```
src/
  ├── app/
  │   ├── components/      - 應用元件
  │   ├── services/        - 服務層
  │   └── ...
  ├── assets/              - 靜態資源文件
  │   ├── i18n/            - 國際化資源
  │   └── ...
  └── ...
```

## 功能特點 (Features)

- 響應式儀表板設計
- 多語言支持
- 主題切換功能
- 使用者認證

## 協助開發 (Contributing)

請參閱 `CONTRIBUTING.md` 了解有關貢獻指南的更多信息。

## 授權 (License)

本專案採用 [授權類型] 授權 - 詳見 LICENSE 文件。
