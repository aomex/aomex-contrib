import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ms-MY */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId tidak boleh kosong',
  app_secret_empty: 'appSecret tidak boleh kosong',
  js_code_empty: 'jsCode tidak boleh kosong',
  code2session_failed: 'WeChat code2session gagal: {{errcode}} {{errmsg}}',
});
