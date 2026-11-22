import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fa-IR */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId نباید خالی باشد',
  corp_secret_empty: 'corpSecret نباید خالی باشد',
  agent_id_empty: 'agentId نباید خالی باشد',
  access_token_failed: 'دریافت access_token وی‌کام ناموفق بود: {{errcode}} {{errmsg}}',
  userinfo_failed: 'دریافت هویت کاربر وی‌کام ناموفق بود: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo مقدار userid/openid برنگرداند',
  refresh_unsupported: 'مجوز وب وی‌کام از refresh در سطح کاربر پشتیبانی نمی‌کند',
  revoke_unsupported: 'مجوز وب وی‌کام از revoke پشتیبانی نمی‌کند',
});
