import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** el-GR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'Το appId δεν πρέπει να είναι κενό',
  app_secret_empty: 'Το appSecret δεν πρέπει να είναι κενό',
  token_failed: 'Η ανταλλαγή access_token WeChat απέτυχε: {{errcode}} {{errmsg}}',
  refresh_failed: 'Η ανανέωση access_token WeChat απέτυχε: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Η λήψη πληροφοριών χρήστη WeChat απέτυχε: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'Το refreshToken δεν πρέπει να είναι κενό',
  revoke_unsupported: 'Η εξουσιοδότηση SNS WeChat δεν υποστηρίζει revoke',
});
