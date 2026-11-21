import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** si-LK */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId හිස් විය නොහැක',
  corp_secret_empty: 'corpSecret හිස් විය නොහැක',
  agent_id_empty: 'agentId හිස් විය නොහැක',
  corp_token_failed: 'WeCom access_token ලබා ගැනීම අසාර්ථකයි: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom පරිශීලක අනන්‍යතාව ලබා ගැනීම අසාර්ථකයි: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid ආපසු ලබා දුන්නේ නැත',
  refresh_unsupported: 'WeCom වෙබ් අවසරය පරිශීලක මට්ටමේ refresh සඳහා සහාය නොදක්වයි',
  revoke_unsupported: 'WeCom වෙබ් අවසරය revoke සඳහා සහාය නොදක්වයි',
});
