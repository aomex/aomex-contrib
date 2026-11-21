import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uz-UZ */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId bo‘sh bo‘lmasligi kerak',
  client_secret_empty:
    'exchangeAuthCode / refreshAccessToken uchun clientSecret talab qilinadi',
  credential_empty: 'credential / id_token bo‘sh bo‘lmasligi kerak',
  access_token_empty: 'accessToken bo‘sh bo‘lmasligi kerak',
  auth_code_empty: 'authorization code bo‘sh bo‘lmasligi kerak',
  refresh_token_empty: 'refreshToken bo‘sh bo‘lmasligi kerak',
  credential_verify_failed: 'Google credential tekshiruvi muvaffaqiyatsiz: {{reason}}',
  hd_mismatch:
    'Google credential hd mos kelmaydi: kutilgan {{expected}}, olingan {{actual}}',
  userinfo_failed: 'Google userinfo muvaffaqiyatsiz: {{status}}',
  exchange_failed: 'Google token almashinuvi muvaffaqiyatsiz: {{status}} {{detail}}',
});
