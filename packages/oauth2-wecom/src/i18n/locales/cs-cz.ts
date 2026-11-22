import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** cs-CZ */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId nesmí být prázdný',
  corp_secret_empty: 'corpSecret nesmí být prázdný',
  agent_id_empty: 'agentId nesmí být prázdný',
  access_token_failed: 'Získání access_token WeCom selhalo: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Získání identity uživatele WeCom selhalo: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo nevrátilo userid/openid',
  refresh_unsupported: 'Webová autorizace WeCom nepodporuje refresh na úrovni uživatele',
  revoke_unsupported: 'Webová autorizace WeCom nepodporuje revoke',
});
