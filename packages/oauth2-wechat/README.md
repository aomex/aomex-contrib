# @aomex-contrib/oauth2-wechat

个人微信侧 **OAuth2** 适配（基于 `@aomex/oauth2-client` 的 state / callback）：

| 通道                     | 类 / 函数                | 典型场景            |
| ------------------------ | ------------------------ | ------------------- |
| 开放平台**网站应用**扫码 | `WechatOpenOAuth2Client` | PC 网站扫码登录     |
| **公众号**网页授权       | `WechatMpOAuth2Client`   | 服务号内 H5         |
| 开放平台**移动应用**     | `exchangeWechatCode` 等  | App SDK 已拿到 code |

小程序 / 小游戏登录（**非 OAuth**，`jscode2session`）请用 [`@aomex-contrib/wechat-mini-program-login`](../wechat-mini-program-login/README.md)。  
企业微信请用 [`@aomex-contrib/oauth2-wecom`](../oauth2-wecom/README.md)。本包不覆盖第三方平台代授权。

---

## 本包能做什么 / 不能做什么

| 能力                                               | 支持                                                                        |
| -------------------------------------------------- | --------------------------------------------------------------------------- |
| 网站扫码 / 内嵌 `wxLogin.js`（服务端仍换同一套票） | ✅                                                                          |
| 公众号 `snsapi_base` / `snsapi_userinfo`           | ✅                                                                          |
| App 端只换票 / 刷新用户 `access_token`             | ✅                                                                          |
| 自动拉 `/sns/userinfo`（在合适 scope 下）          | ✅                                                                          |
| 小程序 / 小游戏登录                                | ❌ 用 [`wechat-mini-program-login`](../wechat-mini-program-login/README.md) |
| 企业微信                                           | ❌ 用 wecom 包                                                              |
| 公众号全局 `access_token`（`cgi-bin/token`）       | ✅ `getAccessToken` / `withAccessToken`                                     |
| 第三方平台 component 代授权                        | ❌                                                                          |

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-wechat @aomex/oauth2-client
```

---

## 2. 先选对通道（别装错后台）

| 你要做的事                        | 去哪个后台开应用                                       | 用谁                                                                                 |
| --------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| PC 网站用户扫码登录               | [微信开放平台](https://open.weixin.qq.com/) → 网站应用 | `WechatOpenOAuth2Client`                                                             |
| App 内微信登录                    | 开放平台 → 移动应用                                    | `exchangeWechatCode`                                                                 |
| 微信里打开你的 H5，拿 openid/昵称 | [微信公众平台](https://mp.weixin.qq.com/) → 服务号     | `WechatMpOAuth2Client`                                                               |
| 小程序登录（非 OAuth）            | 微信公众平台 → 小程序                                  | [`@aomex-contrib/wechat-mini-program-login`](../wechat-mini-program-login/README.md) |

开放平台与公众号的 **AppID / AppSecret 不是同一个**。若要打通 `unionid`，需把公众号 / 小程序绑定到同一个开放平台账号，并按微信文档完成绑定。

---

## 3. store 说明

`store` 用途：

1. OAuth **`state`（防 CSRF）**——`WechatOpenOAuth2Client` / `WechatMpOAuth2Client` 都需要
2. 公众号全局 `cgi-bin/token`——仅 `WechatMpOAuth2Client#getAccessToken` 会写入（见第 8 节）

| 环境     | 推荐                    | 说明                     |
| -------- | ----------------------- | ------------------------ |
| 单机试玩 | `CacheMemoryAdapter`    | 重启丢失；多副本各管各的 |
| 生产     | Redis 等 `CacheAdapter` | 多实例必须共享           |

网页授权换票得到的 SNS `access_token` 在 `callback` 结果里（用户级、每次登录一份）；**不会**进 `store`。全局票才走 `getAccessToken` + `store`。

---

## 4. 开放平台网站扫码登录

### 4.1 后台准备

1. 登录微信开放平台 → 管理中心 → 网站应用 → 创建 / 进入应用
2. 记下 **AppID**、**AppSecret**
3. 设置「授权回调域」：只填域名，如 `example.com`（不要带协议和路径）
4. 你的 `redirectUri` 必须是该域名下的 `https` 完整地址，例如 `https://example.com/oauth/wechat/callback`

内嵌二维码（`wxLogin.js`）只是前端展示方式不同：用户扫完后仍然带着 `code` 回到你的回调域，**服务端仍然用同一套 `callback` / `exchangeWechatCode`**。

### 4.2 代码

