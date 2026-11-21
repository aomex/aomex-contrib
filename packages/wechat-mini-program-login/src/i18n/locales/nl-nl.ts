import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** nl-NL */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId mag niet leeg zijn',
  app_secret_empty: 'appSecret mag niet leeg zijn',
  js_code_empty: 'jsCode mag niet leeg zijn',
  code2session_failed: 'WeChat code2session mislukt: {{errcode}} {{errmsg}}',
});
