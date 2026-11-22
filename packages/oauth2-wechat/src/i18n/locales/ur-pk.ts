import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ur-PK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId خالی نہیں ہونا چاہیے',
  app_secret_empty: 'appSecret خالی نہیں ہونا چاہیے',
  token_failed: 'WeChat access_token تبادلہ ناکام: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token ریفریش ناکام: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat صارف معلومات حاصل کرنا ناکام: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken خالی نہیں ہونا چاہیے',
  revoke_unsupported: 'WeChat SNS اجازت revoke کو سپورٹ نہیں کرتی',
});
