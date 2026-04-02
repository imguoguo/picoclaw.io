// Shared i18n utilities for all pages
// Works with View Transitions (astro:page-load event)

const navTranslations: Record<string, Record<string, string>> = {
  'nav-download': { en: 'Download', zh: '下载' },
  'nav-changelog': { en: 'Changelog', zh: '更新日志' },
  'nav-blog': { en: 'Blog', zh: '博客' },
  'nav-docs': { en: 'Docs', zh: '文档' },
};

export function detectLang(): string {
  const saved = localStorage.getItem('lang');
  if (saved === 'en' || saved === 'zh') return saved;
  return navigator.language.startsWith('zh') ? 'zh' : 'en';
}

export function setLang(lang: string): void {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}

export function applyNavLang(lang: string): void {
  // Update nav links
  Object.entries(navTranslations).forEach(([key, val]) => {
    document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
      el.textContent = val[lang] || val.en;
    });
  });

  // Update lang toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const b = btn as HTMLElement;
    btn.classList.toggle('active', b.dataset.lang === lang);
  });
}

export function applyDataI18n(translations: Record<string, any>, lang: string): void {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = (el as HTMLElement).dataset.i18n!;
    const val = (translations[lang] || translations.en)?.[key]
             ?? translations.en?.[key];
    if (typeof val === 'string') {
      if (val.includes('<')) el.innerHTML = val;
      else el.textContent = val;
    }
  });
}

export function initLangToggle(onSwitch: (lang: string) => void): void {
  const toggle = document.getElementById('lang-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.lang-btn') as HTMLElement | null;
    if (!btn) return;
    const lang = btn.dataset.lang!;
    setLang(lang);
    applyNavLang(lang);
    onSwitch(lang);
  });
}
