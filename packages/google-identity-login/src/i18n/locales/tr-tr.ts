import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tr-TR */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId boş olmamalı',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken için clientSecret gerekli',
  credential_empty: 'credential / id_token boş olmamalı',
  access_token_empty: 'accessToken boş olmamalı',
  auth_code_empty: 'authorization code boş olmamalı',
  refresh_token_empty: 'refreshToken boş olmamalı',
  credential_verify_failed: 'Google credential doğrulaması başarısız: {{reason}}',
  hd_mismatch: 'Google credential hd uyuşmuyor: beklenen {{expected}}, alınan {{actual}}',
  userinfo_failed: 'Google userinfo başarısız: {{status}}',
  exchange_failed: 'Google jeton değişimi başarısız: {{status}} {{detail}}',
});
