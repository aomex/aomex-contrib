import type { CacheAdapter } from '@aomex/cache';
import { Caching } from '@aomex/cache';
import { registerLifecycle, rule, validate } from '@aomex/common';
import { HttpError } from '@aomex/web';
import { i18n } from './i18n';
import type {
  WechatMiniProgramLoginOptions,
  WechatMiniProgramPhoneInfo,
  WechatMiniProgramSession,
} from './types';

const CODE2SESSION_URL = 'https://api.weixin.qq.com/sns/jscode2session';
const ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token';
const GET_PHONE_NUMBER_URL = 'https://api.weixin.qq.com/wxa/business/getuserphonenumber';

/**
 * 相对微信返回的 `expires_in` 提前失效的秒数，避免边界过期。
 * 实际缓存 TTL = max(60, expires_in - TOKEN_SKEW_SEC)；
 * 微信默认 expires_in=7200，故常见 TTL 为 6900 秒（约 1h55m）。
 */
const TOKEN_SKEW_SEC = 300;

type WechatErrorBody = {
  errcode?: number;
  errmsg?: string;
};

type AccessTokenCache = {
  access_token: string;
};

/**
 * 微信小程序 / 小游戏登录与身份相关能力（**不是 OAuth2**）。
 * - `code2Session`：`wx.login` 的 code → openid / session_key
 * - `getAccessToken`：全局接口调用凭证（经 `store` 缓存）
 * - `getPhoneNumber`：新版手机号 code → 手机号（内部用 access_token）
 * @see https://developers.weixin.qq.com/miniprogram/dev/server/API/user-login/api_code2session.html
 */
export class WechatMiniProgramLoginClient {
  protected readonly appId: string;
  protected readonly appSecret: string;
  protected readonly store: CacheAdapter;
  protected readonly caching: Caching;
  protected readonly tokenCacheKey: string;
  protected readyPromise?: Promise<void>;

  constructor(opts: WechatMiniProgramLoginOptions) {
    if (!opts.appId) {
      throw new Error(i18n.t('app_id_empty'));
    }
    if (!opts.appSecret) {
      throw new Error(i18n.t('app_secret_empty'));
    }
    if (!opts.store) {
      throw new Error(i18n.t('store_empty'));
    }
    this.appId = opts.appId;
    this.appSecret = opts.appSecret;
    this.store = opts.store;
    this.caching = new Caching(opts.store);
    this.tokenCacheKey = `wxmini:access_token:${opts.appId}`;
  }

  /**
   * 确保 store 已 `connect`（可重入）。首次读写 `access_token` 缓存时登记生命周期。
   */
  protected ensureReady(): Promise<void> {
    this.readyPromise ??= registerLifecycle({
      onInit: () => this.store.connect(),
      onDestroy: () => this.store.disconnect(),
    });
    return this.readyPromise;
  }

  /**
   * 用 `wx.login` 得到的 `js_code` 换取 openid / session_key（及可选 unionid）。
   * `session_key` 仅用于开放数据解密 / 验签，新版手机号不依赖它；勿下发前端。
   */
  async code2Session(jsCode: string): Promise<WechatMiniProgramSession> {
    if (!jsCode) {
      throw new Error(i18n.t('js_code_empty'));
    }

    const url = new URL(CODE2SESSION_URL);
    url.searchParams.set('appid', this.appId);
    url.searchParams.set('secret', this.appSecret);
    url.searchParams.set('js_code', jsCode);
    url.searchParams.set('grant_type', 'authorization_code');

    const json = await this.fetchWechatJson(url, 'code2session_failed');
    this.assertWechatOk(json, 'code2session_failed');

    return validate(json, {
      openid: rule.string(),
      session_key: rule.string(),
      unionid: rule.string().optional(),
    });
  }

  /**
   * 获取小程序全局 `access_token`（经构造时的 `store` 缓存）。
   * TTL 为 `max(60, expires_in - 300)` 秒（微信默认 expires_in=7200 → 约 6900 秒）。
   * 未命中时用 `singleFlight`，避免并发多次向微信换票（新票会使旧票失效）。
   */
  async getAccessToken(): Promise<string> {
    await this.ensureReady();
    const cached = await this.caching.get<AccessTokenCache>(this.tokenCacheKey);
    if (cached?.access_token) {
      return cached.access_token;
    }

    return this.caching.singleFlight(this.tokenCacheKey, async () => {
      const again = await this.caching.get<AccessTokenCache>(this.tokenCacheKey);
      if (again?.access_token) {
        return again.access_token;
      }

      const url = new URL(ACCESS_TOKEN_URL);
      url.searchParams.set('grant_type', 'client_credential');
      url.searchParams.set('appid', this.appId);
      url.searchParams.set('secret', this.appSecret);

      const json = await this.fetchWechatJson(url, 'access_token_failed');
      this.assertWechatOk(json, 'access_token_failed');

      const { access_token, expires_in } = await validate(json, {
        access_token: rule.string(),
        expires_in: rule.int().min(1).optional(),
      });

      const expiresIn = expires_in ?? 7200;
      const ttlSec = Math.max(60, expiresIn - TOKEN_SKEW_SEC);
      await this.caching.set(
        this.tokenCacheKey,
        { access_token } satisfies AccessTokenCache,
        ttlSec * 1000,
      );

      return access_token;
    });
  }

