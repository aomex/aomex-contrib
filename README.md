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

## OAuth2 / OIDC 厂商包

一厂商一包；标准授权码只填端点，Apple 等变种在包内改回调 / `client_secret`。

| 包                                                                                                                 | Version                                                                                                                                                 | 说明                                         |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| [`oauth2-google`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-google)                         | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-google)](https://www.npmjs.com/package/@aomex-contrib/oauth2-google)                         | Google OIDC（整页 redirect）                 |
| [`google-identity-login`](https://github.com/aomex/aomex-contrib/tree/main/packages/google-identity-login)         | [![npm](https://img.shields.io/npm/v/@aomex-contrib/google-identity-login)](https://www.npmjs.com/package/@aomex-contrib/google-identity-login)         | Google GIS 登录后端（credential / userinfo） |
| [`oauth2-microsoft`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-microsoft)                   | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-microsoft)](https://www.npmjs.com/package/@aomex-contrib/oauth2-microsoft)                   | Microsoft / Entra ID OIDC                    |
| [`oauth2-apple`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-apple)                           | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-apple)](https://www.npmjs.com/package/@aomex-contrib/oauth2-apple)                           | Sign in with Apple（form_post + JWT secret） |
| [`oauth2-github`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-github)                         | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-github)](https://www.npmjs.com/package/@aomex-contrib/oauth2-github)                         | GitHub OAuth2                                |
| [`oauth2-discord`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-discord)                       | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-discord)](https://www.npmjs.com/package/@aomex-contrib/oauth2-discord)                       | Discord OAuth2                               |
| [`oauth2-gitlab`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-gitlab)                         | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-gitlab)](https://www.npmjs.com/package/@aomex-contrib/oauth2-gitlab)                         | GitLab.com OAuth2                            |
| [`oauth2-linkedin`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-linkedin)                     | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-linkedin)](https://www.npmjs.com/package/@aomex-contrib/oauth2-linkedin)                     | LinkedIn OAuth2                              |
| [`oauth2-facebook`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-facebook)                     | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-facebook)](https://www.npmjs.com/package/@aomex-contrib/oauth2-facebook)                     | Facebook Login OAuth2                        |
| [`oauth2-twitter`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-twitter)                       | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-twitter)](https://www.npmjs.com/package/@aomex-contrib/oauth2-twitter)                       | Twitter（X）OAuth2                           |
| [`oauth2-spotify`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-spotify)                       | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-spotify)](https://www.npmjs.com/package/@aomex-contrib/oauth2-spotify)                       | Spotify OAuth2                               |
| [`oauth2-wechat`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-wechat)                         | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-wechat)](https://www.npmjs.com/package/@aomex-contrib/oauth2-wechat)                         | 微信开放平台 / 公众号 OAuth2                 |
| [`wechat-mini-program-login`](https://github.com/aomex/aomex-contrib/tree/main/packages/wechat-mini-program-login) | [![npm](https://img.shields.io/npm/v/@aomex-contrib/wechat-mini-program-login)](https://www.npmjs.com/package/@aomex-contrib/wechat-mini-program-login) | 微信小程序登录 + 手机号（非 OAuth）          |
| [`oauth2-wecom`](https://github.com/aomex/aomex-contrib/tree/main/packages/oauth2-wecom)                           | [![npm](https://img.shields.io/npm/v/@aomex-contrib/oauth2-wecom)](https://www.npmjs.com/package/@aomex-contrib/oauth2-wecom)                           | 企业微信自建应用网页授权                     |
