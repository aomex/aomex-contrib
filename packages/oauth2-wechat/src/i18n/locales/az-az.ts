import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** az-AZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId boş olmamalıdır',
  app_secret_empty: 'appSecret boş olmamalıdır',
  token_failed: 'WeChat access_token mübadiləsi uğursuz oldu: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token yenilənməsi uğursuz oldu: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat istifadəçi məlumatı alınmadı: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken boş olmamalıdır',
  revoke_unsupported: 'WeChat SNS icazəsi revoke-u dəstəkləmir',
});
