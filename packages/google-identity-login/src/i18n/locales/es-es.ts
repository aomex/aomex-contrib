import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** es-ES */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId no debe estar vacío',
  client_secret_empty:
    'clientSecret es obligatorio para exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token no debe estar vacío',
  access_token_empty: 'accessToken no debe estar vacío',
  auth_code_empty: 'authorization code no debe estar vacío',
  refresh_token_empty: 'refreshToken no debe estar vacío',
  credential_verify_failed: 'Falló la verificación del credential de Google: {{reason}}',
  hd_mismatch:
    'hd del credential de Google no coincide: se esperaba {{expected}}, se obtuvo {{actual}}',
  userinfo_failed: 'Falló Google userinfo: {{status}}',
  exchange_failed: 'Falló el intercambio de token de Google: {{status}} {{detail}}',
});
