## 0.0.1

### Minor Changes

- 新增厂商 OAuth2 / OIDC 客户端包：Google、Microsoft、Apple、GitHub、Discord、GitLab、LinkedIn、Facebook、Twitter（X）、Spotify。

  - 纯 OAuth2 厂商默认 `callback` 返回 `{ base, userinfo }`
  - Apple：`form_post` + JWT `client_secret`；默认 profile 为 `{ claims, user }`（`user` 仅首次授权可能有姓名）
