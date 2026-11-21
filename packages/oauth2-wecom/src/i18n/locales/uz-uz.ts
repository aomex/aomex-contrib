import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** uz-UZ */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId bo‘sh bo‘lmasligi kerak',
  corp_secret_empty: 'corpSecret bo‘sh bo‘lmasligi kerak',
  agent_id_empty: 'agentId bo‘sh bo‘lmasligi kerak',
  corp_token_failed: 'WeCom access_token olish muvaffaqiyatsiz: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeCom foydalanuvchi shaxsini olish muvaffaqiyatsiz: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid qaytarmadi',
  refresh_unsupported:
    'WeCom veb avtorizatsiyasi foydalanuvchi darajasidagi refresh ni qo‘llab-quvvatlamaydi',
  revoke_unsupported: 'WeCom veb avtorizatsiyasi revoke ni qo‘llab-quvvatlamaydi',
});
