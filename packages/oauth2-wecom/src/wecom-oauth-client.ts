import type { WebContext } from '@aomex/web';
import { OAuth2Client } from '@aomex/oauth2-client';
import { i18n } from './i18n';
import type { WecomOAuth2Options, WecomProfile, WecomTokenSet } from './types';
import {
  WECOM_AUTHORIZE,
  WECOM_GET_TOKEN_URL,
  corpTokenCacheKey,
  exchangeWecomCode,
  getWecomCorpToken,
} from './wecom-api';

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
 * 企业微信自建应用网页授权：
 * - 授权 URL：`appid(=corpId) → redirect_uri → response_type → scope → state → agentid` + `#wechat_redirect`
 * - 换票：先 `gettoken`（缓存应用 access_token），再 `auth/getuserinfo`
 * - 无用户级 refresh / revoke；无 PKCE
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
      authorizationEndpoint: WECOM_AUTHORIZE,
      // 占位：真实换票走 exchangeCode → gettoken + getuserinfo
      tokenEndpoint: WECOM_GET_TOKEN_URL,
      clientId: opts.corpId,
      clientSecret: opts.corpSecret,
      redirectUri: opts.redirectUri,
      store: opts.store,
      stateTtl: opts.stateTtl,
      scopes: opts.scopes,
      authorizationParams: opts.authorizationParams,
      pkce: false,
      onProfile: async ({ token, ctx }) => {
        const wecomToken = token as WecomTokenSet;
        const profile: WecomProfile = {
          userid: wecomToken.userid,
          user_ticket: wecomToken.user_ticket,
          openid: wecomToken.openid,
          external_userid: wecomToken.external_userid,
        };
        if (onProfile) {
          return onProfile({ token: wecomToken, profile, ctx });
        }
        return profile as Profile;
      },
    });

    this.corpId = opts.corpId;
    this.agentId = agentId;
    this.corpTokenKey = corpTokenCacheKey(opts.corpId, agentId);
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
   * 获取当前应用的企业 access_token。
   * 经构造时的 `store` 缓存；TTL 为 `max(60, expires_in - 300)` 秒
   *（企微默认 expires_in=7200 → 约 6900 秒）。
   */
  async getCorpAccessToken(): Promise<string> {
    return getWecomCorpToken({
      corpId: this.corpId,
      corpSecret: await this.resolveClientSecret(),
      store: this.opts.store,
      cacheKey: this.corpTokenKey,
    });
  }

  protected override async exchangeCode(
    code: string,
    _verifier: string,
    _ctx: WebContext,
  ): Promise<WecomTokenSet> {
    return exchangeWecomCode({
      corpId: this.corpId,
      corpSecret: await this.resolveClientSecret(),
      code,
      store: this.opts.store,
      cacheKey: this.corpTokenKey,
    });
  }

  override async refresh(_refreshToken: string): Promise<WecomTokenSet> {
    throw new Error(i18n.t('refresh_unsupported'));
  }

  override async revoke(
    _token: string,
    _options?: OAuth2Client.RevokeOptions,
  ): Promise<void> {
    throw new Error(i18n.t('revoke_unsupported'));
  }
}
