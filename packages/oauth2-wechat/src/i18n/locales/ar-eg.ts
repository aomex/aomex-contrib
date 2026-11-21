import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ar-EG */
export default I18n.satisfies(zh).define({
  app_id_empty: 'يجب ألا يكون appId فارغًا',
  app_secret_empty: 'يجب ألا يكون appSecret فارغًا',
  token_failed: 'فشل تبادل access_token لـ WeChat: {{errcode}} {{errmsg}}',
  refresh_failed: 'فشل تحديث access_token لـ WeChat: {{errcode}} {{errmsg}}',
  userinfo_failed: 'فشل الحصول على معلومات مستخدم WeChat: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'يجب ألا يكون refreshToken فارغًا',
  revoke_unsupported: 'تفويض WeChat SNS لا يدعم revoke',
});
