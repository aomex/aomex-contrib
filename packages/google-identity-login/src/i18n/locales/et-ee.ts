import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** et-EE */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ei tohi olla tühi',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken jaoks on vaja clientSecret',
  credential_empty: 'credential / id_token ei tohi olla tühi',
  access_token_empty: 'accessToken ei tohi olla tühi',
  auth_code_empty: 'authorization code ei tohi olla tühi',
  refresh_token_empty: 'refreshToken ei tohi olla tühi',
  credential_verify_failed: 'Google credentiali kontrollimine ebaõnnestus: {{reason}}',
  hd_mismatch: 'Google credentiali hd ei ühti: oodatud {{expected}}, saadud {{actual}}',
  userinfo_failed: 'Google userinfo ebaõnnestus: {{status}}',
  exchange_failed: 'Google žetoni vahetamine ebaõnnestus: {{status}} {{detail}}',
});
