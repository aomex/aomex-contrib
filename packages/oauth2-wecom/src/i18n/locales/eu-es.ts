import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

/** eu-ES */
export default I18n.satisfies(zh).define({
  corp_id_empty: 'corpId ezin da hutsik egon',
  corp_secret_empty: 'corpSecret ezin da hutsik egon',
  agent_id_empty: 'agentId ezin da hutsik egon',
  access_token_failed:
    'WeCom access_token eskuratzeak huts egin du: {{errcode}} {{errmsg}}',
  userinfo_failed:
    'WeCom erabiltzaile-identitatea eskuratzeak huts egin du: {{errcode}} {{errmsg}}',
  userinfo_missing_identity: 'WeCom getuserinfo-k ez du userid/openid itzuli',
  refresh_unsupported: 'WeCom web baimenak ez du erabiltzaile-mailako refresh onartzen',
  revoke_unsupported: 'WeCom web baimenak ez du revoke onartzen',
});
