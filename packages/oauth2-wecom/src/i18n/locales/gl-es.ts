import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** gl-ES */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId non pode estar baleiro',
  corp_secret_empty: 'corpSecret non pode estar baleiro',
  agent_id_empty: 'agentId non pode estar baleiro',
  corp_token_failed:
    'Fallou a obtención de access_token de WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Fallou a obtención da identidade de usuario de WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo non devolveu userid/openid',
  refresh_unsupported:
    'A autorización web de WeCom non admite refresh a nivel de usuario',
  revoke_unsupported: 'A autorización web de WeCom non admite revoke',
});
