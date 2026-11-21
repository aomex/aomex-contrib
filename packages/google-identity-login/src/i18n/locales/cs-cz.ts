import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** cs-CZ */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId nesmí být prázdný',
  client_secret_empty:
    'pro exchangeAuthCode / refreshAccessToken je vyžadován clientSecret',
  credential_empty: 'credential / id_token nesmí být prázdný',
  access_token_empty: 'accessToken nesmí být prázdný',
  auth_code_empty: 'authorization code nesmí být prázdný',
  refresh_token_empty: 'refreshToken nesmí být prázdný',
  credential_verify_failed: 'Ověření Google credential selhalo: {{reason}}',
  hd_mismatch:
    'hd Google credential nesouhlasí: očekáváno {{expected}}, získáno {{actual}}',
  userinfo_failed: 'Google userinfo selhalo: {{status}}',
  exchange_failed: 'Výměna tokenu Google selhala: {{status}} {{detail}}',
});
