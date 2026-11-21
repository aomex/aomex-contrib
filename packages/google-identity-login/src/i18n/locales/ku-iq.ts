import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ku-IQ */
export default I18n.satisfies(zh).define({
  client_id_empty: 'clientId نابێت بەتاڵ بێت',
  client_secret_empty:
    'بۆ exchangeAuthCode / refreshAccessToken پێویستە clientSecret هەبێت',
  credential_empty: 'credential / id_token نابێت بەتاڵ بێت',
  access_token_empty: 'accessToken نابێت بەتاڵ بێت',
  auth_code_empty: 'authorization code نابێت بەتاڵ بێت',
  refresh_token_empty: 'refreshToken نابێت بەتاڵ بێت',
  credential_verify_failed:
    'پشتڕاستکردنەوەی Google credential سەرکەوتوو نەبوو: {{reason}}',
  hd_mismatch:
    'hd ی Google credential ناگونجێت: چاوەڕوانکراو {{expected}}، وەرگیراو {{actual}}',
  userinfo_failed: 'Google userinfo سەرکەوتوو نەبوو: {{status}}',
  exchange_failed: 'ئاڵوگۆڕی نیشانەی Google سەرکەوتوو نەبوو: {{status}} {{detail}}',
});
