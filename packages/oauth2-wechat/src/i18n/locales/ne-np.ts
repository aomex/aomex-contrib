import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ne-NP */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId खाली हुनु हुँदैन',
  app_secret_empty: 'appSecret खाली हुनु हुँदैन',
  token_failed: 'WeChat access_token साटासाट असफल: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token रिफ्रेश असफल: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat प्रयोगकर्ता जानकारी प्राप्त गर्न असफल: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken खाली हुनु हुँदैन',
  revoke_unsupported: 'WeChat SNS प्राधिकरणले revoke समर्थन गर्दैन',
});
