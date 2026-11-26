import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** et-EE */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Brauser ei ole valmis või ühendus katkes',
  close_browser_timeout: 'Brauseri sulgemine aegus',
  close_browser_failed:
    '[Playwright] Sulgemine ebaõnnestus, sunnitud lõpetamine: {{message}}',
  force_kill_browser: '[Playwright] Chromiumi protsess sundlõpetati, pid={{pid}}',
  force_kill_failed: '[Playwright] Sundlõpetamine ebaõnnestus: {{message}}',
  close_context_timeout: 'Contexti sulgemine aegus',
  close_context_failed: '[Playwright] Contexti sulgemine ebaõnnestus: {{message}}',
  xvfb_exited: 'Xvfb väljus, code={{code}}',
  xvfb_start_failed: 'Xvfb käivitamine ebaõnnestus',
  max_concurrent_invalid: 'maxConcurrent peab olema täisarv >= 1',
});
