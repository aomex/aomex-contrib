import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** sv-SE */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId får inte vara tomt',
  corp_secret_empty: 'corpSecret får inte vara tomt',
  agent_id_empty: 'agentId får inte vara tomt',
  corp_token_failed:
    'Hämtning av WeCom access_token misslyckades: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Hämtning av WeCom-användaridentitet misslyckades: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo returnerade inte userid/openid',
  refresh_unsupported: 'WeCom-webbauktorisering stöder inte refresh på användarnivå',
  revoke_unsupported: 'WeCom-webbauktorisering stöder inte revoke',
});
