import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uk-UA */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId не повинен бути порожнім',
  corp_secret_empty: 'corpSecret не повинен бути порожнім',
  agent_id_empty: 'agentId не повинен бути порожнім',
  access_token_failed: 'Помилка отримання access_token WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Помилка отримання ідентичності користувача WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo не повернув userid/openid',
  refresh_unsupported: 'Веб-авторизація WeCom не підтримує refresh на рівні користувача',
  revoke_unsupported: 'Веб-авторизація WeCom не підтримує revoke',
});
