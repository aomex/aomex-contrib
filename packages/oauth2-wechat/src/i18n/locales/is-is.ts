import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** is-IS */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId má ekki vera autt',
  app_secret_empty: 'appSecret má ekki vera autt',
  token_failed: 'WeChat access_token skipti mistókust: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token uppfærsla mistókst: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Sókn WeChat notandaupplýsinga mistókst: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken má ekki vera autt',
  revoke_unsupported: 'WeChat SNS heimild styður ekki revoke',
});
