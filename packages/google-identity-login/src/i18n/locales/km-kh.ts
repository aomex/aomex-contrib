import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** km-KH */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId មិនអាចទទេបានទេ',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken ត្រូវការ clientSecret',
  credential_empty: 'credential / id_token មិនអាចទទេបានទេ',
  access_token_empty: 'accessToken មិនអាចទទេបានទេ',
  auth_code_empty: 'authorization code មិនអាចទទេបានទេ',
  refresh_token_empty: 'refreshToken មិនអាចទទេបានទេ',
  credential_verify_failed: 'ការផ្ទៀងផ្ទាត់ Google credential បរាជ័យ៖ {{reason}}',
  hd_mismatch: 'hd នៃ Google credential មិនត្រូវគ្នា៖ រំពឹង {{expected}}, បាន {{actual}}',
  userinfo_failed: 'Google userinfo បរាជ័យ៖ {{status}}',
  exchange_failed: 'ការផ្លាស់ប្តូរ token Google បរាជ័យ៖ {{status}} {{detail}}',
});
