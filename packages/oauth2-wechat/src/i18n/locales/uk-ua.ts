import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uk-UA */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не повинен бути порожнім',
  app_secret_empty: 'appSecret не повинен бути порожнім',
  token_failed: 'Помилка обміну access_token WeChat: {{errcode}} {{errmsg}}',
  refresh_failed: 'Помилка оновлення access_token WeChat: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Помилка отримання відомостей користувача WeChat: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken не повинен бути порожнім',
  revoke_unsupported: 'Авторизація WeChat SNS не підтримує revoke',
});
