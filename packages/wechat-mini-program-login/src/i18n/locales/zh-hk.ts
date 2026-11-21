import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** 繁體中文（香港） */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId 不能為空',
  app_secret_empty: 'appSecret 不能為空',
  js_code_empty: 'jsCode 不能為空',
  code2session_failed: '微信 code2session 失敗：{{errcode}} {{errmsg}}',
});
