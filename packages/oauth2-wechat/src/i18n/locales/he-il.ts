import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** he-IL */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId לא יכול להיות ריק',
  app_secret_empty: 'appSecret לא יכול להיות ריק',
  token_failed: 'החלפת access_token של WeChat נכשלה: {{errcode}} {{errmsg}}',
  refresh_failed: 'רענון access_token של WeChat נכשל: {{errcode}} {{errmsg}}',
  userinfo_failed: 'קבלת פרטי משתמש WeChat נכשלה: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken לא יכול להיות ריק',
  revoke_unsupported: 'הרשאת SNS של WeChat אינה תומכת ב-revoke',
});
