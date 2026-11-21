import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lt-LT */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId negali būti tuščias',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken reikia clientSecret',
  credential_empty: 'credential / id_token negali būti tuščias',
  access_token_empty: 'accessToken negali būti tuščias',
  auth_code_empty: 'authorization code negali būti tuščias',
  refresh_token_empty: 'refreshToken negali būti tuščias',
  credential_verify_failed: 'Google credential patvirtinimas nepavyko: {{reason}}',
  hd_mismatch: 'Google credential hd nesutampa: tikėtasi {{expected}}, gauta {{actual}}',
  userinfo_failed: 'Google userinfo nepavyko: {{status}}',
  exchange_failed: 'Google žetono keitimas nepavyko: {{status}} {{detail}}',
});
