import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bn-BD */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId খালি রাখা যাবে না',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken-এর জন্য clientSecret প্রয়োজন',
  credential_empty: 'credential / id_token খালি রাখা যাবে না',
  access_token_empty: 'accessToken খালি রাখা যাবে না',
  auth_code_empty: 'authorization code খালি রাখা যাবে না',
  refresh_token_empty: 'refreshToken খালি রাখা যাবে না',
  credential_verify_failed: 'Google credential যাচাই ব্যর্থ: {{reason}}',
  hd_mismatch: 'Google credential hd মেলে না: প্রত্যাশিত {{expected}}, পাওয়া {{actual}}',
  userinfo_failed: 'Google userinfo ব্যর্থ: {{status}}',
  exchange_failed: 'Google টোকেন বিনিময় ব্যর্থ: {{status}} {{detail}}',
});
