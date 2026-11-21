import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ca-ES */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId no pot estar buit',
  client_secret_empty:
    'clientSecret és obligatori per a exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token no pot estar buit',
  access_token_empty: 'accessToken no pot estar buit',
  auth_code_empty: 'authorization code no pot estar buit',
  refresh_token_empty: 'refreshToken no pot estar buit',
  credential_verify_failed:
    'Ha fallat la verificació del credential de Google: {{reason}}',
  hd_mismatch:
    'hd del credential de Google no coincideix: s’esperava {{expected}}, s’ha obtingut {{actual}}',
  userinfo_failed: 'Ha fallat Google userinfo: {{status}}',
  exchange_failed: "Ha fallat l'intercanvi de token de Google: {{status}} {{detail}}",
});
