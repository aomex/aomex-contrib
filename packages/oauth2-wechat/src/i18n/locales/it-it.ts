import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** it-IT */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId non deve essere vuoto',
  app_secret_empty: 'appSecret non deve essere vuoto',
  token_failed: 'Scambio access_token WeChat non riuscito: {{errcode}} {{errmsg}}',
  refresh_failed:
    'Aggiornamento access_token WeChat non riuscito: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Recupero informazioni utente WeChat non riuscito: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken non deve essere vuoto',
  revoke_unsupported: "L'autorizzazione SNS WeChat non supporta revoke",
});
