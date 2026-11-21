import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ga-IE */
export default I18n.satisfies(zh).define({
  client_id_empty: 'Ní féidir clientId a bheith folamh',
  client_secret_empty:
    'Tá clientSecret ag teastáil le haghaidh exchangeAuthCode / refreshAccessToken',
  credential_empty: 'Ní féidir credential / id_token a bheith folamh',
  access_token_empty: 'Ní féidir accessToken a bheith folamh',
  auth_code_empty: 'Ní féidir authorization code a bheith folamh',
  refresh_token_empty: 'Ní féidir refreshToken a bheith folamh',
  credential_verify_failed: 'Theip ar fhíorú Google credential: {{reason}}',
  hd_mismatch:
    'Ní mheaitseálann hd an Google credential: {{expected}} a rabhthas ag súil leis, {{actual}} a fuarthas',
  userinfo_failed: 'Theip ar Google userinfo: {{status}}',
  exchange_failed: 'Theip ar mhalartú comhartha Google: {{status}} {{detail}}',
});
