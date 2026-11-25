# @aomex-contrib/oauth2-wecom

企业微信**自建应用网页授权**：在企微客户端里打开你的 H5 / 工作台应用页，跳转授权后拿回成员身份（`userid` 等）。

技术上基于 `@aomex/oauth2-client` 的 state / callback 骨架，但换票**不是**个人微信那套 SNS：

1. 先用 `corpid` + `corpsecret` 调 `gettoken`，拿到**应用级** `access_token`（会写入你传入的 `store` 并带 TTL）
2. 再用该 token + 回调里的 `code` 调 `auth/getuserinfo`，得到 `userid` / `openid` 等

与个人微信 OAuth（`@aomex-contrib/oauth2-wechat`）及小程序登录（`@aomex-contrib/wechat-mini-program-login`）**不互通**，凭证、接口、返回字段都不同。

官方文档：[网页授权登录](https://developer.work.weixin.qq.com/document/path/91022)、[获取访问用户身份](https://developer.work.weixin.qq.com/document/path/91023)。

---

## 本包能做什么 / 不能做什么

| 场景                                | 支持                                          |
| ----------------------------------- | --------------------------------------------- |
| 自建应用网页授权（企微内打开）      | ✅ `WecomOAuth2Client`                        |
| 应用级 `access_token`（`gettoken`） | ✅ `getAccessToken` / `withAccessToken`       |
| 第三方应用 / 服务商 `suite` 授权    | ❌                                            |
| 企业微信 Web 扫码登录组件           | ❌                                            |
| 个人微信 / 公众号 OAuth             | 见 `@aomex-contrib/oauth2-wechat`             |
| 小程序登录（非 OAuth）              | 见 `@aomex-contrib/wechat-mini-program-login` |

---

## 1. 安装

```bash
pnpm add @aomex-contrib/oauth2-wecom @aomex/oauth2-client
```

生产多实例请用 Redis 等共享 `Caching`（`new Caching(adapter)`）（见下文「store 怎么选」）。

---

## 2. 企业微信后台准备（必做）

按顺序做完，缺一步回调会失败。

### 2.1 创建自建应用

1. 打开 [企业微信管理后台](https://work.weixin.qq.com/)
2. 「应用管理」→「自建」→「创建应用」
3. 填应用名称、可见范围（哪些成员能用）
4. 记下三个值：

| 字段        | 含义                          | 用在哪里                              |
| ----------- | ----------------------------- | ------------------------------------- |
| **CorpID**  | 企业 ID                       | 构造参数 `corpId`（授权链里的 appid） |
| **Secret**  | 该应用的 Secret（点「查看」） | 构造参数 `corpSecret`                 |
| **AgentId** | 应用 ID（数字）               | 构造参数 `agentId`                    |

Secret 只显示一次，请放进环境变量，**不要提交到仓库**。

### 2.2 配置可信域名 / 授权回调

1. 进入该应用 → 「网页授权及 JS-SDK」等相关设置
2. 配置**可信域名**（不要带 `https://`、不要带路径），例如业务域名是 `https://example.com/oauth/...`，则填 `example.com`
3. 你的 `redirectUri` 必须是 `https://` + 该可信域名下的完整回调地址，例如：  
   `https://example.com/oauth/wecom/callback`
4. 本地调试常用内网穿透（ngrok / frp 等）把公网 HTTPS 指到本机，并把穿透域名配进可信域名

### 2.3 打开方式限制（很重要）

网页授权要求用户在**企业微信客户端内**打开你的页面（工作台应用、会话里的链接等）。在系统浏览器里随便打开，通常完不成授权。

---

## 3. 环境变量建议

```bash
WECOM_CORP_ID=wwxxxxxxxxxxxxxxxx
WECOM_CORP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WECOM_AGENT_ID=1000002
```

`agentId` 传数字或字符串都可以，库内会转成字符串。

---

## 4. store 怎么选

`store` 同时用于：

1. **OAuth `state`**：防 CSRF，发起登录时写入，回调时校验后删除
2. **应用 `access_token`**：`getAccessToken()` / 换身份内部都会用到，key 形如 `wecom:corp_token:${corpId}:${agentId}`

| 环境     | 推荐                             | 说明                                  |
| -------- | -------------------------------- | ------------------------------------- |
| 单机试玩 | `Caching` + `CacheMemoryAdapter` | 进程重启丢失；多进程/多副本会各管各的 |
| 生产     | Redis 等适配器 + `Caching`       | 多实例共享 state 与应用 token         |

详见第 7 节：`getAccessToken` 是干什么的、和 `callback` 身份字段有何区别。

---

## 5. 最小可跑通示例

### 5.1 创建客户端

```ts
import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { WecomOAuth2Client } from '@aomex-contrib/oauth2-wecom';

const wecom = new WecomOAuth2Client({
  corpId: process.env.WECOM_CORP_ID!,
  corpSecret: process.env.WECOM_CORP_SECRET!,
  agentId: process.env.WECOM_AGENT_ID!,
  // 必须与后台可信域名一致，且为完整 https 回调 URL
  redirectUri: 'https://example.com/oauth/wecom/callback',
  store: new Caching(new CacheMemoryAdapter()),
  scopes: ['snsapi_base'], // 必填；静默，一般只拿 userid
  // scopes: ['snsapi_privateinfo'], // 需用户确认，可见范围内可返回 user_ticket
});
```

可选参数：

| 参数                  | 默认     | 说明                                                                  |
| --------------------- | -------- | --------------------------------------------------------------------- |
| `scopes`              | （必填） | `['snsapi_base']` 静默；`['snsapi_privateinfo']` 可拿敏感信息相关票据 |
| `stateTtl`            | 基类默认 | state 在 store 里的存活时间                                           |
| `redirectUri`         | （必填） | 也可写成 `(ctx) => string` 按请求动态拼                               |
| `authorizationParams` | `{}`     | 附加到授权 URL 的额外 query（勿覆盖官方保留字段）                     |
| `onProfile`           | 省略     | 省略时 `callback` 返回 `WecomProfile`                                 |

### 5.2 挂两个路由

以 aomex `router` 为例（其它框架同理：一个入口跳转，一个回调处理）：

```ts
// ① 发起登录：302 到企业微信授权页
router.get('/oauth/wecom', {
  action: async (ctx) => {
    await wecom.redirect(ctx);
    // 等价：ctx.redirect(await wecom.getAuthorizationUrl(ctx));
  },
});

// ② 回调：企微带回 ?code=&state=
router.get('/oauth/wecom/callback', {
  action: async (ctx) => {
    const profile = await wecom.callback(ctx);
    // 在此写你自己的登录态：session / JWT / Set-Cookie 等
    // 身份字段：profile.userid / profile.openid
    ctx.send(profile);
  },
});
```

### 5.3 用户侧完整流程

1. 成员在**企微客户端**打开 `https://example.com/oauth/wecom`（或你的工作台入口最终跳到这里）
2. 服务端生成 `state` 写入 `store`，302 到企微授权页
3. `snsapi_base` 通常无感；`snsapi_privateinfo` 可能弹出确认
4. 浏览器回到 `https://example.com/oauth/wecom/callback?code=...&state=...`
5. 服务端校验 `state` → `gettoken`（有缓存则跳过）→ `auth/getuserinfo` → 得到身份
6. 你拿到返回值后自己落库 / 发 session；本包**不**替你管登录态

---

## 6. `callback` 返回什么

默认类型为 `WecomProfile`（即 `auth/getuserinfo` 的身份字段，**没有**用户级 OAuth `access_token`）：

| 字段              | 含义                                                        |
| ----------------- | ----------------------------------------------------------- |
| `userid`          | 企业成员 UserId（最常用）                                   |
| `openid`          | 非企业成员时的标识                                          |
| `user_ticket`     | `snsapi_privateinfo` 且在可见范围时可能有，用于再拉敏感信息 |
| `external_userid` | 外部联系人场景可能有                                        |

### 用 `onProfile` 映射成你自己的用户

```ts
const wecom = new WecomOAuth2Client({
  // ...其它必填
  scopes: ['snsapi_base'],
  onProfile: async ({ profile }) => {
    if (!profile.userid) {
      throw new Error('非企业成员，拒绝登录');
    }
    return findOrCreateUserByWecomUserId(profile.userid);
  },
});

// 此时 callback 的返回类型变成你 onProfile 的返回值
const user = await wecom.callback(ctx);
```

---

## 7. 应用级 `getAccessToken`（`gettoken`）

登录换身份（`callback` → `WecomProfile`）和「拿应用 token 调企微业务 API」是两件事。

|      | `callback` 返回的 `WecomProfile`           | `getAccessToken()`                   |
| ---- | ------------------------------------------ | ------------------------------------ |
| 内容 | `userid` / `openid` / `user_ticket` 等身份 | 应用 `access_token` 字符串           |
| 来源 | `auth/getuserinfo`                         | `cgi-bin/gettoken`                   |
| 用途 | 识别成员、建本地账号                       | 调通讯录、发消息、应用管理等业务 API |

`callback` 内部换身份时也会用到这份应用 token（经 `store` 缓存）。自己调其它企微接口时优先用 `withAccessToken`：

```ts
const { department } = await wecom.withAccessToken(async (accessToken) => {
  const res = await fetch(
    `https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=${accessToken}`,
  );
  // 校验 errcode；成功则去掉 errcode/errmsg，返回业务字段（40014/42001 会触发清缓存重试）
  return wecom.assertOk<{ department: { id: number; name: string }[] }>(await res.json());
});
```

也可以直接 `getAccessToken()`；确认票废时可再 `deleteAccessToken()` 清本地缓存（不会调用企微作废接口）。

注意：

- **不要**把应用 `access_token` 下发给前端
- `callback` / `withAccessToken` 遇到 40014 / 42001 会自动清缓存并重取后再调一次
- 缓存 TTL：`max(60, expires_in - 300)` 秒；未命中经 `singleFlight`
- 多应用共用一个 CorpID 时，每个应用用各自的 `WecomOAuth2Client`（不同 `agentId` / `corpSecret`），缓存键按 `corpId` + `agentId` 隔离

---

## 8. 明确不支持的能力

- `refresh()` / `revoke()`：会抛错（企微此场景无用户级 refresh / RFC 7009 revoke）
- PKCE：已关闭（`pkce: false`）
- 第三方应用 / 服务商模板授权、扫码登录组件：请另寻方案或自行对接官方文档

---

## 9. 常见问题

**Q: 回调报 state 无效 / 过期？**  
A: 多实例却用了内存 `store`；或回调域名与发起登录不是同一套服务；或 `stateTtl` 太短。生产请用共享 Redis。

**Q: 能拿到 userid，但调其它企微 API 401？**  
A: 调业务 API 要用应用 token：`withAccessToken` / `getAccessToken()`；`callback` 返回的是身份字段（`userid` 等），没有用户级 OAuth token。

**Q: 浏览器能打开页面，授权却失败？**  
A: 确认是在**企微 App 内**打开；可信域名是否已配；`redirectUri` 是否 https 且域名完全一致。

**Q: `snsapi_base` 和 `snsapi_privateinfo` 怎么选？**  
A: 只要成员 UserId → 默认 `snsapi_base`。需要敏感个人信息相关能力 → `snsapi_privateinfo`（用户可能看到授权确认，且需在应用可见范围）。

**Q: 和个人微信包一起用？**  
A: 可以同一项目依赖两个包，但凭证、客户端、路由全部拆开，不要混用 `corpId` 和微信 `appId`。

---

通用 OAuth2 客户端能力（state、redirect、callback 约定）见：https://aomex.js.org
