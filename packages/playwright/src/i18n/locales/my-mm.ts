import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** my-MM */
export default I18n.satisfies(zh).define({
  browser_not_ready: '[Playwright] ဘရောက်ဇာ အဆင်သင့်မဖြစ်သေးပါ သို့မဟုတ် ချိတ်ဆက်မှု ပြတ်သွားသည်',
  close_browser_timeout: 'ဘရောက်ဇာ ပိတ်နေစဉ် အချိန်ကုန်သွားသည်',
  close_browser_failed: '[Playwright] ပိတ်၍မရပါ၊ အတင်းရပ်တန့်သည်: {{message}}',
  force_kill_browser: '[Playwright] Chromium လုပ်ငန်းစဉ်ကို အတင်းရပ်တန့်ခဲ့သည် pid={{pid}}',
  force_kill_failed: '[Playwright] အတင်းရပ်တန့်မှု မအောင်မြင်ပါ: {{message}}',
  close_context_timeout: 'Context ပိတ်နေစဉ် အချိန်ကုန်သွားသည်',
  close_context_failed: '[Playwright] Context ပိတ်၍မရပါ: {{message}}',
  xvfb_exited: 'Xvfb ရပ်သွားသည်၊ code={{code}}',
  xvfb_start_failed: 'Xvfb စတင်၍မရပါ',
  max_concurrent_invalid: 'maxConcurrent သည် 1 သို့မဟုတ် ထို့ထက်ကြီးသော ကိန်းပြည့်ဖြစ်ရမည်',
});
