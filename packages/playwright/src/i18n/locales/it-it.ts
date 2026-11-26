import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** it-IT */
export default I18n.satisfies(zh).define({
  browser_not_ready:
    '[Playwright] Il browser non è pronto o la connessione si è interrotta',
  close_browser_timeout: 'Timeout durante la chiusura del browser',
  close_browser_failed:
    '[Playwright] Chiusura non riuscita, terminazione forzata: {{message}}',
  force_kill_browser:
    '[Playwright] Processo Chromium terminato forzatamente, pid={{pid}}',
  force_kill_failed: '[Playwright] Terminazione forzata non riuscita: {{message}}',
  close_context_timeout: 'Timeout durante la chiusura del Context',
  close_context_failed: '[Playwright] Chiusura del Context non riuscita: {{message}}',
  xvfb_exited: 'Xvfb terminato, code={{code}}',
  xvfb_start_failed: 'Avvio di Xvfb non riuscito',
  max_concurrent_invalid: 'maxConcurrent deve essere un intero >= 1',
});
