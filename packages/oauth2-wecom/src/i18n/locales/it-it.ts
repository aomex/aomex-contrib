import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** it-IT */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId non deve essere vuoto',
  corp_secret_empty: 'corpSecret non deve essere vuoto',
  agent_id_empty: 'agentId non deve essere vuoto',
  access_token_failed: 'Recupero access_token WeCom non riuscito: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Recupero identità utente WeCom non riuscito: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo non ha restituito userid/openid',
  refresh_unsupported:
    "L'autorizzazione web WeCom non supporta il refresh a livello utente",
  revoke_unsupported: "L'autorizzazione web WeCom non supporta revoke",
});
