import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nb-NO */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId kan ikke være tom',
  app_secret_empty: 'appSecret kan ikke være tom',
  token_failed: 'WeChat access_token-bytte mislyktes: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token-oppdatering mislyktes: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Henting av WeChat-brukerinfo mislyktes: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken kan ikke være tom',
  revoke_unsupported: 'WeChat SNS-autorisering støtter ikke revoke',
});
