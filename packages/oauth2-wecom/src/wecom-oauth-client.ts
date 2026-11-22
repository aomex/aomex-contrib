import type { WebContext } from '@aomex/web';
import { OAuth2Client } from '@aomex/oauth2-client';
import { i18n } from './i18n';
import type { WecomOAuth2Options, WecomProfile } from './types';

/** 授权链接必填参数顺序（对齐官方示例） */
const WECOM_AUTH_PARAM_ORDER = [
  'appid',
  'redirect_uri',
  'response_type',
  'scope',
  'state',
  'agentid',
] as const;

/**
 * 相对企微返回的 `expires_in` 提前失效的秒数，避免边界过期。
 * 实际缓存 TTL = max(60, expires_in - CORP_TOKEN_SKEW_SEC)；
 * 企微默认 expires_in=7200，故常见 TTL 为 6900 秒（约 1h55m）。
 */
const CORP_TOKEN_SKEW_SEC = 300;

type WecomErrorBody = {
  errcode?: number;
  errmsg?: string;
};

type CorpTokenCache = {
  access_token: string;
};

/**
 * 企业微信自建应用网页授权：
 * - 授权 URL：`appid(=corpId) → redirect_uri → response_type → scope → state → agentid` + `#wechat_redirect`
 * - 换票：先 `gettoken`（缓存应用 access_token），再 `auth/getuserinfo` → {@link WecomProfile}
 * - 无用户级 OAuth token / refresh / revoke；无 PKCE
 * @see https://developer.work.weixin.qq.com/document/path/91022
 * @see https://developer.work.weixin.qq.com/document/path/96442
 */
export class WecomOAuth2Client<
  const Scopes extends readonly ('snsapi_base' | 'snsapi_privateinfo')[] = readonly (
    'snsapi_base' | 'snsapi_privateinfo'
  )[],
  Profile = WecomProfile,
