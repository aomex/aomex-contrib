import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** da-DK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId må ikke være tom',
  app_secret_empty: 'appSecret må ikke være tom',
  token_failed: 'WeChat access_token-udveksling mislykkedes: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token-opdatering mislykkedes: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Hentning af WeChat-brugerinfo mislykkedes: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken må ikke være tom',
  revoke_unsupported: 'WeChat SNS-autorisering understøtter ikke revoke',
});
