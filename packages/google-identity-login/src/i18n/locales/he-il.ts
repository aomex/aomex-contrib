import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** he-IL */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId לא יכול להיות ריק',
  client_secret_empty: 'clientSecret נדרש עבור exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token לא יכול להיות ריק',
  access_token_empty: 'accessToken לא יכול להיות ריק',
  auth_code_empty: 'authorization code לא יכול להיות ריק',
  refresh_token_empty: 'refreshToken לא יכול להיות ריק',
  credential_verify_failed: 'אימות Google credential נכשל: {{reason}}',
  hd_mismatch: 'hd של Google credential אינו תואם: צפוי {{expected}}, התקבל {{actual}}',
  userinfo_failed: 'Google userinfo נכשל: {{status}}',
  exchange_failed: 'החלפת אסימון Google נכשלה: {{status}} {{detail}}',
});
