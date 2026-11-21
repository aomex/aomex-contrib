import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tk-TM */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId boş bolmaly däl',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken üçin clientSecret gerek',
  credential_empty: 'credential / id_token boş bolmaly däl',
  access_token_empty: 'accessToken boş bolmaly däl',
  auth_code_empty: 'authorization code boş bolmaly däl',
  refresh_token_empty: 'refreshToken boş bolmaly däl',
  credential_verify_failed: 'Google credential barlagy şowsuz: {{reason}}',
  hd_mismatch:
    'Google credential hd gabat gelmeýär: garaşylan {{expected}}, alnan {{actual}}',
  userinfo_failed: 'Google userinfo şowsuz: {{status}}',
  exchange_failed: 'Google token çalşygy şowsuz: {{status}} {{detail}}',
});
