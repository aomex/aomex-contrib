import { I18n } from '@aomex/common';

export const zh = I18n.define({
  app_id_empty: 'appId 不能为空',
  app_secret_empty: 'appSecret 不能为空',
  js_code_empty: 'jsCode 不能为空',
  phone_code_empty: 'phoneCode 不能为空',
  code2session_failed: '微信 code2session 失败：{{errcode}} {{errmsg}}',
  access_token_failed: '微信获取 access_token 失败：{{errcode}} {{errmsg}}',
  phone_number_failed: '微信获取手机号失败：{{errcode}} {{errmsg}}',
  invalid_json: '响应不是有效 JSON',
});
