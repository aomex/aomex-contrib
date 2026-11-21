# aomex-contrib

Aomex **周边** monorepo：厂商预设、非标准协议适配、其它非核心集成。

- 核心运行时仍在 [aomex/aomex](https://github.com/aomex/aomex)
- npm 包使用 scope：`@aomex-contrib/*`
- 版本与 changelog：Changesets（独立发包）

## 开发

```bash
pnpm install
pnpm test
pnpm build
pnpm changeset          # 记录变更
pnpm version            # bump 版本并写 CHANGELOG
pnpm release            # 发布到 npm
```

工具链与主仓对齐：Node >= 24、pnpm、Prettier、commitlint、husky、TypeScript、vitest、tsdown、Changesets。

## 包目录

新建包放在 `packages/<name>`，例如 `packages/oauth-github` → `@aomex-contrib/oauth-github`。

对 `@aomex/*` 核心包一律用 `peerDependencies`，不要 vendoring 核心代码。
