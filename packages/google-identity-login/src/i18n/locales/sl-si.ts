import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sl-SI */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ne sme biti prazen',
  client_secret_empty: 'clientSecret je obvezen za exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token ne sme biti prazen',
  access_token_empty: 'accessToken ne sme biti prazen',
  auth_code_empty: 'authorization code ne sme biti prazen',
  refresh_token_empty: 'refreshToken ne sme biti prazen',
  credential_verify_failed: 'Preverjanje Google credential ni uspelo: {{reason}}',
  hd_mismatch:
    'hd Google credential se ne ujema: pričakovano {{expected}}, prejeto {{actual}}',
  userinfo_failed: 'Google userinfo ni uspel: {{status}}',
  exchange_failed: 'Izmenjava žetona Google ni uspela: {{status}} {{detail}}',
});
