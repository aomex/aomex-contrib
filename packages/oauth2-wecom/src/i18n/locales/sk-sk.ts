import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sk-SK */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId nesmie byť prázdny',
  corp_secret_empty: 'corpSecret nesmie byť prázdny',
  agent_id_empty: 'agentId nesmie byť prázdny',
  access_token_failed: 'Získanie access_token WeCom zlyhalo: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Získanie identity používateľa WeCom zlyhalo: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo nevrátilo userid/openid',
  refresh_unsupported:
    'Webová autorizácia WeCom nepodporuje refresh na úrovni používateľa',
  revoke_unsupported: 'Webová autorizácia WeCom nepodporuje revoke',
});
