import { WECHAT_MP_AUTHORIZE } from './wechat-api';
import { WechatOAuth2Client } from './wechat-oauth-client';
import { i18n } from './i18n';
import type { WechatMpOptions, WechatProfileFromScopes } from './types';

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

type MpAccessTokenCache = {
  access_token: string;
};

/**
 * 微信公众号网页授权
 * @see https://developers.weixin.qq.com/doc/service/guide/h5/auth.html
 */
export class WechatMpOAuth2Client<
  const Scopes extends readonly ('snsapi_base' | 'snsapi_userinfo')[] = readonly (
    'snsapi_base' | 'snsapi_userinfo'
  )[],
  Profile = WechatProfileFromScopes<Scopes>,
> extends WechatOAuth2Client<Profile> {
  protected readonly mpTokenKey: string;

  constructor(opts: WechatMpOptions<Scopes, Profile>) {
    super({
      appId: opts.appId,
      appSecret: opts.appSecret,
      redirectUri: opts.redirectUri,
      store: opts.store,
      stateTtl: opts.stateTtl,
      authorizationParams: opts.authorizationParams,
      onProfile: opts.onProfile,
      authorizationEndpoint: WECHAT_MP_AUTHORIZE,
      scopes: opts.scopes,
    });
    this.mpTokenKey = `wechat:mp_access_token:${opts.appId}`;
  }

  /**
   * 获取公众号全局 `access_token`（`cgi-bin/token`，勿下发前端）。
   * 与网页授权换到的**用户级** SNS token 不同；是大多数服务端业务接口的调用凭证，例如：
   * - 模板消息 / 客服消息
   * - 自定义菜单、素材管理
   * - 用户管理（关注列表、标签等）
   * - JS-SDK 的 `jsapi_ticket`
   * - 带参二维码、长链转短链
   * - 部分数据分析及其它 `cgi-bin/*` 接口
   *
   * 经构造时的 `store` 缓存；TTL 为 `max(60, expires_in - 300)` 秒
   *（微信默认 expires_in=7200 → 约 6900 秒）。
   * 未命中时用 `singleFlight`，避免并发多次换票（新票会使旧票失效）。
   * @see https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
   */
  async getAccessToken(): Promise<string> {
    const cached = await this.caching.get<MpAccessTokenCache>(this.mpTokenKey);
    if (cached?.access_token) {
      return cached.access_token;
    }

    return this.caching.singleFlight(this.mpTokenKey, async () => {
      const again = await this.caching.get<MpAccessTokenCache>(this.mpTokenKey);
      if (again?.access_token) {
        return again.access_token;
      }

      const url = new URL('https://api.weixin.qq.com/cgi-bin/token');
      url.searchParams.set('grant_type', 'client_credential');
      url.searchParams.set('appid', this.appId);
      url.searchParams.set('secret', await this.resolveClientSecret());

      const json = await this.fetchMpJson(url);
      this.assertMpOk(json);

      if (typeof json['access_token'] !== 'string' || !json['access_token']) {
        throw new Error(
          i18n.t('access_token_failed', {
            errcode: '?',
            errmsg: 'missing access_token',
          }),
        );
      }

      const expiresIn =
        typeof json['expires_in'] === 'number' && json['expires_in'] > 0
          ? json['expires_in']
          : 7200;
      const ttlSec = Math.max(60, expiresIn - TOKEN_SKEW_SEC);
      await this.caching.set(
        this.mpTokenKey,
        { access_token: json['access_token'] } satisfies MpAccessTokenCache,
        ttlSec * 1000,
      );

      return json['access_token'];
    });
  }

  /** 删除本应用本地缓存的公众号全局 `access_token`（不会调用微信作废接口） */
  async deleteAccessToken(): Promise<void> {
    await this.caching.delete(this.mpTokenKey);
  }

  /**
   * 带自动刷新的全局 `access_token` 调用包装：先取缓存 token 执行 `fn`；
   * 若抛错带 `errcode` 且为 `40001` / `42001`，则清缓存并重取后再执行一次。
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
   * 校验微信业务接口 JSON：`errcode` 非 0 时抛错（带 `errcode`，可被 {@link withAccessToken} 识别）；
   * 成功则剥掉 `errcode` / `errmsg`，返回剩余业务字段（可用泛型标注）。
   *
   * @example
   * const data = mp.assertOk<{ is_menu_open: number }>(await res.json());
   */
  assertOk<T extends Record<string, unknown> = Record<string, unknown>>(
    json: WechatErrorBody & T,
  ): T {
    if (typeof json.errcode === 'number' && json.errcode !== 0) {
      throw Object.assign(new Error(json.errmsg || `errcode ${json.errcode}`), {
        errcode: json.errcode,
      });
    }
    const { errcode: _errcode, errmsg: _errmsg, ...rest } = json;
    return rest as T;
  }

  /** 40001 invalid credential / 42001 access_token expired */
  protected isStaleAccessTokenError(err: unknown): boolean {
    const code =
      err && typeof err === 'object' ? (err as { errcode?: unknown }).errcode : undefined;
    return code === 40001 || code === 42001;
  }

  protected async fetchMpJson(
    url: URL,
  ): Promise<Record<string, unknown> & WechatErrorBody> {
    const res = await fetch(url);
    try {
      return (await res.json()) as Record<string, unknown> & WechatErrorBody;
    } catch {
      throw new Error(
        i18n.t('access_token_failed', {
          errcode: String(res.status),
          errmsg: 'invalid json',
        }),
      );
    }
  }

  protected assertMpOk(json: WechatErrorBody): void {
    if (typeof json.errcode === 'number' && json.errcode !== 0) {
      throw Object.assign(
        new Error(
          i18n.t('access_token_failed', {
            errcode: String(json.errcode),
            errmsg: json.errmsg ?? '',
          }),
        ),
        { errcode: json.errcode },
      );
    }
  }
}
