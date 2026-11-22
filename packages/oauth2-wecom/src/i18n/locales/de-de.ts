import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** de-DE */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId darf nicht leer sein',
  corp_secret_empty: 'corpSecret darf nicht leer sein',
  agent_id_empty: 'agentId darf nicht leer sein',
  access_token_failed: 'WeCom access_token-Abruf fehlgeschlagen: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Abrufen der WeCom-Besucheridentität fehlgeschlagen: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo hat kein userid/openid zurückgegeben',
  refresh_unsupported:
    'WeCom-Webautorisierung unterstützt kein refresh auf Benutzerebene',
  revoke_unsupported: 'WeCom-Webautorisierung unterstützt kein revoke',
});
