import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ga-IE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'Ní féidir appId a bheith folamh',
  app_secret_empty: 'Ní féidir appSecret a bheith folamh',
  token_failed: 'Theip ar mhalartú access_token WeChat: {{errcode}} {{errmsg}}',
  refresh_failed: 'Theip ar athnuachan access_token WeChat: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Theip ar fháil faisnéise úsáideora WeChat: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'Ní féidir refreshToken a bheith folamh',
  revoke_unsupported: 'Ní thacaíonn údarú SNS WeChat le revoke',
});
