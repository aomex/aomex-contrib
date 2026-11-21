import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kk-KZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId бос болмауы керек',
  app_secret_empty: 'appSecret бос болмауы керек',
  js_code_empty: 'jsCode бос болмауы керек',
  code2session_failed: 'WeChat code2session сәтсіз аяқталды: {{errcode}} {{errmsg}}',
});
