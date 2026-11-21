import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ar-EG */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'يجب ألا يكون corpId فارغًا',
  corp_secret_empty: 'يجب ألا يكون corpSecret فارغًا',
  agent_id_empty: 'يجب ألا يكون agentId فارغًا',
  corp_token_failed: 'فشل الحصول على access_token لـ WeCom: {{errcode}} {{errmsg}}',
  userinfo_failed: 'فشل الحصول على هوية مستخدم WeCom: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo لم يُرجع userid/openid',
  refresh_unsupported: 'تفويض ويب WeCom لا يدعم refresh على مستوى المستخدم',
  revoke_unsupported: 'تفويض ويب WeCom لا يدعم revoke',
});
