import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** th-TH */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId ต้องไม่ว่างเปล่า',
  app_secret_empty: 'appSecret ต้องไม่ว่างเปล่า',
  token_failed: 'การแลก access_token ของ WeChat ล้มเหลว: {{errcode}} {{errmsg}}',
  refresh_failed: 'การรีเฟรช access_token ของ WeChat ล้มเหลว: {{errcode}} {{errmsg}}',
  userinfo_failed: 'การดึงข้อมูลผู้ใช้ WeChat ล้มเหลว: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken ต้องไม่ว่างเปล่า',
  revoke_unsupported: 'การอนุญาต SNS ของ WeChat ไม่รองรับ revoke',
});
