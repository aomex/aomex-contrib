import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** id-ID */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser belum siap atau koneksi terputus',
  close_browser_timeout: 'Waktu habis saat menutup browser',
  close_browser_failed:
    '[Playwright] Gagal menutup, menghentikan secara paksa: {{message}}',
  force_kill_browser: '[Playwright] Proses Chromium dihentikan secara paksa pid={{pid}}',
  force_kill_failed: '[Playwright] Penghentian paksa gagal: {{message}}',
  close_context_timeout: 'Waktu habis saat menutup Context',
  close_context_failed: '[Playwright] Gagal menutup Context: {{message}}',
  xvfb_exited: 'Xvfb berhenti, code={{code}}',
  xvfb_start_failed: 'Xvfb gagal dimulai',
  max_concurrent_invalid: 'maxConcurrent harus berupa bilangan bulat >= 1',
});
