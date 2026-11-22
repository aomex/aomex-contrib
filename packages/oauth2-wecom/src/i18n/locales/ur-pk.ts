import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ur-PK */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId خالی نہیں ہونا چاہیے',
  corp_secret_empty: 'corpSecret خالی نہیں ہونا چاہیے',
  agent_id_empty: 'agentId خالی نہیں ہونا چاہیے',
  access_token_failed: 'WeCom access_token حاصل کرنا ناکام: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom صارف شناخت حاصل کرنا ناکام: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo نے userid/openid نہیں لوٹایا',
  refresh_unsupported: 'WeCom ویب اجازت صارف سطح کے refresh کو سپورٹ نہیں کرتی',
  revoke_unsupported: 'WeCom ویب اجازت revoke کو سپورٹ نہیں کرتی',
});
