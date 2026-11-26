import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** lv-LV */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Pārlūks nav gatavs vai savienojums ir pārtraukts',
  close_browser_timeout: 'Pārlūka aizvēršanai beidzās laiks',
  close_browser_failed:
    '[Playwright] Aizvēršana neizdevās, piespiedu apturēšana: {{message}}',
  force_kill_browser:
    '[Playwright] Chromium process piespiedu kārtā apturēts, pid={{pid}}',
  force_kill_failed: '[Playwright] Piespiedu apturēšana neizdevās: {{message}}',
  close_context_timeout: 'Context aizvēršanai beidzās laiks',
  close_context_failed: '[Playwright] Context neizdevās aizvērt: {{message}}',
  xvfb_exited: 'Xvfb beidza darbu, code={{code}}',
  xvfb_start_failed: 'Xvfb neizdevās startēt',
  max_concurrent_invalid: 'maxConcurrent jābūt veselam skaitlim >= 1',
});
