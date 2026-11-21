import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ml-IN */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ശൂന്യമായിരിക്കരുത്',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken-ന് clientSecret ആവശ്യമാണ്',
  credential_empty: 'credential / id_token ശൂന്യമായിരിക്കരുത്',
  access_token_empty: 'accessToken ശൂന്യമായിരിക്കരുത്',
  auth_code_empty: 'authorization code ശൂന്യമായിരിക്കരുത്',
  refresh_token_empty: 'refreshToken ശൂന്യമായിരിക്കരുത്',
  credential_verify_failed: 'Google credential പരിശോധന പരാജയപ്പെട്ടു: {{reason}}',
  hd_mismatch:
    'Google credential hd പൊരുത്തപ്പെടുന്നില്ല: പ്രതീക്ഷിച്ചത് {{expected}}, ലഭിച്ചത് {{actual}}',
  userinfo_failed: 'Google userinfo പരാജയപ്പെട്ടു: {{status}}',
  exchange_failed: 'Google ടോക്കൺ കൈമാറ്റം പരാജയപ്പെട്ടു: {{status}} {{detail}}',
});
