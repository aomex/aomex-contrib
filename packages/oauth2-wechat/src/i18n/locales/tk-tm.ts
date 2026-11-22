import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tk-TM */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId boş bolmaly däl',
  app_secret_empty: 'appSecret boş bolmaly däl',
  token_failed: 'WeChat access_token çalşygy şowsuz: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token täzeleme şowsuz: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat ulanyjy maglumatyny almak şowsuz: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken boş bolmaly däl',
  revoke_unsupported: 'WeChat SNS ygtyýarnamasy revoke goldamaýar',
});
