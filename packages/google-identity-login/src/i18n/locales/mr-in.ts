import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mr-IN */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId रिक्त असू नये',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken साठी clientSecret आवश्यक आहे',
  credential_empty: 'credential / id_token रिक्त असू नये',
  access_token_empty: 'accessToken रिक्त असू नये',
  auth_code_empty: 'authorization code रिक्त असू नये',
  refresh_token_empty: 'refreshToken रिक्त असू नये',
  credential_verify_failed: 'Google credential पडताळणी अयशस्वी: {{reason}}',
  hd_mismatch: 'Google credential hd जुळत नाही: अपेक्षित {{expected}}, मिळाले {{actual}}',
  userinfo_failed: 'Google userinfo अयशस्वी: {{status}}',
  exchange_failed: 'Google टोकन देवाणघेवाण अयशस्वी: {{status}} {{detail}}',
});
