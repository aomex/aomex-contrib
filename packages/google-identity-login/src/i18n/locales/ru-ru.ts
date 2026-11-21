import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ru-RU */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId не должен быть пустым',
  client_secret_empty: 'для exchangeAuthCode / refreshAccessToken требуется clientSecret',
  credential_empty: 'credential / id_token не должен быть пустым',
  access_token_empty: 'accessToken не должен быть пустым',
  auth_code_empty: 'authorization code не должен быть пустым',
  refresh_token_empty: 'refreshToken не должен быть пустым',
  credential_verify_failed: 'Не удалось проверить Google credential: {{reason}}',
  hd_mismatch:
    'hd Google credential не совпадает: ожидалось {{expected}}, получено {{actual}}',
  userinfo_failed: 'Сбой Google userinfo: {{status}}',
  exchange_failed: 'Сбой обмена токена Google: {{status}} {{detail}}',
});
