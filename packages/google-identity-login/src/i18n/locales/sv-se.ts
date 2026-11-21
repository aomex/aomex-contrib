import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sv-SE */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId får inte vara tomt',
  client_secret_empty: 'clientSecret krävs för exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token får inte vara tomt',
  access_token_empty: 'accessToken får inte vara tomt',
  auth_code_empty: 'authorization code får inte vara tomt',
  refresh_token_empty: 'refreshToken får inte vara tomt',
  credential_verify_failed: 'Verifiering av Google-credential misslyckades: {{reason}}',
  hd_mismatch:
    'Google-credential-hd stämmer inte: förväntat {{expected}}, fick {{actual}}',
  userinfo_failed: 'Google userinfo misslyckades: {{status}}',
  exchange_failed: 'Google-tokenutbyte misslyckades: {{status}} {{detail}}',
});
