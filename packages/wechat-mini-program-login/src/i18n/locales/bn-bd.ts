import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bn-BD */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId খালি রাখা যাবে না',
  app_secret_empty: 'appSecret খালি রাখা যাবে না',
  js_code_empty: 'jsCode খালি রাখা যাবে না',
  code2session_failed: 'WeChat code2session ব্যর্থ: {{errcode}} {{errmsg}}',
});
