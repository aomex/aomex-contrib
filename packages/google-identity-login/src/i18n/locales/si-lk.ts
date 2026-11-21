import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** si-LK */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId හිස් විය නොහැක',
  client_secret_empty: 'exchangeAuthCode / refreshAccessToken සඳහා clientSecret අවශ්‍යයි',
  credential_empty: 'credential / id_token හිස් විය නොහැක',
  access_token_empty: 'accessToken හිස් විය නොහැක',
  auth_code_empty: 'authorization code හිස් විය නොහැක',
  refresh_token_empty: 'refreshToken හිස් විය නොහැක',
  credential_verify_failed: 'Google credential සත්‍යාපනය අසාර්ථකයි: {{reason}}',
  hd_mismatch: 'Google credential hd නොගැලපේ: අපේක්ෂිත {{expected}}, ලැබුණු {{actual}}',
  userinfo_failed: 'Google userinfo අසාර්ථකයි: {{status}}',
  exchange_failed: 'Google ටෝකන් හුවමාරුව අසාර්ථකයි: {{status}} {{detail}}',
});
