import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fi-FI */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ei saa olla tyhjä',
  corp_secret_empty: 'corpSecret ei saa olla tyhjä',
  agent_id_empty: 'agentId ei saa olla tyhjä',
  corp_token_failed: 'WeCom access_token -haku epäonnistui: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom-käyttäjäidentiteetin haku epäonnistui: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo ei palauttanut userid/openid-arvoa',
  refresh_unsupported: 'WeCom-verkkovaltuutus ei tue käyttäjätason refreshia',
  revoke_unsupported: 'WeCom-verkkovaltuutus ei tue revokea',
});
