---
'@aomex-contrib/wechat-mini-program-login': minor
---

新增 `getAccessToken` / `deleteAccessToken` / `withAccessToken` / `assertOk` 与新版 `getPhoneNumber`；构造必填 `store`（`singleFlight` 防并发换票）；上游失败抛 `HttpError`；peer 升至 `@aomex/*` `^4.4.0`