> extends OAuth2Client<Profile> {
  protected readonly corpId: string;
  protected readonly agentId: string;
  protected readonly corpTokenKey: string;

  constructor(opts: WecomOAuth2Options<Scopes, Profile>) {
    if (!opts.corpId) {
      throw new Error(i18n.t('corp_id_empty'));
    }
    if (!opts.corpSecret) {
      throw new Error(i18n.t('corp_secret_empty'));
    }
    if (opts.agentId === '' || opts.agentId === null || opts.agentId === undefined) {
      throw new Error(i18n.t('agent_id_empty'));
    }

    const agentId = String(opts.agentId);
    const onProfile = opts.onProfile;

    super({
      authorizationEndpoint: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      // 占位：真实换票走 exchangeCode → gettoken + getuserinfo
      tokenEndpoint: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken',
      clientId: opts.corpId,
      clientSecret: opts.corpSecret,
      redirectUri: opts.redirectUri,
      store: opts.store,
      stateTtl: opts.stateTtl,
      scopes: opts.scopes,
      authorizationParams: opts.authorizationParams,
      pkce: false,
      onProfile: async ({ token, ctx }) => {
        // exchangeCode 实际返回 WecomProfile（见该处类型断言）
        const profile = token as unknown as WecomProfile;
        if (onProfile) {
          return onProfile({ profile, ctx });
        }
        return profile as Profile;
      },
    });

    this.corpId = opts.corpId;
    this.agentId = agentId;
    this.corpTokenKey = `wecom:corp_token:${opts.corpId}:${agentId}`;
  }

  override async getAuthorizationUrl(ctx: WebContext): Promise<string> {
    const { authorizationEndpoint } = await this.resolveEndpoints();
    const state = this.randomToken();
    await this.caching.set(this.stateKey(state), { verifier: '' }, this.stateTtlMs);

    const redirectUri = this.resolveRedirectUri(ctx);
    const url = new URL(authorizationEndpoint);
    const reserved = new Set<string>(WECOM_AUTH_PARAM_ORDER);

    // 官方示例：appid、redirect_uri、response_type、scope、state、agentid
    url.searchParams.set('appid', this.corpId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('response_type', 'code');

    const scopes = this.resolveScopes();
    if (scopes?.length) {
      url.searchParams.set('scope', scopes.join(','));
    }

    url.searchParams.set('state', state);
    url.searchParams.set('agentid', this.agentId);

    for (const [key, value] of Object.entries(this.opts.authorizationParams ?? {})) {
      if (!reserved.has(key)) {
        url.searchParams.set(key, value);
      }
    }

    return `${url.toString()}#wechat_redirect`;
  }

  /**
   * 获取当前应用的企业 access_token（勿下发前端）。
   * 经构造时的 `store` 缓存；TTL 为 `max(60, expires_in - 300)` 秒
   *（企微默认 expires_in=7200 → 约 6900 秒）。
   * 未命中时用 `singleFlight`，避免并发多次换票（新票会使旧票失效）。
   * @see https://developer.work.weixin.qq.com/document/path/91039
   */
  async getAccessToken(): Promise<string> {
    const cached = await this.caching.get<CorpTokenCache>(this.corpTokenKey);
    if (cached?.access_token) {
      return cached.access_token;
    }

    return this.caching.singleFlight(this.corpTokenKey, async () => {
      const again = await this.caching.get<CorpTokenCache>(this.corpTokenKey);
      if (again?.access_token) {
        return again.access_token;
      }

      const url = new URL('https://qyapi.weixin.qq.com/cgi-bin/gettoken');
      url.searchParams.set('corpid', this.corpId);
      url.searchParams.set('corpsecret', await this.resolveClientSecret());

      const json = await this.fetchWecomJson(url, 'access_token_failed');
      this.assertWecomOk(json, 'access_token_failed');

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
      const ttlSec = Math.max(60, expiresIn - CORP_TOKEN_SKEW_SEC);
      await this.caching.set(
        this.corpTokenKey,
        { access_token: json['access_token'] } satisfies CorpTokenCache,
        ttlSec * 1000,
      );

      return json['access_token'];
    });
  }

  /** 删除本应用本地缓存的企业 `access_token`（不会调用企微作废接口） */
  async deleteAccessToken(): Promise<void> {
    await this.caching.delete(this.corpTokenKey);
  }

  /**
   * 企微换身份返回 {@link WecomProfile}，不含用户级 OAuth `access_token`。
   * 基类 `exchangeCode` 签名要求 `TokenSet`，此处仅做类型断言以复用 `callback` 骨架。
   */
  protected override async exchangeCode(
    code: string,
    _verifier: string,
    _ctx: WebContext,
  ): Promise<OAuth2Client.TokenSet> {
    const profile = await this.withAccessToken((accessToken) =>
      this.getUserInfo(accessToken, code),
    );
    return profile as unknown as OAuth2Client.TokenSet;
  }

  /**
   * 带自动刷新的应用 `access_token` 调用包装：先取缓存 token 执行 `fn`；
   * 若抛错带 `errcode` 且为 `40014` / `42001`，则清缓存并重取后再执行一次。
   * 业务响应优先用 {@link assertOk}。
   */
  async withAccessToken<T>(fn: (accessToken: string) => Promise<T>): Promise<T> {
    try {
      return await fn(await this.getAccessToken());
    } catch (err) {
      if (!this.isStaleCorpTokenError(err)) {
        throw err;
      }
      await this.deleteAccessToken();
      return fn(await this.getAccessToken());
    }
  }

  /**
   * 校验企微业务接口 JSON：`errcode` 非 0 时抛错（带 `errcode`，可被 {@link withAccessToken} 识别）；
   * 成功则剥掉 `errcode` / `errmsg`，返回剩余业务字段（可用泛型标注）。
   *
   * @example
   * const data = wecom.assertOk<{ department: { id: number }[] }>(await res.json());
   */
  assertOk<T extends Record<string, unknown> = Record<string, unknown>>(
    json: WecomErrorBody & T,
  ): T {
    if (typeof json.errcode === 'number' && json.errcode !== 0) {
      throw Object.assign(new Error(json.errmsg || `errcode ${json.errcode}`), {
        errcode: json.errcode,
      });
    }
    const { errcode: _errcode, errmsg: _errmsg, ...rest } = json;
    return rest as T;
  }

  /**
   * 用网页授权 code 换取访问用户身份
   * @see https://developer.work.weixin.qq.com/document/path/96442
   */
  protected async getUserInfo(accessToken: string, code: string): Promise<WecomProfile> {
    const url = new URL('https://qyapi.weixin.qq.com/cgi-bin/auth/getuserinfo');
    url.searchParams.set('access_token', accessToken);
    url.searchParams.set('code', code);

    const json = await this.fetchWecomJson(url, 'userinfo_failed');
    this.assertWecomOk(json, 'userinfo_failed');

    const userid =
      typeof json['userid'] === 'string' && json['userid'] ? json['userid'] : undefined;
    const openid =
      typeof json['openid'] === 'string' && json['openid'] ? json['openid'] : undefined;
    const user_ticket =
      typeof json['user_ticket'] === 'string' && json['user_ticket']
        ? json['user_ticket']
        : undefined;
    const external_userid =
      typeof json['external_userid'] === 'string' && json['external_userid']
        ? json['external_userid']
        : undefined;

    if (!userid && !openid) {
      throw new Error(i18n.t('userinfo_missing_identity'));
    }

    return {
      userid,
      user_ticket,
      openid,
      external_userid,
    };
  }

  /** 40014 invalid access_token / 42001 access_token expired */
  protected isStaleCorpTokenError(err: unknown): boolean {
    const code =
      err && typeof err === 'object' ? (err as { errcode?: unknown }).errcode : undefined;
    return code === 40014 || code === 42001;
  }

  protected async fetchWecomJson(
    url: URL,
    errorKey: 'access_token_failed' | 'userinfo_failed',
  ): Promise<Record<string, unknown> & WecomErrorBody> {
    const res = await fetch(url);
    try {
      return (await res.json()) as Record<string, unknown> & WecomErrorBody;
    } catch {
      throw new Error(
        i18n.t(errorKey, {
          errcode: String(res.status),
          errmsg: 'invalid json',
        }),
      );
    }
  }

  protected assertWecomOk(
    json: WecomErrorBody,
    errorKey: 'access_token_failed' | 'userinfo_failed',
  ): void {
    if (typeof json.errcode === 'number' && json.errcode !== 0) {
      throw Object.assign(
        new Error(
          i18n.t(errorKey, {
            errcode: String(json.errcode),
            errmsg: json.errmsg ?? '',
          }),
        ),
        { errcode: json.errcode },
      );
    }
  }

  override async refresh(_refreshToken: string): Promise<never> {
    throw new Error(i18n.t('refresh_unsupported'));
  }

  override async revoke(
    _token: string,
    _options?: OAuth2Client.RevokeOptions,
  ): Promise<void> {
    throw new Error(i18n.t('revoke_unsupported'));
  }
}
