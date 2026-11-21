import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ur-PK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId خالی نہیں ہونا چاہیے',
  app_secret_empty: 'appSecret خالی نہیں ہونا چاہیے',
  js_code_empty: 'jsCode خالی نہیں ہونا چاہیے',
  code2session_failed: 'WeChat code2session ناکام: {{errcode}} {{errmsg}}',
});
