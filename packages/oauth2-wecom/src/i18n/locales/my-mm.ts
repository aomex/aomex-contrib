import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** my-MM */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId သည် ဗလာမဖြစ်ရပါ',
  corp_secret_empty: 'corpSecret သည် ဗလာမဖြစ်ရပါ',
  agent_id_empty: 'agentId သည် ဗလာမဖြစ်ရပါ',
  corp_token_failed: 'WeCom access_token ရယူမှု မအောင်မြင်ပါ: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom အသုံးပြုသူအိုင်ဒီ ရယူမှု မအောင်မြင်ပါ: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo သည် userid/openid ကို ပြန်မပေးပါ',
  refresh_unsupported: 'WeCom ဝဘ်ခွင့်ပြုချက်သည် အသုံးပြုသူအဆင့် refresh ကို မပံ့ပိုးပါ',
  revoke_unsupported: 'WeCom ဝဘ်ခွင့်ပြုချက်သည် revoke ကို မပံ့ပိုးပါ',
});
