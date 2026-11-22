import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** si-LK */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId හිස් විය නොහැක',
  app_secret_empty: 'appSecret හිස් විය නොහැක',
  token_failed: 'WeChat access_token හුවමාරුව අසාර්ථකයි: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token යාවත්කාලීන කිරීම අසාර්ථකයි: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat පරිශීලක තොරතුරු ලබා ගැනීම අසාර්ථකයි: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken හිස් විය නොහැක',
  revoke_unsupported: 'WeChat SNS අවසරය revoke සඳහා සහාය නොදක්වයි',
});