```ts
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { WechatOpenOAuth2Client } from '@aomex-contrib/oauth2-wechat';

const client = new WechatOpenOAuth2Client({
  appId: process.env.WX_OPEN_APP_ID!,
  appSecret: process.env.WX_OPEN_APP_SECRET!,
  redirectUri: 'https://example.com/oauth/wechat/callback',
  store: new CacheMemoryAdapter(),
  scopes: ['snsapi_login'], // 必填；字面量可收窄 callback 的 userinfo 类型
});

// 发起：跳转到微信扫码页
router.get('/oauth/wechat', {
  action: async (ctx) => {
    await client.redirect(ctx);
  },
});

// 回调：?code=&state=
router.get('/oauth/wechat/callback', {
  action: async (ctx) => {
    // 默认会再请求 /sns/userinfo，得到昵称头像等
    const profile = await client.callback(ctx);
    // 在此写登录态
    ctx.send(profile);
  },
});
```

### 4.3 流程在干什么

1. 用户打开 `/oauth/wechat` → 服务端写入 `state` → 302 到 `open.weixin.qq.com/connect/qrconnect`
2. 用户手机微信扫码确认
3. 回到回调 URL，带上 `code` + `state`
4. 服务端校验 `state` → `sns/oauth2/access_token` 换用户令牌 → 默认再拉 `/sns/userinfo`
5. 你拿到 profile 后自己建 session / JWT

---

## 5. 公众号网页授权

### 5.1 后台准备

1. 服务号（订阅号能力受限，以微信当前规则为准）→ 开发 → 基本配置，拿到 **AppID / AppSecret**
2. 设置「网页授权域名」（可信域名，不带协议路径）
3. `redirectUri` 必须落在该域名下，且为 **https**
4. 用户须在**微信内置浏览器**打开你的页面（从公众号菜单、图文、扫二维码进 H5 等）

### 5.2 代码

```ts
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { WechatMpOAuth2Client } from '@aomex-contrib/oauth2-wechat';

const mp = new WechatMpOAuth2Client({
  appId: process.env.WX_MP_APP_ID!,
  appSecret: process.env.WX_MP_APP_SECRET!,
  redirectUri: 'https://example.com/oauth/mp/callback',
  store: new CacheMemoryAdapter(),
  scopes: ['snsapi_userinfo'], // 必填；改成 ['snsapi_base'] 则 userinfo 类型为 null
  // authorizationParams: { forcePopup: 'true' }, // 需要时按微信文档追加
});

router.get('/oauth/mp', {
  action: async (ctx) => {
    await mp.redirect(ctx);
  },
});

router.get('/oauth/mp/callback', {
  action: async (ctx) => {
    const profile = await mp.callback(ctx);
    ctx.send(profile);
  },
});
```

### 5.3 scope 怎么选（必填，并决定 profile 类型）

`scopes` 必须显式传入；传字面量元组时，TypeScript 会收窄 `callback` 返回值：

| scope                              | 体验         | `userinfo` 类型 / 运行时        |
| ---------------------------------- | ------------ | ------------------------------- |
| `snsapi_userinfo` / `snsapi_login` | 用户确认授权 | `WechatSnsUserInfo`（会拉资料） |
| `snsapi_base`                      | 静默（无感） | `null`（不拉资料）              |

可用 `onProfile` 完全自定义返回值（例如落库后返回你的 `User`）。

```ts
const mp = new WechatMpOAuth2Client({
  // ...
  scopes: ['snsapi_userinfo'],
  onProfile: async ({ token, userinfo }) => {
    // userinfo 已按 scopes 拉好（snsapi_base 时为 null）
    return upsertUserByOpenid(token.openid, userinfo);
  },
});
```

### 5.4 快照页 / 虚拟账号

公众号网页授权在部分场景会返回 `is_snapshotuser === 1`（快照页虚拟账号）。业务若要求「必须是真实关注用户」，请按微信文档自行拦截。

---

## 6. 移动应用（App SDK，仅服务端换票）

1. 开放平台创建**移动应用**，配置包名 / 签名等（按微信文档）
2. App 内用微信 SDK 完成授权，拿到 `code`
3. App 把 `code` 交给你的服务端，服务端换票（**不要**把 AppSecret 打进 App 包）

```ts
import {
  exchangeWechatCode,
  refreshWechatToken,
  fetchWechatUserInfo,
} from '@aomex-contrib/oauth2-wechat';

const token = await exchangeWechatCode({
  appId: process.env.WX_APP_APP_ID!,
  appSecret: process.env.WX_APP_APP_SECRET!,
  code,
});
// token: access_token、refresh_token、openid、unionid?、expires_in? …

const profile = await fetchWechatUserInfo({
  accessToken: token.access_token,
  openid: token.openid,
});

// 用户 access_token 过期后：
const renewed = await refreshWechatToken({
  appId: process.env.WX_APP_APP_ID!,
  refreshToken: token.refresh_token!,
});
```

