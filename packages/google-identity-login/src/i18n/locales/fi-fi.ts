import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fi-FI */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ei saa olla tyhjä',
  client_secret_empty:
    'clientSecret vaaditaan exchangeAuthCode / refreshAccessToken -kutsuille',
  credential_empty: 'credential / id_token ei saa olla tyhjä',
  access_token_empty: 'accessToken ei saa olla tyhjä',
  auth_code_empty: 'authorization code ei saa olla tyhjä',
  refresh_token_empty: 'refreshToken ei saa olla tyhjä',
  credential_verify_failed: 'Google-credentialin vahvistus epäonnistui: {{reason}}',
  hd_mismatch:
    'Google-credentialin hd ei täsmää: odotettu {{expected}}, saatu {{actual}}',
  userinfo_failed: 'Google userinfo epäonnistui: {{status}}',
  exchange_failed: 'Google-tunnuksen vaihto epäonnistui: {{status}} {{detail}}',
});
