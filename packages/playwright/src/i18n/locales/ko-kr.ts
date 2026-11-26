import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ko-KR */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser가 준비되지 않았거나 연결이 끊어졌습니다',
  close_browser_timeout: '브라우저를 닫는 중 시간이 초과되었습니다',
  close_browser_failed: '[Playwright] 닫기에 실패하여 강제 종료합니다: {{message}}',
  force_kill_browser: '[Playwright] Chromium 프로세스를 강제 종료했습니다 pid={{pid}}',
  force_kill_failed: '[Playwright] 강제 종료에 실패했습니다: {{message}}',
  close_context_timeout: 'Context를 닫는 중 시간이 초과되었습니다',
  close_context_failed: '[Playwright] Context를 닫지 못했습니다: {{message}}',
  xvfb_exited: 'Xvfb가 종료되었습니다. code={{code}}',
  xvfb_start_failed: 'Xvfb를 시작하지 못했습니다',
  max_concurrent_invalid: 'maxConcurrent는 1 이상의 정수여야 합니다',
});
