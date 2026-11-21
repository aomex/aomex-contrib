import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mk-MK */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId не смее да биде празен',
  client_secret_empty:
    'clientSecret е задолжителен за exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token не смее да биде празен',
  access_token_empty: 'accessToken не смее да биде празен',
  auth_code_empty: 'authorization code не смее да биде празен',
  refresh_token_empty: 'refreshToken не смее да биде празен',
  credential_verify_failed: 'Проверката на Google credential не успеа: {{reason}}',
  hd_mismatch:
    'hd на Google credential не се совпаѓа: очекувано {{expected}}, добиено {{actual}}',
  userinfo_failed: 'Google userinfo не успеа: {{status}}',
  exchange_failed: 'Размената на Google токен не успеа: {{status}} {{detail}}',
});
