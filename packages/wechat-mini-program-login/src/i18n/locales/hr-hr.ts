import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hr-HR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ne smije biti prazan',
  app_secret_empty: 'appSecret ne smije biti prazan',
  js_code_empty: 'jsCode ne smije biti prazan',
  code2session_failed: 'WeChat code2session nije uspio: {{errcode}} {{errmsg}}',
});
