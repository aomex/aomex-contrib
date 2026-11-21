import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** de-DE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId darf nicht leer sein',
  app_secret_empty: 'appSecret darf nicht leer sein',
  token_failed: 'WeChat access_token-Austausch fehlgeschlagen: {{errcode}} {{errmsg}}',
  refresh_failed:
    'WeChat access_token-Aktualisierung fehlgeschlagen: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Abrufen der WeChat-Benutzerinformationen fehlgeschlagen: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken darf nicht leer sein',
  revoke_unsupported: 'WeChat-SNS-Autorisierung unterstützt kein revoke',
});
