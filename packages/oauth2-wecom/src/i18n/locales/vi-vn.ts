import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** vi-VN */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId không được để trống',
  corp_secret_empty: 'corpSecret không được để trống',
  agent_id_empty: 'agentId không được để trống',
  corp_token_failed: 'Lấy access_token WeCom thất bại: {{errcode}} {{errmsg}}',
  userinfo_failed: 'Lấy danh tính người dùng WeCom thất bại: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo không trả về userid/openid',
  refresh_unsupported: 'Ủy quyền web WeCom không hỗ trợ refresh cấp người dùng',
  revoke_unsupported: 'Ủy quyền web WeCom không hỗ trợ revoke',
});
