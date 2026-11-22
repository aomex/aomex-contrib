import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** 繁體中文（香港） */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId 不能為空',
  corp_secret_empty: 'corpSecret 不能為空',
  agent_id_empty: 'agentId 不能為空',
  access_token_failed: '企業微信獲取 access_token 失敗：{{errcode}} {{errmsg}}',
  userinfo_failed: '企業微信獲取訪問用戶身份失敗：{{errcode}} {{errmsg}}',
  userinfo_missing_identity: '企業微信 getuserinfo 未返回 userid/openid',
  refresh_unsupported: '企業微信網頁授權不支持用戶級 refresh',
  revoke_unsupported: '企業微信網頁授權不支持 revoke',
});
