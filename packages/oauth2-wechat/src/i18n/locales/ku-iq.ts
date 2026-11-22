import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ku-IQ */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId نابێت بەتاڵ بێت',
  app_secret_empty: 'appSecret نابێت بەتاڵ بێت',
  token_failed: 'ئاڵوگۆڕی access_token ی WeChat سەرکەوتوو نەبوو: {{errcode}} {{errmsg}}',
  refresh_failed:
    'نوێکردنەوەی access_token ی WeChat سەرکەوتوو نەبوو: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'وەرگرتنی زانیاری بەکارهێنەری WeChat سەرکەوتوو نەبوو: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat get access_token failed: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken نابێت بەتاڵ بێت',
  revoke_unsupported: 'ڕێپێدانی SNS ی WeChat پشتگیری revoke ناکات',
});
