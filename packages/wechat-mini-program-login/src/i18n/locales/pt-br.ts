import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pt-BR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId não pode estar vazio',
  app_secret_empty: 'appSecret não pode estar vazio',
  js_code_empty: 'jsCode não pode estar vazio',
  code2session_failed: 'Falha no WeChat code2session: {{errcode}} {{errmsg}}',
});
