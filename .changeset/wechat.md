---
'@aomex-contrib/oauth2-wechat': minor
'@aomex-contrib/oauth2-wecom': minor
'@aomex-contrib/wechat-mini-program-login': minor
---

新增微信相关包：

- `@aomex-contrib/oauth2-wechat`：开放平台扫码、公众号网页授权、App 换票；默认 profile `{ base, userinfo }`，`scopes` 必填并可收窄类型
- `@aomex-contrib/oauth2-wecom`：企微自建应用网页授权；`scopes` 必填；默认返回 `WecomProfile`（无伪装 access_token）
- `@aomex-contrib/wechat-mini-program-login`：小程序 / 小游戏 `jscode2session` 登录（非 OAuth）
