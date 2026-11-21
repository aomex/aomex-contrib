import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fr-FR */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ne doit pas être vide',
  client_secret_empty:
    'clientSecret est requis pour exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token ne doit pas être vide',
  access_token_empty: 'accessToken ne doit pas être vide',
  auth_code_empty: 'authorization code ne doit pas être vide',
  refresh_token_empty: 'refreshToken ne doit pas être vide',
  credential_verify_failed: 'Échec de la vérification du credential Google : {{reason}}',
  hd_mismatch:
    'hd du credential Google non concordant : attendu {{expected}}, reçu {{actual}}',
  userinfo_failed: 'Échec de Google userinfo : {{status}}',
  exchange_failed: "Échec de l'échange de jeton Google : {{status}} {{detail}}",
});
