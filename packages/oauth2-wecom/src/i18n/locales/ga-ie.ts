import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ga-IE */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'Ní féidir corpId a bheith folamh',
  corp_secret_empty: 'Ní féidir corpSecret a bheith folamh',
  agent_id_empty: 'Ní féidir agentId a bheith folamh',
  corp_token_failed: 'Theip ar fháil access_token WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Theip ar fháil aitheantais úsáideora WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'Níor chuir WeCom getuserinfo userid/openid ar ais',
  refresh_unsupported:
    'Ní thacaíonn údarú gréasáin WeCom le refresh ar leibhéal úsáideora',
  revoke_unsupported: 'Ní thacaíonn údarú gréasáin WeCom le revoke',
});
