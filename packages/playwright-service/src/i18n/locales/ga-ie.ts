import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ga-IE */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Níl an brabhsálaí réidh nó tá an nasc briste',
  close_browser_timeout: 'Cuireadh teorainn ama leis an mbrabhsálaí a dhúnadh',
  close_browser_failed:
    '[Playwright] Theip ar dhúnadh, á mhúchadh go héigeantach: {{message}}',
  force_kill_browser:
    '[Playwright] Múchadh próiseas Chromium go héigeantach, pid={{pid}}',
  force_kill_failed: '[Playwright] Theip ar an múchadh éigeantach: {{message}}',
  close_context_timeout: 'Cuireadh teorainn ama le Context a dhúnadh',
  close_context_failed: '[Playwright] Theip ar Context a dhúnadh: {{message}}',
  xvfb_exited: 'D’éirigh Xvfb as, code={{code}}',
  xvfb_start_failed: 'Theip ar Xvfb a thosú',
  max_concurrent_invalid: 'Caithfidh maxConcurrent a bheith ina slánuimhir >= 1',
});
