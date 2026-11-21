import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** my-MM */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId သည် ဗလာမဖြစ်ရပါ',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken အတွက် clientSecret လိုအပ်သည်',
  credential_empty: 'credential / id_token သည် ဗလာမဖြစ်ရပါ',
  access_token_empty: 'accessToken သည် ဗလာမဖြစ်ရပါ',
  auth_code_empty: 'authorization code သည် ဗလာမဖြစ်ရပါ',
  refresh_token_empty: 'refreshToken သည် ဗလာမဖြစ်ရပါ',
  credential_verify_failed: 'Google credential အတည်ပြုမှု မအောင်မြင်ပါ: {{reason}}',
  hd_mismatch: 'Google credential hd မကိုက်ညီပါ: မျှော်မှန်း {{expected}}, ရရှိ {{actual}}',
  userinfo_failed: 'Google userinfo မအောင်မြင်ပါ: {{status}}',
  exchange_failed: 'Google တိုကင်လဲလှယ်မှု မအောင်မြင်ပါ: {{status}} {{detail}}',
});
