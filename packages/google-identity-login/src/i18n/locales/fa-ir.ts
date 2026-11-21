import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fa-IR */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId نباید خالی باشد',
  client_secret_empty:
    'برای exchangeAuthCode / refreshAccessToken به clientSecret نیاز است',
  credential_empty: 'credential / id_token نباید خالی باشد',
  access_token_empty: 'accessToken نباید خالی باشد',
  auth_code_empty: 'authorization code نباید خالی باشد',
  refresh_token_empty: 'refreshToken نباید خالی باشد',
  credential_verify_failed: 'تأیید Google credential ناموفق بود: {{reason}}',
  hd_mismatch:
    'hd مربوط به Google credential مطابقت ندارد: انتظار {{expected}}، واقعی {{actual}}',
  userinfo_failed: 'Google userinfo ناموفق بود: {{status}}',
  exchange_failed: 'تبادل توکن Google ناموفق بود: {{status}} {{detail}}',
});
