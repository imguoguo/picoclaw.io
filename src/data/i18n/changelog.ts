// Changelog page translations
import type { Translations } from '../../lib/i18n';
import { shared } from './shared';

const page: Translations = {
  en: {
    'cl-title':        'Changelog',
    'cl-desc':         'Release notes and version history for PicoClaw',
    'cl-all-releases': 'View all releases on GitHub \u2192',
  },
  zh: {
    'cl-title':        '更新日志',
    'cl-desc':         'PicoClaw 版本发布记录与更新历史',
    'cl-all-releases': '在 GitHub 上查看所有版本 →',
  },
};

export const TRANSLATIONS: Translations = {
  en: { ...shared.en, ...page.en },
  zh: { ...shared.zh, ...page.zh },
};
