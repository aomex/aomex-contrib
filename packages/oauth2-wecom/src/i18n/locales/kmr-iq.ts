import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kmr-IQ */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId divê vala nebe',
  corp_secret_empty: 'corpSecret divê vala nebe',
  agent_id_empty: 'agentId divê vala nebe',
  corp_token_failed: 'Wergirtina access_token a WeCom têk çû: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Wergirtina nasnameya bikarhênerê WeCom têk çû: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid venegerand',
  refresh_unsupported: 'Destûrdana torê ya WeCom refresh a asta bikarhêner destek nake',
  revoke_unsupported: 'Destûrdana torê ya WeCom revoke destek nake',
});
