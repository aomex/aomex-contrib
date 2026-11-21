import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ta-IN */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId காலியாக இருக்கக்கூடாது',
  client_secret_empty: 'exchangeAuthCode / refreshAccessTokenக்கு clientSecret தேவை',
  credential_empty: 'credential / id_token காலியாக இருக்கக்கூடாது',
  access_token_empty: 'accessToken காலியாக இருக்கக்கூடாது',
  auth_code_empty: 'authorization code காலியாக இருக்கக்கூடாது',
  refresh_token_empty: 'refreshToken காலியாக இருக்கக்கூடாது',
  credential_verify_failed: 'Google credential சரிபார்ப்பு தோல்வி: {{reason}}',
  hd_mismatch:
    'Google credential hd பொருந்தவில்லை: எதிர்பார்க்கப்பட்டது {{expected}}, கிடைத்தது {{actual}}',
  userinfo_failed: 'Google userinfo தோல்வி: {{status}}',
  exchange_failed: 'Google டோக்கன் பரிமாற்றம் தோல்வி: {{status}} {{detail}}',
});
