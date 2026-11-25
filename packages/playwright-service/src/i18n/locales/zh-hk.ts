import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** 繁體中文（香港） */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser 未就緒或已中斷',
  close_browser_timeout: '關閉瀏覽器逾時',
  close_browser_failed: '[Playwright] 關閉失敗，準備強制結束：{{message}}',
  force_kill_browser: '[Playwright] 已強制結束 Chromium 進程 pid={{pid}}',
  force_kill_failed: '[Playwright] 強制結束失敗：{{message}}',
  close_context_timeout: '關閉 Context 逾時',
  close_context_failed: '[Playwright] 關閉 Context 失敗：{{message}}',
  xvfb_exited: 'Xvfb 已結束，code={{code}}',
  xvfb_start_failed: 'Xvfb 啟動失敗',
  max_concurrent_invalid: 'maxConcurrent 必須是 >= 1 的整數',
});
