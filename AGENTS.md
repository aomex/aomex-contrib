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
- 可选配置的默认值在 JSDoc 里写 **`默认值：\`xxx\``**，不要用 `@default`
  - 例：`/** 是否无头。默认值：\`true\` _/`、`/_* 默认值：\`{ width: 1400, height: 800 }\` */`
- 用法写在各自包的 `README.md`（如 `packages/oauth2-wechat/README.md`），不要只留标题与文档站链接
- README 安装命令**不要**再写 `@aomex/cache`、`@aomex/web`、`@aomex/common` 等基础包；用法示例里按需 `import` 即可
- **不要**由 Agent 主动生成或改写 `CHANGELOG.md`；由 Changesets 在 `pnpm version` 时写入

## 环境与工具（对齐主仓）

- 运行时：`node >= 24.0.0`，包管理：`pnpm`
- 提交信息：conventional commits（commitlint）
- 格式化：Prettier；提交前 husky 会跑 `prettier --check` 与 `tsc`
- 测试：vitest；构建：各包 `prepublishOnly`（tsdown）

## 审查

- 改动 `src/i18n` 或新增文案键时，核对语言包是否齐全：`locales` 文件名与同仓已有包一致（如 `packages/oauth2-wechat/src/i18n/locales`）。`zh-cn.ts` 是母本，`en-us.ts` 是同步英文，其余语言 `export default`，键和 `{{占位符}}` 与母本一致。`en-GB`、`fr-BE`、`fr-CA`、`nl-BE`、`es-US` 走别名，分别用 `en-us`、`fr-fr`、`nl-nl`、`es-es`，不单独建文件。只有中英、缺其它语言文件即不完整。

## 发包

- 使用 Changesets：改代码后补 changeset，发布走 `pnpm version` / `pnpm release`
