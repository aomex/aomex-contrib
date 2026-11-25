import { I18n } from '@aomex/common';

export const zh = I18n.define({
  browser_not_ready: '[Playwright] Browser 未就绪或已断开',
  close_browser_timeout: '关闭浏览器超时',
  close_browser_failed: '[Playwright] 关闭失败，准备强杀：{{message}}',
  force_kill_browser: '[Playwright] 已强杀 Chromium 进程 pid={{pid}}',
  force_kill_failed: '[Playwright] 强杀失败：{{message}}',
  close_context_timeout: '关闭 Context 超时',
  close_context_failed: '[Playwright] 关闭 Context 失败：{{message}}',
  xvfb_exited: 'Xvfb 退出，code={{code}}',
  xvfb_start_failed: 'Xvfb 启动失败',
  max_concurrent_invalid: 'maxConcurrent 必须是 >= 1 的整数',
});
