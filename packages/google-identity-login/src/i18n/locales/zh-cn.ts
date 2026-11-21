import { I18n } from '@aomex/common';

export const zh = I18n.define({
  client_id_empty: 'clientId 不能为空',
  client_secret_empty:
    'clientSecret 不能为空（exchangeAuthCode / refreshAccessToken 需要）',
  credential_empty: 'credential / id_token 不能为空',
  access_token_empty: 'accessToken 不能为空',
  auth_code_empty: 'authorization code 不能为空',
  refresh_token_empty: 'refreshToken 不能为空',
  credential_verify_failed: 'Google credential 验签失败：{{reason}}',
  hd_mismatch: 'Google credential hd 不匹配：期望 {{expected}}，实际 {{actual}}',
  userinfo_failed: 'Google userinfo 失败：{{status}}',
  exchange_failed: 'Google 换票失败：{{status}} {{detail}}',
});
