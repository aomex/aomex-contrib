# @aomex-contrib/wechat-mini-program-login

微信**小程序 / 小游戏**登录：服务端 `jscode2session`。

> **不是 OAuth2。** 没有授权页跳转、没有 `state` / `callback` / PKCE；只是用 `wx.login` 的 `code` 换 `openid` / `session_key`。

网页扫码 / 公众号 OAuth 请用 [`@aomex-contrib/oauth2-wechat`](../oauth2-wechat/README.md)。

---

## 安装

```bash
pnpm add @aomex-contrib/wechat-mini-program-login
```

---

## 用法

### 1. 后台

小程序后台 → 开发管理 → 开发设置，拿到 **AppID / AppSecret**。  
小游戏使用同一套 `jscode2session` 接口。

### 2. 前端

```js
wx.login({
  success(res) {
    if (res.code) {
      // 把 res.code 发给服务端，不要在前端保存 AppSecret
      wx.request({
        url: 'https://example.com/api/mini/login',
        method: 'POST',
        data: { code: res.code },
      });
    }
  },
});
```

### 3. 服务端

```ts
import { WechatMiniProgramLoginClient } from '@aomex-contrib/wechat-mini-program-login';

const mini = new WechatMiniProgramLoginClient({
  appId: process.env.WX_MINI_APP_ID!,
  appSecret: process.env.WX_MINI_APP_SECRET!,
});

const session = await mini.code2Session(code);
// { openid, session_key, unionid? }
// session_key 仅服务端保存，用于解密手机号等；勿下发前端
```

---

## 返回字段

| 字段          | 含义                   |
| ------------- | ---------------------- |
| `openid`      | 用户在该小程序下的标识 |
| `session_key` | 会话密钥（仅服务端）   |
| `unionid`     | 绑定开放平台后可能有   |

---

## FAQ

**Q: 能拿到 openid，解密手机号失败？**  
A: 检查是否用了同一次 `wx.login` 对应的 `session_key`；过期需重新 `code2Session`。

**Q: 想要跨公众号 / 小程序统一用户？**  
A: 把公众号 / 小程序绑定到同一开放平台账号，再使用返回的 `unionid`。
