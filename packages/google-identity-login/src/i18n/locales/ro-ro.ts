import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ro-RO */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId nu trebuie să fie gol',
  client_secret_empty:
    'clientSecret este necesar pentru exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token nu trebuie să fie gol',
  access_token_empty: 'accessToken nu trebuie să fie gol',
  auth_code_empty: 'authorization code nu trebuie să fie gol',
  refresh_token_empty: 'refreshToken nu trebuie să fie gol',
  credential_verify_failed: 'Verificarea credential Google a eșuat: {{reason}}',
  hd_mismatch:
    'hd al credential Google nu se potrivește: așteptat {{expected}}, primit {{actual}}',
  userinfo_failed: 'Google userinfo a eșuat: {{status}}',
  exchange_failed: 'Schimbul de token Google a eșuat: {{status}} {{detail}}',
});
