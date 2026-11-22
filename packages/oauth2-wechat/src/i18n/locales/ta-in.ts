import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ta-IN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId காலியாக இருக்கக்கூடாது',
  app_secret_empty: 'appSecret காலியாக இருக்கக்கூடாது',
  token_failed: 'WeChat access_token பரிமாற்றம் தோல்வி: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token புதுப்பிப்பு தோல்வி: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat பயனர் தகவல் பெறுதல் தோல்வி: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken காலியாக இருக்கக்கூடாது',
  revoke_unsupported: 'WeChat SNS அங்கீகாரம் revoke ஐ ஆதரிக்காது',
});
