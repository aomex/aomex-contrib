import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** es-ES */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId no debe estar vacío',
  corp_secret_empty: 'corpSecret no debe estar vacío',
  agent_id_empty: 'agentId no debe estar vacío',
  access_token_failed:
    'Falló la obtención de access_token de WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Falló la obtención de la identidad de usuario de WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo no devolvió userid/openid',
  refresh_unsupported:
    'La autorización web de WeCom no admite refresh a nivel de usuario',
  revoke_unsupported: 'La autorización web de WeCom no admite revoke',
});
