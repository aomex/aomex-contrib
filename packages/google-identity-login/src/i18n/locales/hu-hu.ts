import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hu-HU */
export default I18n.satisfies(zh).define({
  client_id_empty: 'A clientId nem lehet üres',
  client_secret_empty:
    'Az exchangeAuthCode / refreshAccessToken-hoz clientSecret szükséges',
  credential_empty: 'A credential / id_token nem lehet üres',
  access_token_empty: 'Az accessToken nem lehet üres',
  auth_code_empty: 'Az authorization code nem lehet üres',
  refresh_token_empty: 'A refreshToken nem lehet üres',
  credential_verify_failed: 'A Google credential ellenőrzése sikertelen: {{reason}}',
  hd_mismatch: 'A Google credential hd nem egyezik: várt {{expected}}, kapott {{actual}}',
  userinfo_failed: 'A Google userinfo sikertelen: {{status}}',
  exchange_failed: 'A Google tokencsere sikertelen: {{status}} {{detail}}',
});
