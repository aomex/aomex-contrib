import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** th-TH */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] เบราว์เซอร์ยังไม่พร้อมหรือการเชื่อมต่อขาด',
  close_browser_timeout: 'หมดเวลาระหว่างปิดเบราว์เซอร์',
  close_browser_failed: '[Playwright] ปิดไม่สำเร็จ กำลังบังคับหยุด: {{message}}',
  force_kill_browser: '[Playwright] บังคับหยุดโปรเซส Chromium แล้ว pid={{pid}}',
  force_kill_failed: '[Playwright] บังคับหยุดไม่สำเร็จ: {{message}}',
  close_context_timeout: 'หมดเวลาระหว่างปิด Context',
  close_context_failed: '[Playwright] ปิด Context ไม่สำเร็จ: {{message}}',
  xvfb_exited: 'Xvfb จบการทำงาน code={{code}}',
  xvfb_start_failed: 'เริ่ม Xvfb ไม่สำเร็จ',
  max_concurrent_invalid: 'maxConcurrent ต้องเป็นจำนวนเต็ม >= 1',
});
