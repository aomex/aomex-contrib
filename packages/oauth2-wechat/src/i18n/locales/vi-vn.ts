import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** vi-VN */
export default I18n.satisfies(zh).define({
  app_id_empty: 'appId không được để trống',
  app_secret_empty: 'appSecret không được để trống',
  token_failed: 'Đổi access_token WeChat thất bại: {{errcode}} {{errmsg}}',
  refresh_failed: 'Làm mới access_token WeChat thất bại: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Lấy thông tin người dùng WeChat thất bại: {{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken không được để trống',
  revoke_unsupported: 'Ủy quyền SNS WeChat không hỗ trợ revoke',
});
