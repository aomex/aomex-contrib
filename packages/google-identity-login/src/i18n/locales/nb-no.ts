import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nb-NO */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId kan ikke være tom',
  client_secret_empty: 'clientSecret kreves for exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token kan ikke være tom',
  access_token_empty: 'accessToken kan ikke være tom',
  auth_code_empty: 'authorization code kan ikke være tom',
  refresh_token_empty: 'refreshToken kan ikke være tom',
  credential_verify_failed: 'Google-credential-verifisering mislyktes: {{reason}}',
  hd_mismatch:
    'Google-credential-hd stemmer ikke: forventet {{expected}}, fikk {{actual}}',
  userinfo_failed: 'Google userinfo mislyktes: {{status}}',
  exchange_failed: 'Google-tokenbytte mislyktes: {{status}} {{detail}}',
});
