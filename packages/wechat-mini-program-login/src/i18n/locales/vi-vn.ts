import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** vi-VN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId không được để trống',
  app_secret_empty: 'appSecret không được để trống',
  js_code_empty: 'jsCode không được để trống',
  code2session_failed: 'WeChat code2session thất bại: {{errcode}} {{errmsg}}',
});
