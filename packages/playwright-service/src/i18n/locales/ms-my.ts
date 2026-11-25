import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ms-MY */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Pelayar belum sedia atau sambungan terputus',
  close_browser_timeout: 'Masa tamat semasa menutup pelayar',
  close_browser_failed:
    '[Playwright] Gagal menutup, menghentikan secara paksa: {{message}}',
  force_kill_browser: '[Playwright] Proses Chromium dihentikan secara paksa pid={{pid}}',
  force_kill_failed: '[Playwright] Penghentian paksa gagal: {{message}}',
  close_context_timeout: 'Masa tamat semasa menutup Context',
  close_context_failed: '[Playwright] Gagal menutup Context: {{message}}',
  xvfb_exited: 'Xvfb tamat, code={{code}}',
  xvfb_start_failed: 'Xvfb gagal dimulakan',
  max_concurrent_invalid: 'maxConcurrent mestilah integer >= 1',
});
