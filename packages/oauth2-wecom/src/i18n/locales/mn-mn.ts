import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** mn-MN */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId хоосон байж болохгүй',
  corp_secret_empty: 'corpSecret хоосон байж болохгүй',
  agent_id_empty: 'agentId хоосон байж болохгүй',
  corp_token_failed: 'WeCom access_token авах амжилтгүй: {{errcode}} {{errmsg}}',
  userinfo_failed: 'WeCom хэрэглэгчийн шинэчлэл амжилтгүй: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo userid/openid буцаасангүй',
  refresh_unsupported: 'WeCom вэб зөвшөөрөл хэрэглэгчийн түвшний refresh-г дэмждэггүй',
  revoke_unsupported: 'WeCom вэб зөвшөөрөл revoke-г дэмждэггүй',
});
