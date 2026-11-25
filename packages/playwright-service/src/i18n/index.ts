import { createI18n } from '@aomex/common';
import { en } from './locales/en-us';
import { zh } from './locales/zh-cn';

export const i18n = createI18n({
  zh,
  en,
  load: (file) => import(new URL(`./locales/${file}.js`, import.meta.url).href),
});
