import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ja-JP */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Browser の準備ができていないか、接続が切れています',
  close_browser_timeout: 'ブラウザの終了がタイムアウトしました',
  close_browser_failed: '[Playwright] 終了に失敗したため強制終了します：{{message}}',
  force_kill_browser: '[Playwright] Chromium プロセスを強制終了しました pid={{pid}}',
  force_kill_failed: '[Playwright] 強制終了に失敗しました：{{message}}',
  close_context_timeout: 'Context の終了がタイムアウトしました',
  close_context_failed: '[Playwright] Context の終了に失敗しました：{{message}}',
  xvfb_exited: 'Xvfb が終了しました。code={{code}}',
  xvfb_start_failed: 'Xvfb の起動に失敗しました',
  max_concurrent_invalid: 'maxConcurrent は 1 以上の整数である必要があります',
});