  /** 删除本应用本地缓存的 `access_token`（不会调用微信作废接口） */
  async deleteAccessToken(): Promise<void> {
    await this.ensureReady();
    await this.caching.delete(this.tokenCacheKey);
  }

  /**
   * 用 `getPhoneNumber` 按钮回调的 code 换取手机号（新版接口，无需 session_key）。
   * 经 {@link withAccessToken}：缓存 token 失效时会自动删除并重取后再调一次。
   * @param phoneCode `e.detail.code`，与 `wx.login` 的 code 不同，不可混用
   * @param opts.openid 可选；填入后微信会校验与 code 的绑定关系
   */
  async getPhoneNumber(
    phoneCode: string,
    opts?: { openid?: string },
  ): Promise<WechatMiniProgramPhoneInfo> {
    if (!phoneCode) {
      throw new Error(i18n.t('phone_code_empty'));
    }

    return this.withAccessToken(async (accessToken) => {
      const url = new URL(GET_PHONE_NUMBER_URL);
      url.searchParams.set('access_token', accessToken);

      const body: Record<string, string> = { code: phoneCode };
      if (opts?.openid) {
        body['openid'] = opts.openid;
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });

      let json: Record<string, unknown> & WechatErrorBody;
      try {
        json = (await res.json()) as typeof json;
      } catch {
        throw new HttpError(
          400,
          i18n.t('phone_number_failed', {
            errcode: String(res.status),
            errmsg: i18n.t('invalid_json'),
          }),
        );
      }

      this.assertWechatOk(json, 'phone_number_failed');

      const { phone_info } = await validate(json, {
        phone_info: {
          phoneNumber: rule.string(),
          purePhoneNumber: rule.string(),
          countryCode: rule.string(),
          watermark: {
            timestamp: rule.int(),
            appid: rule.string(),
          },
        },
      });

      return phone_info;
    });
  }

  /**
   * 带自动刷新的 `access_token` 调用包装：先取缓存 token 执行 `fn`；
   * 若抛出 `HttpError` 且 `code` 为 `40001` / `42001`，则清缓存并重取后再执行一次。
   * 业务响应优先用 {@link assertOk}。
   */
  async withAccessToken<T>(fn: (accessToken: string) => Promise<T>): Promise<T> {
    try {
      return await fn(await this.getAccessToken());
    } catch (err) {
      if (!this.isStaleAccessTokenError(err)) {
        throw err;
      }
      await this.deleteAccessToken();
      return fn(await this.getAccessToken());
    }
  }

  /**
   * 校验微信业务接口 JSON：`errcode` 非 0 时抛 `HttpError`（`code` = errcode，可被 {@link withAccessToken} 识别）；
   * 成功则剥掉 `errcode` / `errmsg`，返回剩余业务字段（可用泛型标注）。
   *
   * @example
   * const data = mini.assertOk<{ openlink: string }>(await res.json());
   */
  assertOk<T extends Record<string, unknown> = Record<string, unknown>>(
    json: WechatErrorBody & T,
  ): T {
    if (typeof json.errcode === 'number' && json.errcode !== 0) {
      throw new HttpError(400, json.errmsg || `errcode ${json.errcode}`, {
        code: String(json.errcode),
      });
    }
    const { errcode: _errcode, errmsg: _errmsg, ...rest } = json;
    return rest as T;
  }

  /** 40001 invalid credential / 42001 access_token expired */
  protected isStaleAccessTokenError(err: unknown): boolean {
    return HttpError.isError(err) && (err.code === '40001' || err.code === '42001');
  }

  protected async fetchWechatJson(
    url: URL,
    errorKey: 'code2session_failed' | 'access_token_failed' | 'phone_number_failed',
  ): Promise<Record<string, unknown> & WechatErrorBody> {
    const res = await fetch(url);
    try {
      return (await res.json()) as Record<string, unknown> & WechatErrorBody;
    } catch {
      throw new HttpError(
        400,
        i18n.t(errorKey, {
          errcode: String(res.status),
          errmsg: i18n.t('invalid_json'),
        }),
      );
    }
  }

  protected assertWechatOk(
    json: WechatErrorBody,
    errorKey: 'code2session_failed' | 'access_token_failed' | 'phone_number_failed',
  ): void {
    if (typeof json.errcode === 'number' && json.errcode !== 0) {
      throw new HttpError(
        400,
        i18n.t(errorKey, {
          errcode: String(json.errcode),
          errmsg: json.errmsg ?? '',
        }),
        { code: String(json.errcode) },
      );
    }
  }
}
