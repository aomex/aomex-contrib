import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ar-EG */
export default I18n.satisfies(zh).define({
  client_id_empty: 'يجب ألا يكون clientId فارغًا',
  client_secret_empty: 'clientSecret مطلوب لـ exchangeAuthCode / refreshAccessToken',
  credential_empty: 'يجب ألا يكون credential / id_token فارغًا',
  access_token_empty: 'يجب ألا يكون accessToken فارغًا',
  auth_code_empty: 'يجب ألا يكون authorization code فارغًا',
  refresh_token_empty: 'يجب ألا يكون refreshToken فارغًا',
  credential_verify_failed: 'فشل التحقق من Google credential: {{reason}}',
  hd_mismatch:
    'hd لـ Google credential غير متطابق: المتوقع {{expected}}، الفعلي {{actual}}',
  userinfo_failed: 'فشل Google userinfo: {{status}}',
  exchange_failed: 'فشل تبادل رمز Google: {{status}} {{detail}}',
});
