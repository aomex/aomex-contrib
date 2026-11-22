import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** bn-BD */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId খালি রাখা যাবে না',
  app_secret_empty: 'appSecret খালি রাখা যাবে না',
  token_failed: 'WeChat access_token বিনিময় ব্যর্থ: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token রিফ্রেশ ব্যর্থ: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat ব্যবহারকারী তথ্য পাওয়া ব্যর্থ: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken খালি রাখা যাবে না',
  revoke_unsupported: 'WeChat SNS অনুমোদন revoke সমর্থন করে না',
});
