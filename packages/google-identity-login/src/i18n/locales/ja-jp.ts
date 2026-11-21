import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ja-JP */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId は空にできません',
  client_secret_empty:
    'exchangeAuthCode / refreshAccessToken には clientSecret が必要です',
  credential_empty: 'credential / id_token は空にできません',
  access_token_empty: 'accessToken は空にできません',
  auth_code_empty: 'authorization code は空にできません',
  refresh_token_empty: 'refreshToken は空にできません',
  credential_verify_failed: 'Google credential の検証に失敗しました：{{reason}}',
  hd_mismatch:
    'Google credential の hd が一致しません：期待 {{expected}}、実際 {{actual}}',
  userinfo_failed: 'Google userinfo に失敗しました：{{status}}',
  exchange_failed: 'Google トークン交換に失敗しました：{{status}} {{detail}}',
});
