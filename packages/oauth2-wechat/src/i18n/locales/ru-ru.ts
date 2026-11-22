import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ru-RU */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не должен быть пустым',
  app_secret_empty: 'appSecret не должен быть пустым',
  token_failed: 'Сбой обмена access_token WeChat: {{errcode}} {{errmsg}}',
  refresh_failed: 'Сбой обновления access_token WeChat: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Сбой получения сведений пользователя WeChat: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken не должен быть пустым',
  revoke_unsupported: 'Авторизация WeChat SNS не поддерживает revoke',
});
