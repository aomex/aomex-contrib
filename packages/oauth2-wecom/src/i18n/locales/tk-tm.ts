import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tk-TM */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId boş bolmaly däl',
  corp_secret_empty: 'corpSecret boş bolmaly däl',
  agent_id_empty: 'agentId boş bolmaly däl',
  access_token_failed: 'WeCom access_token almak şowsuz: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom ulanyjy şahsyýetini almak şowsuz: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid gaýtarmady',
  refresh_unsupported:
    'WeCom web ygtyýarnamasy ulanyjy derejesindäki refresh-i goldamaýar',
  revoke_unsupported: 'WeCom web ygtyýarnamasy revoke goldamaýar',
});
