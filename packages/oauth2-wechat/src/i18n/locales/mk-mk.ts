import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mk-MK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId не смее да биде празен',
  app_secret_empty: 'appSecret не смее да биде празен',
  token_failed: 'Размената на WeChat access_token не успеа: {{errcode}} {{errmsg}}',
  refresh_failed: 'Освежувањето на WeChat access_token не успеа: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Преземањето информации за корисник на WeChat не успеа: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken не смее да биде празен',
  revoke_unsupported: 'WeChat SNS овластувањето не поддржува revoke',
});
