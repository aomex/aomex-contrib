import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

export const en = I18n.satisfies(zh).define({
  corp_id_empty: 'corpId must not be empty',
  corp_secret_empty: 'corpSecret must not be empty',
  agent_id_empty: 'agentId must not be empty',
  access_token_failed: 'WeCom get access_token failed: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom getuserinfo failed: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo missing userid/openid',
  refresh_unsupported: 'WeCom web authorization does not support user-level refresh',
  revoke_unsupported: 'WeCom web authorization does not support revoke',
});
