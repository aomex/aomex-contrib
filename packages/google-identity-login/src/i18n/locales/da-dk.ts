import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** da-DK */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId må ikke være tom',
  client_secret_empty:
    'clientSecret er påkrævet for exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token må ikke være tom',
  access_token_empty: 'accessToken må ikke være tom',
  auth_code_empty: 'authorization code må ikke være tom',
  refresh_token_empty: 'refreshToken må ikke være tom',
  credential_verify_failed: 'Bekræftelse af Google-credential mislykkedes: {{reason}}',
  hd_mismatch:
    'Google-credential-hd stemmer ikke: forventet {{expected}}, fik {{actual}}',
  userinfo_failed: 'Google userinfo mislykkedes: {{status}}',
  exchange_failed: 'Google-tokenudveksling mislykkedes: {{status}} {{detail}}',
});
