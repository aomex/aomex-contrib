import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** 繁體中文（香港） */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId 不能為空',
  app_secret_empty: 'appSecret 不能為空',
  token_failed: '微信換取 access_token 失敗：{{errcode}} {{errmsg}}',
  refresh_failed: '微信刷新 access_token 失敗：{{errcode}} {{errmsg}}',
  userinfo_failed: '微信獲取用戶信息失敗：{{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken 不能為空',
  revoke_unsupported: '微信 SNS 授權不支持 revoke',
});
