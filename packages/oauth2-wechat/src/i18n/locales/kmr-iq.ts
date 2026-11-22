import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kmr-IQ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId divê vala nebe',
  app_secret_empty: 'appSecret divê vala nebe',
  token_failed: 'Guhertina access_token a WeChat têk çû: {{errcode}} {{errmsg}}',
  refresh_failed: 'Nûkirina access_token a WeChat têk çû: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Wergirtina agahdariya bikarhênerê WeChat têk çû: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken divê vala nebe',
  revoke_unsupported: 'Destûrdana SNS a WeChat revoke destek nake',
});
