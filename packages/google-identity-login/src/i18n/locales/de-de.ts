import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** de-DE */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId darf nicht leer sein',
  client_secret_empty:
    'clientSecret ist für exchangeAuthCode / refreshAccessToken erforderlich',
  credential_empty: 'credential / id_token darf nicht leer sein',
  access_token_empty: 'accessToken darf nicht leer sein',
  auth_code_empty: 'authorization code darf nicht leer sein',
  refresh_token_empty: 'refreshToken darf nicht leer sein',
  credential_verify_failed: 'Google-credential-Überprüfung fehlgeschlagen: {{reason}}',
  hd_mismatch:
    'Google-credential-hd stimmt nicht überein: erwartet {{expected}}, erhalten {{actual}}',
  userinfo_failed: 'Google userinfo fehlgeschlagen: {{status}}',
  exchange_failed: 'Google-Token-Austausch fehlgeschlagen: {{status}} {{detail}}',
});
