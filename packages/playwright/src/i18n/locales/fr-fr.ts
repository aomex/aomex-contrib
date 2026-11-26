import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** fr-FR */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Le navigateur n’est pas prêt ou a été déconnecté',
  close_browser_timeout: 'Délai dépassé lors de la fermeture du navigateur',
  close_browser_failed: '[Playwright] Échec de la fermeture, arrêt forcé : {{message}}',
  force_kill_browser: '[Playwright] Processus Chromium arrêté de force, pid={{pid}}',
  force_kill_failed: '[Playwright] Échec de l’arrêt forcé : {{message}}',
  close_context_timeout: 'Délai dépassé lors de la fermeture du Context',
  close_context_failed: '[Playwright] Échec de la fermeture du Context : {{message}}',
  xvfb_exited: 'Xvfb s’est arrêté, code={{code}}',
  xvfb_start_failed: 'Échec du démarrage de Xvfb',
  max_concurrent_invalid: 'maxConcurrent doit être un entier >= 1',
});
