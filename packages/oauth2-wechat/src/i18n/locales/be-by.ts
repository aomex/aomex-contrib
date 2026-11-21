import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** be-BY */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не павінен быць пустым',
  app_secret_empty: 'appSecret не павінен быць пустым',
  token_failed: 'Збой абмену access_token WeChat: {{errcode}} {{errmsg}}',
  refresh_failed: 'Збой абнаўлення access_token WeChat: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Збой атрымання звестак карыстальніка WeChat: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken не павінен быць пустым',
  revoke_unsupported: 'Аўтарызацыя WeChat SNS не падтрымлівае revoke',
});
