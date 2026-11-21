import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** 繁體中文（香港） */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId 不能為空',
  client_secret_empty:
    'clientSecret 不能為空（exchangeAuthCode / refreshAccessToken 需要）',
  credential_empty: 'credential / id_token 不能為空',
  access_token_empty: 'accessToken 不能為空',
  auth_code_empty: 'authorization code 不能為空',
  refresh_token_empty: 'refreshToken 不能為空',
  credential_verify_failed: 'Google credential 驗簽失敗：{{reason}}',
  hd_mismatch: 'Google credential hd 不匹配：期望 {{expected}}，實際 {{actual}}',
  userinfo_failed: 'Google userinfo 失敗：{{status}}',
  exchange_failed: 'Google 換票失敗：{{status}} {{detail}}',
});
