import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lt-LT */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId negali būti tuščias',
  corp_secret_empty: 'corpSecret negali būti tuščias',
  agent_id_empty: 'agentId negali būti tuščias',
  corp_token_failed: 'WeCom access_token gavimas nepavyko: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom vartotojo tapatybės gavimas nepavyko: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo negrąžino userid/openid',
  refresh_unsupported:
    'WeCom žiniatinklio autorizacija nepalaiko vartotojo lygio refresh',
  revoke_unsupported: 'WeCom žiniatinklio autorizacija nepalaiko revoke',
});
