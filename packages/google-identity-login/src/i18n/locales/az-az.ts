import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** az-AZ */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId boş olmamalıdır',
  client_secret_empty:
    'exchangeAuthCode / refreshAccessToken üçün clientSecret tələb olunur',
  credential_empty: 'credential / id_token boş olmamalıdır',
  access_token_empty: 'accessToken boş olmamalıdır',
  auth_code_empty: 'authorization code boş olmamalıdır',
  refresh_token_empty: 'refreshToken boş olmamalıdır',
  credential_verify_failed: 'Google credential yoxlaması uğursuz oldu: {{reason}}',
  hd_mismatch:
    'Google credential hd uyğun gəlmir: gözlənilən {{expected}}, alınan {{actual}}',
  userinfo_failed: 'Google userinfo uğursuz oldu: {{status}}',
  exchange_failed: 'Google token mübadiləsi uğursuz oldu: {{status}} {{detail}}',
});
