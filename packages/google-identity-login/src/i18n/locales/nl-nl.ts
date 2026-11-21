import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nl-NL */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId mag niet leeg zijn',
  client_secret_empty:
    'clientSecret is vereist voor exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token mag niet leeg zijn',
  access_token_empty: 'accessToken mag niet leeg zijn',
  auth_code_empty: 'authorization code mag niet leeg zijn',
  refresh_token_empty: 'refreshToken mag niet leeg zijn',
  credential_verify_failed: 'Verificatie van Google-credential mislukt: {{reason}}',
  hd_mismatch:
    'Google-credential-hd komt niet overeen: verwacht {{expected}}, gekregen {{actual}}',
  userinfo_failed: 'Google userinfo mislukt: {{status}}',
  exchange_failed: 'Google-tokenuitwisseling mislukt: {{status}} {{detail}}',
});
