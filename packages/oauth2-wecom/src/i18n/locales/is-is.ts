import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** is-IS */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId má ekki vera autt',
  corp_secret_empty: 'corpSecret má ekki vera autt',
  agent_id_empty: 'agentId má ekki vera autt',
  access_token_failed: 'Sókn WeCom access_token mistókst: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Sókn WeCom notandaauðkennis mistókst: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo skilaði ekki userid/openid',
  refresh_unsupported: 'WeCom vefheimild styður ekki refresh á notandastigi',
  revoke_unsupported: 'WeCom vefheimild styður ekki revoke',
});
