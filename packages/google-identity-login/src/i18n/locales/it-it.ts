import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** it-IT */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId non deve essere vuoto',
  client_secret_empty:
    'clientSecret è obbligatorio per exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token non deve essere vuoto',
  access_token_empty: 'accessToken non deve essere vuoto',
  auth_code_empty: 'authorization code non deve essere vuoto',
  refresh_token_empty: 'refreshToken non deve essere vuoto',
  credential_verify_failed: 'Verifica del credential Google non riuscita: {{reason}}',
  hd_mismatch:
    'hd del credential Google non corrispondente: previsto {{expected}}, ottenuto {{actual}}',
  userinfo_failed: 'Google userinfo non riuscito: {{status}}',
  exchange_failed: 'Scambio del token Google non riuscito: {{status}} {{detail}}',
});
