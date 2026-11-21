import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** eu-ES */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ezin da hutsik egon',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken-k clientSecret behar du',
  credential_empty: 'credential / id_token ezin da hutsik egon',
  access_token_empty: 'accessToken ezin da hutsik egon',
  auth_code_empty: 'authorization code ezin da hutsik egon',
  refresh_token_empty: 'refreshToken ezin da hutsik egon',
  credential_verify_failed: 'Google credential egiaztatzeak huts egin du: {{reason}}',
  hd_mismatch:
    'Google credential hd ez dator bat: esperotakoa {{expected}}, jasotakoa {{actual}}',
  userinfo_failed: 'Google userinfo-k huts egin du: {{status}}',
  exchange_failed: 'Google token trukeak huts egin du: {{status}} {{detail}}',
});
