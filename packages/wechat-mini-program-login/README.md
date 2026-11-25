# @aomex-contrib/wechat-mini-program-login

微信**小程序 / 小游戏**服务端身份能力（**不是 OAuth2**）：

- `code2Session`：`wx.login` 的 code → `openid` / `session_key`
- `getAccessToken`：全局接口调用凭证（经 `@aomex/cache` 缓存）
- `getPhoneNumber`：新版手机号 code → 手机号

网页扫码 / 公众号 OAuth 请用 [`@aomex-contrib/oauth2-wechat`](../oauth2-wechat/README.md)。

### 身份能力边界

微信小程序**没有**「服务端用 token / code 换真实头像、昵称」的接口；`getUserInfo` / `getUserProfile` 也已调整，不再返回真实资料。

| 能换到的                                    | 换不到的                       |
| ------------------------------------------- | ------------------------------ |
| `openid` / `session_key` / 可选 `unionid`   | 真实微信头像、昵称、性别、地区 |
| 手机号（新版 `getPhoneNumber`，需付费额度） |                                |

因此本包做到 **静默登录 + 手机号** 即为身份链路上的极限。头像昵称需前端用[头像昵称填写](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html)（`chooseAvatar` + `input type="nickname"`）收集后交给业务后端保存，不要期待类似 OAuth `onProfile` 的拉取。

常见注册串行：`wx.login` → `code2Session` →（可选）手机号 → 发自家登录态 →（可选）用户自填头像昵称。

---

## 安装

```bash
pnpm add @aomex-contrib/wechat-mini-program-login
```

需自行安装 peer：`@aomex/cache`（及适配器，如 `@aomex/cache/memory`）、`@aomex/web`（`HttpError`）。

---

## 用法

### 1. 后台

小程序后台 → 开发管理 → 开发设置，拿到 **AppID / AppSecret**。  
小游戏使用同一套接口。

### 2. 静默登录（openid）

前端：

```js
wx.login({
  success(res) {
    if (res.code) {
      wx.request({
        url: 'https://example.com/api/mini/login',
        method: 'POST',
        data: { code: res.code },
      });
    }
  },
});
```

服务端：

```ts
import { Caching } from '@aomex/cache';
import { CacheMemoryAdapter } from '@aomex/cache/memory';
import { WechatMiniProgramLoginClient } from '@aomex-contrib/wechat-mini-program-login';

const mini = new WechatMiniProgramLoginClient({
  appId: process.env.WX_MINI_APP_ID!,
  appSecret: process.env.WX_MINI_APP_SECRET!,
  // 生产建议 Redis 等，多实例共享 access_token；
  // 首次读写 token 缓存时 registerLifecycle(connect)，关停时 disconnect
  store: new Caching(new CacheMemoryAdapter()),
});

const session = await mini.code2Session(code);
// { openid, session_key, unionid? }
// session_key：开放数据解密/验签用，仅服务端；新版手机号不需要；勿下发前端
```

### 3. 获取手机号（新版）

前端（基础库 ≥ 2.21.2）：

```html
<button open-type="getPhoneNumber" bindgetphonenumber="onGetPhoneNumber"></button>
```

```js
onGetPhoneNumber(e) {
  if (e.detail.code) {
    wx.request({
      url: 'https://example.com/api/mini/phone',
      method: 'POST',
      data: { code: e.detail.code },
    });
  }
}
```

服务端：

```ts
const phone = await mini.getPhoneNumber(phoneCode);
// { phoneNumber, purePhoneNumber, countryCode, watermark }
```

手机号的 `code` 与 `wx.login` 的 `code` **不能混用**；新版**不需要** `session_key` AES 解密。  
`getPhoneNumber` 经 `withAccessToken`：内部取缓存 `access_token`；若微信返回 40001 / 42001，会删除缓存并重新获取后再调一次。

### 4. 自己调小程序业务 API

优先用 `withAccessToken`（票失效会自动清缓存重试一次），再用 `assertOk` 校验响应：

```ts
const { openlink } = await mini.withAccessToken(async (accessToken) => {
  const res = await fetch(
    `https://api.weixin.qq.com/wxa/generatescheme?access_token=${accessToken}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jump_wxa: { path: '/pages/index/index' },
      }),
    },
  );
  // 校验 errcode；成功则去掉 errcode/errmsg（40001/42001 会触发清缓存重试）
  return mini.assertOk<{ openlink: string }>(await res.json());
});
```

也可以直接 `getAccessToken()`；确认票废时可再 `deleteAccessToken()` 清本地缓存（不会调用微信作废接口）。  
**不要**把全局 `access_token` 下发给前端。

---

## API

| 方法                                     | 说明                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| `code2Session(jsCode)`                   | 换取 openid / session_key                                                 |
| `getAccessToken()`                       | 小程序全局 `access_token`（`cgi-bin/token`；TTL ≈ `expires_in - 300` 秒） |
| `withAccessToken(fn)`                    | 带 token 执行业务调用；遇 40001 / 42001 自动清缓存重试一次                |
| `assertOk<T>(json)`                      | 校验微信 JSON；成功则剥掉 `errcode`/`errmsg` 并返回业务字段               |
| `deleteAccessToken()`                    | 删除本应用本地全局 access_token 缓存                                      |
| `getPhoneNumber(phoneCode, { openid? })` | 新版换手机号（内部走 `withAccessToken`）                                  |

---

## FAQ

**Q: 能像 OAuth 那样 `getProfile` 拉头像昵称吗？**  
A: 不能。见上文「身份能力边界」；前端自行收集即可。

**Q: 旧版 encryptedData + AES 还支持吗？**  
A: 本包不封装旧解密。官方建议使用新版 `code` 换号。

**Q: 想要跨公众号 / 小程序统一用户？**  
A: 把公众号 / 小程序绑定到同一开放平台账号，再使用 `code2Session` 返回的 `unionid`。
