# @aomex-contrib/oauth2-wechat

## 0.2.0

### Minor Changes

- [`3a0c0b2`](https://github.com/aomex/aomex-contrib/commit/3a0c0b29390d1c881a68d7d492d61f341354e965) Thanks [@geekact](https://github.com/geekact)! - `WechatMpOAuth2Client` 支持公众号全局 `access_token`：`getAccessToken` / `deleteAccessToken` / `withAccessToken` / `assertOk`（`store` 缓存 + `singleFlight`）；peer 升至 `@aomex/*` `^4.4.0`

## 0.1.0

### Minor Changes

- [`013319f`](https://github.com/aomex/aomex-contrib/commit/013319f96e95278a693f55708798733412f0a947) Thanks [@geekact](https://github.com/geekact)! - 新增微信相关包：

  - `@aomex-contrib/oauth2-wechat`：开放平台扫码、公众号网页授权、App 换票；默认 profile `{ base, userinfo }`，`scopes` 必填并可收窄类型
  - `@aomex-contrib/oauth2-wecom`：企微自建应用网页授权；`scopes` 必填；默认返回 `WecomProfile`（无伪装 access_token）
  - `@aomex-contrib/wechat-mini-program-login`：小程序 / 小游戏 `jscode2session` 登录（非 OAuth）
