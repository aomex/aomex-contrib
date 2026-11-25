import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** eu-ES */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Nabigatzailea ez dago prest edo deskonektatu egin da',
  close_browser_timeout: 'Denbora agortu da nabigatzailea ixtean',
  close_browser_failed:
    '[Playwright] Ezin izan da itxi, behartutako amaiera: {{message}}',
  force_kill_browser: '[Playwright] Chromium prozesua behartuta amaitu da, pid={{pid}}',
  force_kill_failed: '[Playwright] Behartutako amaierak huts egin du: {{message}}',
  close_context_timeout: 'Denbora agortu da Context ixtean',
  close_context_failed: '[Playwright] Ezin izan da Context itxi: {{message}}',
  xvfb_exited: 'Xvfb amaitu da, code={{code}}',
  xvfb_start_failed: 'Ezin izan da Xvfb abiarazi',
  max_concurrent_invalid: 'maxConcurrent >= 1 den zenbaki oso bat izan behar da',
});
