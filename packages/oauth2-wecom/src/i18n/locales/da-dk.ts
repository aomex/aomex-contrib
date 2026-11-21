import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** da-DK */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId må ikke være tom',
  corp_secret_empty: 'corpSecret må ikke være tom',
  agent_id_empty: 'agentId må ikke være tom',
  corp_token_failed: 'Hentning af WeCom access_token mislykkedes: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Hentning af WeCom-brugeridentitet mislykkedes: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo returnerede ikke userid/openid',
  refresh_unsupported: 'WeCom-webautorisering understøtter ikke refresh på brugerniveau',
  revoke_unsupported: 'WeCom-webautorisering understøtter ikke revoke',
});
