import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ml-IN */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ശൂന്യമായിരിക്കരുത്',
  corp_secret_empty: 'corpSecret ശൂന്യമായിരിക്കരുത്',
  agent_id_empty: 'agentId ശൂന്യമായിരിക്കരുത്',
  corp_token_failed: 'WeCom access_token ലഭ്യമാക്കൽ പരാജയപ്പെട്ടു: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom ഉപയോക്തൃ ഐഡന്റിറ്റി ലഭ്യമാക്കൽ പരാജയപ്പെട്ടു: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid തിരികെ നൽകിയില്ല',
  refresh_unsupported: 'WeCom വെബ് അംഗീകാരം ഉപയോക്തൃ-ലെവൽ refresh പിന്തുണയ്ക്കുന്നില്ല',
  revoke_unsupported: 'WeCom വെബ് അംഗീകാരം revoke പിന്തുണയ്ക്കുന്നില്ല',
});
