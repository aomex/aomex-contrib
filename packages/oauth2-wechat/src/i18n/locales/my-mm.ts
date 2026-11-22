import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** my-MM */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId သည် ဗလာမဖြစ်ရပါ',
  app_secret_empty: 'appSecret သည် ဗလာမဖြစ်ရပါ',
  token_failed: 'WeChat access_token လဲလှယ်မှု မအောင်မြင်ပါ: {{errcode}} {{errmsg}}',
  refresh_failed: 'WeChat access_token ပြန်လည်ဆန်းသစ်မှု မအောင်မြင်ပါ: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeChat အသုံးပြုသူအချက်အလက် ရယူမှု မအောင်မြင်ပါ: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken သည် ဗလာမဖြစ်ရပါ',
  revoke_unsupported: 'WeChat SNS ခွင့်ပြုချက်သည် revoke ကို မပံ့ပိုးပါ',
});
