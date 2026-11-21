import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mn-MN */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId хоосон байж болохгүй',
  client_secret_empty:
    'exchangeAuthCode / refreshAccessToken-д clientSecret шаардлагатай',
  credential_empty: 'credential / id_token хоосон байж болохгүй',
  access_token_empty: 'accessToken хоосон байж болохгүй',
  auth_code_empty: 'authorization code хоосон байж болохгүй',
  refresh_token_empty: 'refreshToken хоосон байж болохгүй',
  credential_verify_failed: 'Google credential баталгаажуулалт амжилтгүй: {{reason}}',
  hd_mismatch:
    'Google credential hd таарахгүй байна: хүлээгдсэн {{expected}}, авсан {{actual}}',
  userinfo_failed: 'Google userinfo амжилтгүй: {{status}}',
  exchange_failed: 'Google токен солих амжилтгүй: {{status}} {{detail}}',
});
