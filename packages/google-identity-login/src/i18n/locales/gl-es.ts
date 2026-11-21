import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** gl-ES */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId non pode estar baleiro',
  client_secret_empty:
    'clientSecret é obrigatorio para exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token non pode estar baleiro',
  access_token_empty: 'accessToken non pode estar baleiro',
  auth_code_empty: 'authorization code non pode estar baleiro',
  refresh_token_empty: 'refreshToken non pode estar baleiro',
  credential_verify_failed: 'Fallou a verificación do credential de Google: {{reason}}',
  hd_mismatch:
    'hd do credential de Google non coincide: esperábase {{expected}}, obtívose {{actual}}',
  userinfo_failed: 'Fallou Google userinfo: {{status}}',
  exchange_failed: 'Fallou o intercambio de token de Google: {{status}} {{detail}}',
});
