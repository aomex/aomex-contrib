import { I18n } from '@aomex/common';

export const zh = I18n.define({
  corp_id_empty: 'corpId 不能为空',
  corp_secret_empty: 'corpSecret 不能为空',
  agent_id_empty: 'agentId 不能为空',
  access_token_failed: '企业微信获取 access_token 失败：{{errcode}} {{errmsg}}',
  userinfo_failed: '企业微信获取访问用户身份失败：{{errcode}} {{errmsg}}',
  userinfo_missing_identity: '企业微信 getuserinfo 未返回 userid/openid',
  refresh_unsupported: '企业微信网页授权不支持用户级 refresh',
  revoke_unsupported: '企业微信网页授权不支持 revoke',
});
