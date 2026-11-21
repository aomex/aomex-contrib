import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** el-GR */
export default I18n.satisfies(zh).define({
  client_id_empty: 'Το clientId δεν πρέπει να είναι κενό',
  client_secret_empty:
    'Το clientSecret απαιτείται για exchangeAuthCode / refreshAccessToken',
  credential_empty: 'Το credential / id_token δεν πρέπει να είναι κενό',
  access_token_empty: 'Το accessToken δεν πρέπει να είναι κενό',
  auth_code_empty: 'Το authorization code δεν πρέπει να είναι κενό',
  refresh_token_empty: 'Το refreshToken δεν πρέπει να είναι κενό',
  credential_verify_failed: 'Η επαλήθευση Google credential απέτυχε: {{reason}}',
  hd_mismatch:
    'Το hd του Google credential δεν ταιριάζει: αναμενόμενο {{expected}}, λήφθηκε {{actual}}',
  userinfo_failed: 'Το Google userinfo απέτυχε: {{status}}',
  exchange_failed: 'Η ανταλλαγή διακριτικού Google απέτυχε: {{status}} {{detail}}',
});
