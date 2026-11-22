import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bg-BG */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не трябва да е празен',
  app_secret_empty: 'appSecret не трябва да е празен',
  token_failed: 'Обменът на access_token за WeChat не успя: {{errcode}} {{errmsg}}',
  refresh_failed:
    'Обновяването на access_token за WeChat не успя: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Получаването на потребителска информация за WeChat не успя: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken не трябва да е празен',
  revoke_unsupported: 'Упълномощаването WeChat SNS не поддържа revoke',
});
