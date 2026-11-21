## 0.0.1

### Minor Changes

- 新增 OAuth2 / OIDC 预设合并工具：`mergeOAuth2Preset`、`mergeOidcPreset`。纯 OAuth2 默认 profile 为 `{ base, userinfo }`，自定义 `onProfile` 也会先拉好 `userinfo`。
