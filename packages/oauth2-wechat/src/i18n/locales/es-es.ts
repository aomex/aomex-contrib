import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** es-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId no debe estar vacío',
  app_secret_empty: 'appSecret no debe estar vacío',
  token_failed: 'Falló el intercambio de access_token de WeChat: {{errcode}} {{errmsg}}',
  refresh_failed:
    'Falló la actualización de access_token de WeChat: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Falló la obtención de información de usuario de WeChat: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken no debe estar vacío',
  revoke_unsupported: 'La autorización SNS de WeChat no admite revoke',
});
