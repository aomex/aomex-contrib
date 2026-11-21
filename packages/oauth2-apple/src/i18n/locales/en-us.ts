import { I18n } from '@aomex/common';
import { zh } from './zh-cn';

export const en = I18n.satisfies(zh).define({
  team_id_empty: 'teamId must not be empty',
  key_id_empty: 'keyId must not be empty',
  private_key_empty: 'privateKey must not be empty',
});
