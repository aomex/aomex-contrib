import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nb-NO */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId kan ikke være tom',
  corp_secret_empty: 'corpSecret kan ikke være tom',
  agent_id_empty: 'agentId kan ikke være tom',
  access_token_failed: 'Henting av WeCom access_token mislyktes: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Henting av WeCom-brukeridentitet mislyktes: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo returnerte ikke userid/openid',
  refresh_unsupported: 'WeCom-webautorisering støtter ikke refresh på brukernivå',
  revoke_unsupported: 'WeCom-webautorisering støtter ikke revoke',
});
