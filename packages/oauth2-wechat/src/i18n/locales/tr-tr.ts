import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** tr-TR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId boş olmamalı',
  app_secret_empty: 'appSecret boş olmamalı',
  token_failed: 'WeChat access_token değişimi başarısız: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token yenileme başarısız: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat kullanıcı bilgisi alınamadı: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken boş olmamalı',
  revoke_unsupported: 'WeChat SNS yetkilendirmesi revoke desteklemez',
});
