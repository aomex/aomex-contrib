# AGENTS.md

面向在本仓库工作的 AI Agent。

## 仓库定位

- 本仓是 **aomex 周边**，不是核心运行时
- 通用协议 / 框架能力应进主仓 `aomex`；厂商预设、非标准适配、可选集成放本仓
- npm scope：`@aomex-contrib/*`；不要占用 `@aomex/*` 冒充核心包
- 厂商「非 redirect OAuth」登录（如微信小程序 `jscode2session`、Google GIS credential）单独开 `*-login` 包，不要塞进对应 `oauth2-*`

## 依赖

- 对 `@aomex/web`、`@aomex/oauth2-client`、`@aomex/cache` 等使用 **peerDependencies**
- 禁止把主仓源码复制进本仓

## 文档与文案

- 代码注释、JSDoc、`README.md` 使用简体中文
- 用法写在各自包的 `README.md`（如 `packages/oauth2-wechat/README.md`），不要只留标题与文档站链接
- README 安装命令**不要**再写 `@aomex/cache`、`@aomex/web`、`@aomex/common` 等基础包；用法示例里按需 `import` 即可
- **不要**由 Agent 主动生成或改写 `CHANGELOG.md`；由 Changesets 在 `pnpm version` 时写入

## 环境与工具（对齐主仓）

- 运行时：`node >= 24.0.0`，包管理：`pnpm`
- 提交信息：conventional commits（commitlint）
- 格式化：Prettier；提交前 husky 会跑 `prettier --check` 与 `tsc`
- 测试：vitest；构建：各包 `prepublishOnly`（tsdown）

## 发包

- 使用 Changesets：改代码后补 changeset，发布走 `pnpm version` / `pnpm release`
