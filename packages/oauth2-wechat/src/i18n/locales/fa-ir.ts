import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fa-IR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId نباید خالی باشد',
  app_secret_empty: 'appSecret نباید خالی باشد',
  token_failed: 'تبادل access_token وی‌چت ناموفق بود: {{errcode}} {{errmsg}}',
  refresh_failed: 'بازخوانی access_token وی‌چت ناموفق بود: {{errcode}} {{errmsg}}',
  userinfo_failed: 'دریافت اطلاعات کاربر وی‌چت ناموفق بود: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken نباید خالی باشد',
  revoke_unsupported: 'مجوز SNS وی‌چت از revoke پشتیبانی نمی‌کند',
});
