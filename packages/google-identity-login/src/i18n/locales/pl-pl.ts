import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pl-PL */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId nie może być pusty',
  client_secret_empty:
    'clientSecret jest wymagany dla exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token nie może być pusty',
  access_token_empty: 'accessToken nie może być pusty',
  auth_code_empty: 'authorization code nie może być pusty',
  refresh_token_empty: 'refreshToken nie może być pusty',
  credential_verify_failed: 'Weryfikacja Google credential nie powiodła się: {{reason}}',
  hd_mismatch:
    'hd Google credential nie zgadza się: oczekiwano {{expected}}, otrzymano {{actual}}',
  userinfo_failed: 'Google userinfo nie powiodło się: {{status}}',
  exchange_failed: 'Wymiana tokenu Google nie powiodła się: {{status}} {{detail}}',
});
