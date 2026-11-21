import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** be-BY */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId не павінен быць пустым',
  client_secret_empty: 'для exchangeAuthCode / refreshAccessToken патрэбны clientSecret',
  credential_empty: 'credential / id_token не павінен быць пустым',
  access_token_empty: 'accessToken не павінен быць пустым',
  auth_code_empty: 'authorization code не павінен быць пустым',
  refresh_token_empty: 'refreshToken не павінен быць пустым',
  credential_verify_failed: 'Не ўдалося праверыць Google credential: {{reason}}',
  hd_mismatch:
    'hd Google credential не супадае: чакалася {{expected}}, атрымана {{actual}}',
  userinfo_failed: 'Збой Google userinfo: {{status}}',
  exchange_failed: 'Збой абмену токена Google: {{status}} {{detail}}',
});
