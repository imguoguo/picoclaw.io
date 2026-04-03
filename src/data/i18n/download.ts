// Download page translations
import type { Translations } from '../../lib/i18n';
import { shared } from './shared';

const page: Translations = {
  en: {
    'dl-title':           'Download PicoClaw',
    'dl-desc':            'Choose your platform and architecture. Single binary, no dependencies \u2014 just download and run.',
    'install-title':      'Quick Install',
    'install-cli-title':  'CLI Setup',
    'install-cli-desc':   'After downloading, run the onboard command to initialize your workspace:',
    'install-docs-title': 'Full Guide',
    'install-docs-desc':  'For detailed installation instructions, Docker setup, and Android/Termux support:',
    'install-docs-link':  'Read Installation Guide \u2192',
  },
  zh: {
    'dl-title':           '下载 PicoClaw',
    'dl-desc':            '选择你的平台和架构。单一二进制，无依赖——下载即用。',
    'install-title':      '快速安装',
    'install-cli-title':  'CLI 初始化',
    'install-cli-desc':   '下载后，运行 onboard 命令初始化工作区：',
    'install-docs-title': '完整指南',
    'install-docs-desc':  '详细的安装说明、Docker 部署和 Android/Termux 支持：',
    'install-docs-link':  '阅读安装指南 →',
  },
};

export const TRANSLATIONS: Translations = {
  en: { ...shared.en, ...page.en },
  zh: { ...shared.zh, ...page.zh },
};
