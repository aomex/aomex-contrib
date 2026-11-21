import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uk-UA */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId не повинен бути порожнім',
  client_secret_empty: 'для exchangeAuthCode / refreshAccessToken потрібен clientSecret',
  credential_empty: 'credential / id_token не повинен бути порожнім',
  access_token_empty: 'accessToken не повинен бути порожнім',
  auth_code_empty: 'authorization code не повинен бути порожнім',
  refresh_token_empty: 'refreshToken не повинен бути порожнім',
  credential_verify_failed: 'Не вдалося перевірити Google credential: {{reason}}',
  hd_mismatch:
    'hd Google credential не збігається: очікувалось {{expected}}, отримано {{actual}}',
  userinfo_failed: 'Помилка Google userinfo: {{status}}',
  exchange_failed: 'Помилка обміну токена Google: {{status}} {{detail}}',
});
