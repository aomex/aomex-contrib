import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ga-IE */
export default I18n.satisfies(zh).define({
  app_id_empty: 'Ní féidir appId a bheith folamh',
  app_secret_empty: 'Ní féidir appSecret a bheith folamh',
  js_code_empty: 'Ní féidir jsCode a bheith folamh',
  code2session_failed: 'Theip ar WeChat code2session: {{errcode}} {{errmsg}}',
});
