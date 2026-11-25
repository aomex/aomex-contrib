---
'@aomex-contrib/oauth2-wechat': major
'@aomex-contrib/oauth2-wecom': major
'@aomex-contrib/wechat-mini-program-login': major
---

`store` 改为接收 `Caching` 实例（不再直接传 `CacheAdapter`）；请在组合根 `new Caching(adapter)` 后再传入。
