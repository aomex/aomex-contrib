import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pl-PL */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nie może być pusty',
  app_secret_empty: 'appSecret nie może być pusty',
  js_code_empty: 'jsCode nie może być pusty',
  code2session_failed: 'WeChat code2session nie powiodło się: {{errcode}} {{errmsg}}',
});
