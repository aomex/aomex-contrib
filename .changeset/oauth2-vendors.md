---
'@aomex-contrib/oauth2-google': minor
'@aomex-contrib/oauth2-microsoft': minor
'@aomex-contrib/oauth2-apple': minor
'@aomex-contrib/oauth2-github': minor
'@aomex-contrib/oauth2-discord': minor
'@aomex-contrib/oauth2-gitlab': minor
'@aomex-contrib/oauth2-linkedin': minor
'@aomex-contrib/oauth2-facebook': minor
'@aomex-contrib/oauth2-twitter': minor
'@aomex-contrib/oauth2-spotify': minor
---

新增厂商 OAuth2 / OIDC 客户端包：Google、Microsoft、Apple、GitHub、Discord、GitLab、LinkedIn、Facebook、Twitter（X）、Spotify。

- 纯 OAuth2 厂商默认 `callback` 返回 `{ base, userinfo }`
- Apple：`form_post` + JWT `client_secret`；默认 profile 为 `{ claims, user }`（`user` 仅首次授权可能有姓名）
