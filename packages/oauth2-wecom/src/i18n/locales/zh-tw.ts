import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** 繁體中文（台灣） */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId 不能為空',
  corp_secret_empty: 'corpSecret 不能為空',
  agent_id_empty: 'agentId 不能為空',
  access_token_failed: '企業微信取得 access_token 失敗：{{errcode}} {{errmsg}}',
  userinfo_failed: '企業微信取得造訪使用者身分失敗：{{errcode}} {{errmsg}}',
  userinfo_missing_identity: '企業微信 getuserinfo 未回傳 userid/openid',
  refresh_unsupported: '企業微信網頁授權不支援使用者級 refresh',
  revoke_unsupported: '企業微信網頁授權不支援 revoke',
});
