import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hr-HR */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId ne smije biti prazan',
  client_secret_empty:
    'clientSecret je obavezan za exchangeAuthCode / refreshAccessToken',
  credential_empty: 'credential / id_token ne smije biti prazan',
  access_token_empty: 'accessToken ne smije biti prazan',
  auth_code_empty: 'authorization code ne smije biti prazan',
  refresh_token_empty: 'refreshToken ne smije biti prazan',
  credential_verify_failed: 'Provjera Google credential nije uspjela: {{reason}}',
  hd_mismatch:
    'hd Google credentiala se ne podudara: očekivano {{expected}}, dobiveno {{actual}}',
  userinfo_failed: 'Google userinfo nije uspio: {{status}}',
  exchange_failed: 'Zamjena Google tokena nije uspjela: {{status}} {{detail}}',
});
