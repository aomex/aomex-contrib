# @aomex-contrib/google-identity-login

Google **Identity Services（GIS）** 登录的**后端**适配。

> **不是**整页 redirect OAuth2。前端用官方 GIS（纯 HTML / Vue / React 等均可）拿到 `credential` / `access_token` / `code` 后，交给本包校验或换票。

经典「服务端 redirect → callback → 换票」请用 [`@aomex-contrib/oauth2-google`](../oauth2-google/README.md)。

官方文档：[Verify the Google ID token](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token)、[Use the authorization code model](https://developers.google.com/identity/oauth2/web/guides/use-code-model)。

---

## 安装

```bash
pnpm add @aomex-contrib/google-identity-login
```

---

## 和前端怎么配对

按 GIS 返回的载荷选后端方法（与框架无关）：

| 前端拿到的值                 | 典型 GIS API                             | 后端方法                                      |
| ---------------------------- | ---------------------------------------- | --------------------------------------------- |
| `credential`（id_token JWT） | Sign In With Google / One Tap 回调       | `verifyCredential(credential)`                |
| `access_token`               | `google.accounts.oauth2.initTokenClient` | `fetchUserInfo(access_token)`                 |
| `code`                       | `google.accounts.oauth2.initCodeClient`  | `exchangeAuthCode(code)`（需 `clientSecret`） |

常见前端封装（底层都是 GIS，把拿到的字段交给上表即可）：

| 环境           | 代表库 / 方式                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| HTML / 原生 JS | 官方 [`gsi/client`](https://developers.google.com/identity/gsi/web/guides/overview)                                         |
| React          | [`@react-oauth/google`](https://www.npmjs.com/package/@react-oauth/google)                                                  |
| Vue 3          | [`vue3-google-login`](https://www.npmjs.com/package/vue3-google-login)                                                      |
| Angular        | [`@abacritt/angularx-social-login`](https://www.npmjs.com/package/@abacritt/angularx-social-login)（`GoogleLoginProvider`） |

---

## 最小示例（推荐：验 credential）

### 前端（官方 GIS，纯 HTML）

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
<script>
  function handleCredentialResponse(response) {
    fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: response.credential }),
    });
  }
  window.onload = () => {
    google.accounts.id.initialize({
      client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
    });
  };
</script>
<div id="google-btn"></div>
```

Vue / React 等只要把回调里的 `credential` POST 到后端即可；`client_id` 须与服务端 `clientId` 一致。

### 服务端

```ts
import { GoogleIdentityLoginClient } from '@aomex-contrib/google-identity-login';

const google = new GoogleIdentityLoginClient({
  clientId: process.env.GOOGLE_CLIENT_ID!, // 与前端 GIS client_id 一致
  // audiences: [process.env.GOOGLE_IOS_CLIENT_ID!], // 可选：同时接受 App 端 aud
  // hd: 'example.com', // 可选：限制 Google Workspace 域名
});

// POST body.credential
const claims = await google.verifyCredential(credential);
// claims.sub / email / name / picture …
// 在此写你自己的登录态
```

---

## access_token → userinfo

```ts
const profile = await google.fetchUserInfo(accessToken);
// { sub, email?, name?, picture?, … }
```

---

## auth-code 换票 / 刷新

GIS popup 的 auth-code 默认 `redirect_uri` 为 `postmessage`（可构造参数覆盖）。换票与刷新都需要 `clientSecret`。

```ts
const google = new GoogleIdentityLoginClient({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

const token = await google.exchangeAuthCode(code);
// 若有 id_token，可再验：
const { claims } = await google.exchangeAuthCodeAndVerify(code);

// 若拿到了 refresh_token：
const next = await google.refreshAccessToken(token.refresh_token!);
```

---

## 后台准备

1. [Google Cloud Console](https://console.cloud.google.com/) → 凭据 → OAuth 客户端 ID（**Web 应用**）
2. 「已授权的 JavaScript 来源」填前端域名（GIS 需要）
3. 记下 **客户端 ID**；auth-code 换票 / 刷新才需要 **客户端密钥**

---

## 和 `@aomex-contrib/oauth2-google` 的区别

|               | 本包                                      | oauth2-google                  |
| ------------- | ----------------------------------------- | ------------------------------ |
| 场景          | GIS（按钮 / One Tap / popup token、code） | 整页 redirect 授权码           |
| 入口          | 前端已拿到 token/code                     | 服务端 `redirect` / `callback` |
| 依赖          | 无需 `@aomex/oauth2-client`               | 基于 oauth2-client             |
| store / state | 不需要                                    | 需要                           |

---

## FAQ

**Q: 验签报 audience 不匹配？**  
A: `clientId` 必须与前端 GIS 初始化用的 `client_id` 完全一致。Web + App 共用后端时，把 App 的客户端 ID 放进 `audiences`。

**Q: 能不能用 tokeninfo 接口偷懒？**  
A: Google 仅建议调试用；生产请走 JWKS 本地验签（本包默认如此）。
