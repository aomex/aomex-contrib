import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sk-SK */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId nesmie byť prázdny',
  client_secret_empty:
    'pre exchangeAuthCode / refreshAccessToken je vyžadovaný clientSecret',
  credential_empty: 'credential / id_token nesmie byť prázdny',
  access_token_empty: 'accessToken nesmie byť prázdny',
  auth_code_empty: 'authorization code nesmie byť prázdny',
  refresh_token_empty: 'refreshToken nesmie byť prázdny',
  credential_verify_failed: 'Overenie Google credential zlyhalo: {{reason}}',
  hd_mismatch:
    'hd Google credential nesúhlasí: očakávané {{expected}}, získané {{actual}}',
  userinfo_failed: 'Google userinfo zlyhalo: {{status}}',
  exchange_failed: 'Výmena tokenu Google zlyhala: {{status}} {{detail}}',
});
