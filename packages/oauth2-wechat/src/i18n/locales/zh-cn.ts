import { I18n } from '@aomex/common';

export const zh = I18n.define({
  app_id_empty: 'appId 不能为空',
  app_secret_empty: 'appSecret 不能为空',
  token_failed: '微信换取 access_token 失败：{{errcode}} {{errmsg}}',
  refresh_failed: '微信刷新 access_token 失败：{{errcode}} {{errmsg}}',
  userinfo_failed: '微信获取用户信息失败：{{errcode}} {{errmsg}}',
  access_token_failed: '微信获取全局 access_token 失败：{{errcode}} {{errmsg}}',
  refresh_token_empty: 'refreshToken 不能为空',
  revoke_unsupported: '微信 SNS 授权不支持 revoke',
});
