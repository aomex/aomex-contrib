import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sr-RS */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ne sme biti prazan',
  client_secret_empty:
    'clientSecret je obavezan za exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token ne sme biti prazan',
  access_token_empty: 'accessToken ne sme biti prazan',
  auth_code_empty: 'authorization code ne sme biti prazan',
  refresh_token_empty: 'refreshToken ne sme biti prazan',
  credential_verify_failed: 'Provera Google credential nije uspela: {{reason}}',
  hd_mismatch:
    'hd Google credentiala se ne podudara: očekivano {{expected}}, dobijeno {{actual}}',
  userinfo_failed: 'Google userinfo nije uspeo: {{status}}',
  exchange_failed: 'Zamena Google tokena nije uspela: {{status}} {{detail}}',
});
