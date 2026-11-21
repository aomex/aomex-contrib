import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fr-FR */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ne doit pas être vide',
  corp_secret_empty: 'corpSecret ne doit pas être vide',
  agent_id_empty: 'agentId ne doit pas être vide',
  corp_token_failed:
    "Échec de l'obtention de access_token WeCom : {{errcode}} {{errmsg}}",
  userinfo_failed:
    "Échec de l'obtention de l'identité utilisateur WeCom : {{errcode}} {{errmsg}}",
  userinfo_missing_identity: "WeCom getuserinfo n'a pas renvoyé userid/openid",
  refresh_unsupported:
    "L'autorisation Web WeCom ne prend pas en charge le refresh au niveau utilisateur",
  revoke_unsupported: "L'autorisation Web WeCom ne prend pas en charge revoke",
});
