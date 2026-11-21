import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** kk-KZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId бос болмауы керек',
  app_secret_empty: 'appSecret бос болмауы керек',
  token_failed: 'WeChat access_token алмастыру сәтсіз аяқталды: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token жаңарту сәтсіз аяқталды: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeChat пайдаланушы ақпаратын алу сәтсіз аяқталды: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken бос болмауы керек',
  revoke_unsupported: 'WeChat SNS рұқсаты revoke қолдамайды',
});
