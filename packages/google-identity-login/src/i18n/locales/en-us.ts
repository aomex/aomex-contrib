import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

export const en = I18n.satisfies(zh).define({
  client_id_empty: 'clientId must not be empty',
  client_secret_empty:
    'clientSecret is required for exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token must not be empty',
  access_token_empty: 'accessToken must not be empty',
  auth_code_empty: 'authorization code must not be empty',
  refresh_token_empty: 'refreshToken must not be empty',
  credential_verify_failed: 'Google credential verification failed: {{reason}}',
  hd_mismatch: 'Google credential hd mismatch: expected {{expected}}, got {{actual}}',
  userinfo_failed: 'Google userinfo failed: {{status}}',
  exchange_failed: 'Google token exchange failed: {{status}} {{detail}}',
});
