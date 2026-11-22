import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** th-TH */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ต้องไม่ว่างเปล่า',
  corp_secret_empty: 'corpSecret ต้องไม่ว่างเปล่า',
  agent_id_empty: 'agentId ต้องไม่ว่างเปล่า',
  access_token_failed: 'การดึง access_token ของ WeCom ล้มเหลว: {{errcode}} {{errmsg}}',
  userinfo_failed: 'การดึงตัวตนผู้ใช้ WeCom ล้มเหลว: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo ไม่ได้คืน userid/openid',
  refresh_unsupported: 'การอนุญาตเว็บ WeCom ไม่รองรับ refresh ระดับผู้ใช้',
  revoke_unsupported: 'การอนุญาตเว็บ WeCom ไม่รองรับ revoke',
});
