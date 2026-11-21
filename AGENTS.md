# AGENTS.md

面向在本仓库工作的 AI Agent。

## 仓库定位

- 本仓是 **aomex 周边**，不是核心运行时
- 通用协议 / 框架能力应进主仓 `aomex`；厂商预设、非标准适配、可选集成放本仓
- npm scope：`@aomex-contrib/*`；不要占用 `@aomex/*` 冒充核心包

## 依赖

- 对 `@aomex/web`、`@aomex/oauth2-client`、`@aomex/cache` 等使用 **peerDependencies**
- 禁止把主仓源码复制进本仓

## 文档与文案

- 代码注释、JSDoc、`README.md` 使用简体中文
- 各包 `README.md` 仅含包名标题与指向说明（或主文档站链接），**不要写长用法教程**（与主仓约定一致时可只写标题 + 文档链接）
- **不要**由 Agent 主动生成或改写 `CHANGELOG.md`；由 Changesets 在 `pnpm version` 时写入

## 发包

- 使用 Changesets：改代码后补 changeset，发布走 `pnpm version` / `pnpm release`
