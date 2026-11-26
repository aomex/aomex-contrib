import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mr-IN */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] ब्राउझर तयार नाही किंवा कनेक्शन तुटले आहे',
  close_browser_timeout: 'ब्राउझर बंद करताना वेळ संपली',
  close_browser_failed: '[Playwright] बंद करणे अयशस्वी, जबरदस्तीने थांबवले जात आहे: {{message}}',
  force_kill_browser: '[Playwright] Chromium प्रक्रिया जबरदस्तीने थांबवली pid={{pid}}',
  force_kill_failed: '[Playwright] जबरदस्तीने थांबवणे अयशस्वी: {{message}}',
  close_context_timeout: 'Context बंद करताना वेळ संपली',
  close_context_failed: '[Playwright] Context बंद करणे अयशस्वी: {{message}}',
  xvfb_exited: 'Xvfb बाहेर पडला, code={{code}}',
  xvfb_start_failed: 'Xvfb सुरू करता आला नाही',
  max_concurrent_invalid: 'maxConcurrent हा 1 किंवा त्याहून मोठा पूर्णांक असावा',
});
