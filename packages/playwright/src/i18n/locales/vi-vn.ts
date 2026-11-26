import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** vi-VN */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Trình duyệt chưa sẵn sàng hoặc đã mất kết nối',
  close_browser_timeout: 'Hết thời gian khi đóng trình duyệt',
  close_browser_failed: '[Playwright] Đóng thất bại, buộc dừng: {{message}}',
  force_kill_browser: '[Playwright] Đã buộc dừng tiến trình Chromium pid={{pid}}',
  force_kill_failed: '[Playwright] Buộc dừng thất bại: {{message}}',
  close_context_timeout: 'Hết thời gian khi đóng Context',
  close_context_failed: '[Playwright] Đóng Context thất bại: {{message}}',
  xvfb_exited: 'Xvfb đã thoát, code={{code}}',
  xvfb_start_failed: 'Khởi động Xvfb thất bại',
  max_concurrent_invalid: 'maxConcurrent phải là số nguyên >= 1',
});
