import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uz-UZ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId bo‘sh bo‘lmasligi kerak',
  app_secret_empty: 'appSecret bo‘sh bo‘lmasligi kerak',
  token_failed: 'WeChat access_token almashinuvi muvaffaqiyatsiz: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token yangilash muvaffaqiyatsiz: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeChat foydalanuvchi ma’lumotini olish muvaffaqiyatsiz: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken bo‘sh bo‘lmasligi kerak',
  revoke_unsupported: 'WeChat SNS avtorizatsiyasi revoke ni qo‘llab-quvvatlamaydi',
});
