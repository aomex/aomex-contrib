import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** de-DE */
export default I18n.satisfies(zh).define({
  browser_not_ready:
    '[Playwright] Browser ist nicht bereit oder die Verbindung wurde getrennt',
  close_browser_timeout: 'Zeitüberschreitung beim Schließen des Browsers',
  close_browser_failed:
    '[Playwright] Schließen fehlgeschlagen, erzwinge Beenden: {{message}}',
  force_kill_browser:
    '[Playwright] Chromium-Prozess wurde erzwungen beendet, pid={{pid}}',
  force_kill_failed: '[Playwright] Erzwungenes Beenden fehlgeschlagen: {{message}}',
  close_context_timeout: 'Zeitüberschreitung beim Schließen des Context',
  close_context_failed:
    '[Playwright] Context konnte nicht geschlossen werden: {{message}}',
  xvfb_exited: 'Xvfb wurde beendet, code={{code}}',
  xvfb_start_failed: 'Xvfb konnte nicht gestartet werden',
  max_concurrent_invalid: 'maxConcurrent muss eine ganze Zahl >= 1 sein',
});
