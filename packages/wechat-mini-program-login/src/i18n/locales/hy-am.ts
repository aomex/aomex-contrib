import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hy-AM */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId-ը չպետք է դատարկ լինի',
  app_secret_empty: 'appSecret-ը չպետք է դատարկ լինի',
  js_code_empty: 'jsCode-ը չպետք է դատարկ լինի',
  code2session_failed: 'WeChat code2session-ը ձախողվեց՝ {{errcode}} {{errmsg}}',
});
