import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hi-IN */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId खाली नहीं होना चाहिए',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken के लिए clientSecret आवश्यक है',
  credential_empty: 'credential / id_token खाली नहीं होना चाहिए',
  access_token_empty: 'accessToken खाली नहीं होना चाहिए',
  auth_code_empty: 'authorization code खाली नहीं होना चाहिए',
  refresh_token_empty: 'refreshToken खाली नहीं होना चाहिए',
  credential_verify_failed: 'Google credential सत्यापन विफल: {{reason}}',
  hd_mismatch: 'Google credential hd मेल नहीं खाता: अपेक्षित {{expected}}, प्राप्त {{actual}}',
  userinfo_failed: 'Google userinfo विफल: {{status}}',
  exchange_failed: 'Google टोकन विनिमय विफल: {{status}} {{detail}}',
});
