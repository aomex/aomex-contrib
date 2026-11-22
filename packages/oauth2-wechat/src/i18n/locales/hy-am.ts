import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hy-AM */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId-ը չպետք է դատարկ լինի',
  app_secret_empty: 'appSecret-ը չպետք է դատարկ լինի',
  token_failed: 'WeChat access_token փոխանակումը ձախողվեց՝ {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token թարմացումը ձախողվեց՝ {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeChat օգտատիրոջ տեղեկության ստացումը ձախողվեց՝ {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken-ը չպետք է դատարկ լինի',
  revoke_unsupported: 'WeChat SNS թույլտվությունը չի աջակցում revoke',
});
