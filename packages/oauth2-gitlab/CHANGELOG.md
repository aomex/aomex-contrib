# @aomex-contrib/oauth2-gitlab

## 0.1.0

### Minor Changes

- [`013319f`](https://github.com/aomex/aomex-contrib/commit/013319f96e95278a693f55708798733412f0a947) Thanks [@geekact](https://github.com/geekact)! - 新增厂商 OAuth2 / OIDC 客户端包：Google、Microsoft、Apple、GitHub、Discord、GitLab、LinkedIn、Facebook、Twitter（X）、Spotify。

  - 纯 OAuth2 厂商默认 `callback` 返回 `{ base, userinfo }`
  - Apple：`form_post` + JWT `client_secret`；默认 profile 为 `{ claims, user }`（`user` 仅首次授权可能有姓名）

### Patch Changes

- Updated dependencies [[`013319f`](https://github.com/aomex/aomex-contrib/commit/013319f96e95278a693f55708798733412f0a947)]:
  - @aomex-contrib/oauth2-preset@0.1.0
