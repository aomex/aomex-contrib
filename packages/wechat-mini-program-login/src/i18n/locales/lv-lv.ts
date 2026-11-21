import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lv-LV */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId nedrīkst būt tukšs',
  app_secret_empty: 'appSecret nedrīkst būt tukšs',
  js_code_empty: 'jsCode nedrīkst būt tukšs',
  code2session_failed: 'WeChat code2session neizdevās: {{errcode}} {{errmsg}}',
});
