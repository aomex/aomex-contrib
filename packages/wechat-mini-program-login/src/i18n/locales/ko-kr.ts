import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** ko-KR */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId는 비워둘 수 없습니다',
  app_secret_empty: 'appSecret는 비워둘 수 없습니다',
  store_empty: 'store는 비워둘 수 없습니다',
  js_code_empty: 'jsCode는 비워둘 수 없습니다',
  phone_code_empty: 'phoneCode는 비워둘 수 없습니다',
  code2session_failed: 'WeChat code2session 실패: {{errcode}} {{errmsg}}',
  access_token_failed: 'WeChat access_token 가져오기 실패: {{errcode}} {{errmsg}}',
  phone_number_failed: 'WeChat 휴대폰 번호 가져오기 실패: {{errcode}} {{errmsg}}',
  invalid_json: '응답이 유효한 JSON이 아닙니다',
});
