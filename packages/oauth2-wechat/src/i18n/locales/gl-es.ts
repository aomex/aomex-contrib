import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** gl-ES */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId non pode estar baleiro',
  app_secret_empty: 'appSecret non pode estar baleiro',
  token_failed: 'Fallou o intercambio de access_token de WeChat: {{errcode}} {{errmsg}}',
  refresh_failed:
    'Fallou a actualización de access_token de WeChat: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Fallou a obtención de información de usuario de WeChat: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken non pode estar baleiro',
  revoke_unsupported: 'A autorización SNS de WeChat non admite revoke',
});
