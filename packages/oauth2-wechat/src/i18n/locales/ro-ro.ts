import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ro-RO */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nu trebuie să fie gol',
  app_secret_empty: 'appSecret nu trebuie să fie gol',
  token_failed: 'Schimbul access_token WeChat a eșuat: {{errcode}} {{errmsg}}',
  refresh_failed: 'Reîmprospătarea access_token WeChat a eșuat: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'Obținerea informațiilor utilizatorului WeChat a eșuat: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken nu trebuie să fie gol',
  revoke_unsupported: 'Autorizarea SNS WeChat nu acceptă revoke',
});
