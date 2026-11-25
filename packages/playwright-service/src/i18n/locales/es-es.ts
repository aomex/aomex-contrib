import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** es-ES */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] El navegador no está listo o se ha desconectado',
  close_browser_timeout: 'Tiempo de espera agotado al cerrar el navegador',
  close_browser_failed: '[Playwright] Error al cerrar, se forzará el cierre: {{message}}',
  force_kill_browser:
    '[Playwright] Proceso de Chromium terminado forzosamente, pid={{pid}}',
  force_kill_failed: '[Playwright] Error al terminar forzosamente: {{message}}',
  close_context_timeout: 'Tiempo de espera agotado al cerrar el Context',
  close_context_failed: '[Playwright] Error al cerrar el Context: {{message}}',
  xvfb_exited: 'Xvfb finalizó, code={{code}}',
  xvfb_start_failed: 'No se pudo iniciar Xvfb',
  max_concurrent_invalid: 'maxConcurrent debe ser un entero >= 1',
});
