import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bg-BG */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId не трябва да е празен',
  client_secret_empty:
    'clientSecret е задължителен за exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token не трябва да е празен',
  access_token_empty: 'accessToken не трябва да е празен',
  auth_code_empty: 'authorization code не трябва да е празен',
  refresh_token_empty: 'refreshToken не трябва да е празен',
  credential_verify_failed: 'Проверката на Google credential не успя: {{reason}}',
  hd_mismatch:
    'hd на Google credential не съвпада: очаквано {{expected}}, получено {{actual}}',
  userinfo_failed: 'Google userinfo не успя: {{status}}',
  exchange_failed: 'Обменът на Google токен не успя: {{status}} {{detail}}',
});
