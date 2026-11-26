import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pt-PT */
export default I18n.satisfies(zh).define({
  browser_not_ready:
    '[Playwright] O navegador não está pronto ou a ligação foi terminada',
  close_browser_timeout: 'Tempo esgotado ao fechar o navegador',
  close_browser_failed: '[Playwright] Falha ao fechar, encerramento forçado: {{message}}',
  force_kill_browser: '[Playwright] Processo do Chromium encerrado à força, pid={{pid}}',
  force_kill_failed: '[Playwright] Falha no encerramento forçado: {{message}}',
  close_context_timeout: 'Tempo esgotado ao fechar o Context',
  close_context_failed: '[Playwright] Falha ao fechar o Context: {{message}}',
  xvfb_exited: 'Xvfb terminou, code={{code}}',
  xvfb_start_failed: 'Falha ao iniciar o Xvfb',
  max_concurrent_invalid: 'maxConcurrent tem de ser um inteiro >= 1',
});
