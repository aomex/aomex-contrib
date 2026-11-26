import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** gl-ES */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] O navegador non está listo ou desconectouse',
  close_browser_timeout: 'Esgotouse o tempo ao pechar o navegador',
  close_browser_failed: '[Playwright] Erro ao pechar, forzarase o peche: {{message}}',
  force_kill_browser: '[Playwright] Proceso de Chromium pechado á forza, pid={{pid}}',
  force_kill_failed: '[Playwright] Erro ao pechar á forza: {{message}}',
  close_context_timeout: 'Esgotouse o tempo ao pechar o Context',
  close_context_failed: '[Playwright] Erro ao pechar o Context: {{message}}',
  xvfb_exited: 'Xvfb rematou, code={{code}}',
  xvfb_start_failed: 'Non se puido iniciar Xvfb',
  max_concurrent_invalid: 'maxConcurrent debe ser un enteiro >= 1',
});
