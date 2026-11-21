import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ne-NP */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId खाली हुनु हुँदैन',
  client_secret_empty:
    'exchangeAuthCode / refreshAccessToken का लागि clientSecret आवश्यक छ',
  credential_empty: 'credential / id_token खाली हुनु हुँदैन',
  access_token_empty: 'accessToken खाली हुनु हुँदैन',
  auth_code_empty: 'authorization code खाली हुनु हुँदैन',
  refresh_token_empty: 'refreshToken खाली हुनु हुँदैन',
  credential_verify_failed: 'Google credential प्रमाणीकरण असफल: {{reason}}',
  hd_mismatch: 'Google credential hd मेल खाँदैन: अपेक्षित {{expected}}, प्राप्त {{actual}}',
  userinfo_failed: 'Google userinfo असफल: {{status}}',
  exchange_failed: 'Google टोकन साटासाट असफल: {{status}} {{detail}}',
});
