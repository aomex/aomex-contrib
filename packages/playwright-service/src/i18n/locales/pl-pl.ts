import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** pl-PL */
export default I18n.satisfies(zh).define({
  browser_not_ready:
    '[Playwright] Przeglądarka nie jest gotowa lub połączenie zostało przerwane',
  close_browser_timeout: 'Przekroczono czas zamykania przeglądarki',
  close_browser_failed:
    '[Playwright] Zamknięcie nie powiodło się, wymuszone zakończenie: {{message}}',
  force_kill_browser:
    '[Playwright] Proces Chromium został wymuszenie zakończony, pid={{pid}}',
  force_kill_failed: '[Playwright] Wymuszone zakończenie nie powiodło się: {{message}}',
  close_context_timeout: 'Przekroczono czas zamykania Context',
  close_context_failed: '[Playwright] Nie udało się zamknąć Context: {{message}}',
  xvfb_exited: 'Xvfb zakończył działanie, code={{code}}',
  xvfb_start_failed: 'Nie udało się uruchomić Xvfb',
  max_concurrent_invalid: 'maxConcurrent musi być liczbą całkowitą >= 1',
});
