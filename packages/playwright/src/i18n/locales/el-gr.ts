import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** el-GR */
export default I18n.satisfies(zh).define({
  browser_not_ready:
    '[Playwright] Το πρόγραμμα περιήγησης δεν είναι έτοιμο ή αποσυνδέθηκε',
  close_browser_timeout: 'Λήξη χρόνου κατά το κλείσιμο του προγράμματος περιήγησης',
  close_browser_failed:
    '[Playwright] Το κλείσιμο απέτυχε, αναγκαστικός τερματισμός: {{message}}',
  force_kill_browser:
    '[Playwright] Η διεργασία Chromium τερματίστηκε αναγκαστικά, pid={{pid}}',
  force_kill_failed: '[Playwright] Ο αναγκαστικός τερματισμός απέτυχε: {{message}}',
  close_context_timeout: 'Λήξη χρόνου κατά το κλείσιμο του Context',
  close_context_failed: '[Playwright] Αποτυχία κλεισίματος του Context: {{message}}',
  xvfb_exited: 'Το Xvfb τερματίστηκε, code={{code}}',
  xvfb_start_failed: 'Αποτυχία εκκίνησης του Xvfb',
  max_concurrent_invalid: 'Το maxConcurrent πρέπει να είναι ακέραιος >= 1',
});
