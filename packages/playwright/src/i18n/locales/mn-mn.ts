import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mn-MN */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] Хөтөч бэлэн биш эсвэл холболт тасарсан',
  close_browser_timeout: 'Хөтчийг хаах хугацаа хэтэрлээ',
  close_browser_failed: '[Playwright] Хаах амжилтгүй, албадан зогсооно: {{message}}',
  force_kill_browser: '[Playwright] Chromium процессыг албадан зогсоолоо pid={{pid}}',
  force_kill_failed: '[Playwright] Албадан зогсоох амжилтгүй: {{message}}',
  close_context_timeout: 'Context хаах хугацаа хэтэрлээ',
  close_context_failed: '[Playwright] Context хаах амжилтгүй: {{message}}',
  xvfb_exited: 'Xvfb дууссан, code={{code}}',
  xvfb_start_failed: 'Xvfb эхлүүлж чадсангүй',
  max_concurrent_invalid: 'maxConcurrent нь >= 1 бүхэл тоо байх ёстой',
});
