import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sv-SE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId får inte vara tomt',
  app_secret_empty: 'appSecret får inte vara tomt',
  token_failed: 'WeChat access_token-utbyte misslyckades: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token-uppdatering misslyckades: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Hämtning av WeChat-användarinfo misslyckades: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken får inte vara tomt',
  revoke_unsupported: 'WeChat SNS-auktorisering stöder inte revoke',
});