这里没有 `getAuthorizationUrl`：跳转 / SDK 交互在客户端完成。

---

## 7. 返回字段速查

### 网页 / 扫码 / 移动换票：`WechatTokenSet`

| 字段              | 含义                                                |
| ----------------- | --------------------------------------------------- |
| `access_token`    | **用户级** SNS 令牌（不是公众号全局 cgi-bin token） |
| `refresh_token`   | 用于 `refreshWechatToken`                           |
| `openid`          | 用户在该应用下的标识                                |
| `unionid`         | 绑定开放平台后可能有                                |
| `expires_in`      | 秒                                                  |
| `scope`           | 授权 scope 字符串                                   |
| `is_snapshotuser` | 公众号场景可能为 `1`                                |

### 默认 `callback` profile：`WechatProfile` / `WechatProfileFromScopes`

```ts
{
  base: WechatTokenSet; // 换票令牌，始终有
  userinfo: WechatSnsUserInfo | null; // 由构造时 scopes 决定（见 5.3）
}
```

`userinfo` 含：`openid`、`nickname`、`sex`、`province`、`city`、`country`、`headimgurl`、`privilege`、`unionid?`。

---

## 8. 公众号全局 `getAccessToken`（`cgi-bin/token`）

与网页授权换到的**用户级 SNS** `access_token` **不是同一个**：

|      | `callback` / 换票里的 SNS token   | `getAccessToken()`                   |
| ---- | --------------------------------- | ------------------------------------ |
| 来源 | `sns/oauth2/access_token`         | `cgi-bin/token`（client_credential） |
| 归属 | 某次用户授权                      | 整个公众号应用                       |
| 用途 | 拉 `/sns/userinfo` 等授权用户接口 | 大多数服务端业务 API                 |

`getAccessToken()` 常见用途（不完全列举）：模板消息 / 客服消息、自定义菜单、素材管理、用户管理（关注列表、标签）、JS-SDK 的 `jsapi_ticket`、带参二维码、长链转短链、部分数据分析及其它 `cgi-bin/*`。

自己调业务 API 时优先用 `withAccessToken`（票失效会自动清缓存重试一次）：

```ts
const menu = await mp.withAccessToken(async (accessToken) => {
  const res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/menu/get?access_token=${accessToken}`,
  );
  // 校验 errcode；成功则去掉 errcode/errmsg（40001/42001 会触发清缓存重试）
  return mp.assertOk<{ is_menu_open: number; selfmenu_info?: unknown }>(await res.json());
});
```

也可以直接 `getAccessToken()`；若业务侧已确认票废，可再 `deleteAccessToken()` 清本地缓存（不会调用微信作废接口）。

缓存 TTL：`max(60, expires_in - 300)` 秒；未命中时经 `singleFlight`，并发只会换一次票。  
**不要**把全局 `access_token` 下发给前端。

---

## 9. 明确不支持 / 易混淆点

- **`revoke()`**：微信 SNS 无 RFC 7009，调用会抛错
- **PKCE**：已关闭
- **公众号业务接口**用 `withAccessToken` / `getAccessToken()`，不要用 `callback` 返回的用户 SNS `access_token`
- **企业微信**：用 `@aomex-contrib/oauth2-wecom`
- 网站扫码与公众号网页授权的授权域名、AppID **不能混用**

---

## 10. 常见问题

**Q: 回调 state 无效？**  
A: 多实例用了内存 store；或回调打到另一台没有 state 的机器。生产用 Redis。

**Q: 扫码能回来，但没有昵称？**  
A: 看构造时的 `scopes` 与 `profile.userinfo`；或你自定义了 `onProfile`。`snsapi_login` / `snsapi_userinfo` 会拉 `/sns/userinfo`。

**Q: 小程序登录？**  
A: 本包不含；见 [`@aomex-contrib/wechat-mini-program-login`](../wechat-mini-program-login/README.md)。

**Q: 想要跨公众号 / 小程序统一用户？**  
A: 绑定同一开放平台，用 `unionid` 关联；本包只负责把微信返回的 `unionid` 透出。

**Q: 本地 http 能测吗？**  
A: 微信回调要求 https 与已配置域名；本地请用内网穿透，并把穿透域名配进授权回调域 / 网页授权域名。

---

通用 OAuth2 客户端能力见：https://aomex.js.org
