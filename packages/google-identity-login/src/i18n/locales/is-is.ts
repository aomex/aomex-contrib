import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** is-IS */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId má ekki vera autt',
  client_secret_empty:
    'clientSecret er nauðsynlegt fyrir exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token má ekki vera autt',
  access_token_empty: 'accessToken má ekki vera autt',
  auth_code_empty: 'authorization code má ekki vera autt',
  refresh_token_empty: 'refreshToken má ekki vera autt',
  credential_verify_failed: 'Staðfesting Google credential mistókst: {{reason}}',
  hd_mismatch: 'hd Google credential passar ekki: áætlað {{expected}}, fékk {{actual}}',
  userinfo_failed: 'Google userinfo mistókst: {{status}}',
  exchange_failed: 'Google táknaskipti mistókust: {{status}} {{detail}}',
});
