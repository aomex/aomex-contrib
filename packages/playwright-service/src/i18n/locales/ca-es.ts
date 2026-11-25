import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ca-ES */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] El navegador no està a punt o s’ha desconnectat',
  close_browser_timeout: 'S’ha esgotat el temps en tancar el navegador',
  close_browser_failed: '[Playwright] No s’ha pogut tancar, aturada forçada: {{message}}',
  force_kill_browser: '[Playwright] Procés de Chromium aturat forçadament, pid={{pid}}',
  force_kill_failed: '[Playwright] L’aturada forçada ha fallat: {{message}}',
  close_context_timeout: 'S’ha esgotat el temps en tancar el Context',
  close_context_failed: '[Playwright] No s’ha pogut tancar el Context: {{message}}',
  xvfb_exited: 'Xvfb ha sortit, code={{code}}',
  xvfb_start_failed: 'No s’ha pogut iniciar Xvfb',
  max_concurrent_invalid: 'maxConcurrent ha de ser un enter >= 1',
});
