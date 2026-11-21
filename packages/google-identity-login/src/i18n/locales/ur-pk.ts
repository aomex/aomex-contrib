import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ur-PK */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId خالی نہیں ہونا چاہیے',
  client_secret_empty:
    'exchangeAuthCode / refreshAccessToken کے لیے clientSecret درکار ہے',
  credential_empty: 'credential / id_token خالی نہیں ہونا چاہیے',
  access_token_empty: 'accessToken خالی نہیں ہونا چاہیے',
  auth_code_empty: 'authorization code خالی نہیں ہونا چاہیے',
  refresh_token_empty: 'refreshToken خالی نہیں ہونا چاہیے',
  credential_verify_failed: 'Google credential کی تصدیق ناکام: {{reason}}',
  hd_mismatch:
    'Google credential hd مطابقت نہیں رکھتا: متوقع {{expected}}، ملا {{actual}}',
  userinfo_failed: 'Google userinfo ناکام: {{status}}',
  exchange_failed: 'Google ٹوکن تبادلہ ناکام: {{status}} {{detail}}',
});
