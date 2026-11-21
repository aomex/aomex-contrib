import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kmr-IQ */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId divê vala nebe',
  client_secret_empty:
    'ji bo exchangeAuthCode / refreshAccessToken clientSecret pêwîst e',
  credential_empty: 'credential / id_token divê vala nebe',
  access_token_empty: 'accessToken divê vala nebe',
  auth_code_empty: 'authorization code divê vala nebe',
  refresh_token_empty: 'refreshToken divê vala nebe',
  credential_verify_failed: 'Piştrastkirina Google credential têk çû: {{reason}}',
  hd_mismatch:
    'hd a Google credential li hev nayê: li bendê {{expected}}, hatî {{actual}}',
  userinfo_failed: 'Google userinfo têk çû: {{status}}',
  exchange_failed: 'Guhertina nîşana Google têk çû: {{status}} {{detail}}',
});
