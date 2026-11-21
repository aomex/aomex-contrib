import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** hi-IN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId खाली नहीं होना चाहिए',
  app_secret_empty: 'appSecret खाली नहीं होना चाहिए',
  token_failed: 'WeChat access_token विनिमय विफल: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token रीफ़्रेश विफल: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat उपयोगकर्ता जानकारी प्राप्त करना विफल: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken खाली नहीं होना चाहिए',
  revoke_unsupported: 'WeChat SNS प्राधिकरण revoke का समर्थन नहीं करता',
});
