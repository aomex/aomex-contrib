import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ca-ES */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId no pot estar buit',
  corp_secret_empty: 'corpSecret no pot estar buit',
  agent_id_empty: 'agentId no pot estar buit',
  corp_token_failed:
    "Ha fallat l'obtenció d'access_token de WeCom: {{errcode}} {{errmsg}}",
  userinfo_failed:
    "Ha fallat l'obtenció de la identitat d'usuari de WeCom: {{errcode}} {{errmsg}}",
  userinfo_missing_identity: 'WeCom getuserinfo no ha retornat userid/openid',
  refresh_unsupported: "L'autorització web de WeCom no admet refresh a nivell d'usuari",
  revoke_unsupported: "L'autorització web de WeCom no admet revoke",
});
