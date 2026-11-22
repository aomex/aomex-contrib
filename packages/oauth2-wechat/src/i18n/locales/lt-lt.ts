import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lt-LT */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId negali būti tuščias',
  app_secret_empty: 'appSecret negali būti tuščias',
  token_failed: 'WeChat access_token keitimas nepavyko: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token atnaujinimas nepavyko: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeChat vartotojo informacijos gavimas nepavyko: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken negali būti tuščias',
  revoke_unsupported: 'WeChat SNS autorizacija nepalaiko revoke',
});
