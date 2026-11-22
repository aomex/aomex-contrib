import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** he-IL */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId לא יכול להיות ריק',
  corp_secret_empty: 'corpSecret לא יכול להיות ריק',
  agent_id_empty: 'agentId לא יכול להיות ריק',
  access_token_failed: 'קבלת access_token של WeCom נכשלה: {{errcode}} {{errmsg}}',
  userinfo_failed: 'קבלת זהות משתמש WeCom נכשלה: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo לא החזיר userid/openid',
  refresh_unsupported: 'הרשאת האינטרנט של WeCom אינה תומכת ב-refresh ברמת משתמש',
  revoke_unsupported: 'הרשאת האינטרנט של WeCom אינה תומכת ב-revoke',
});
