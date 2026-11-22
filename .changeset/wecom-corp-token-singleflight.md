---
'@aomex-contrib/oauth2-wecom': minor
---

应用 token：`getAccessToken`（`singleFlight`）/ `deleteAccessToken` / `withAccessToken` / `assertOk`；`callback` 改为返回 `WecomProfile`（不再伪装用户级 OAuth token）；peer 升至 `@aomex/*` `^4.4.0`
