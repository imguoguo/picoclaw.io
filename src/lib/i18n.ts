// Shared i18n utilities — single source of truth for language detection and DOM translation

export type Translations = Record<string, Record<string, any>>;

export function detectLang(): string {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'zh') return saved;
  } catch {}
  return navigator.language.startsWith('zh') ? 'zh' : 'en';
}

export function createT(translations: Translations, lang: string) {
  return (key: string): any =>
    translations[lang]?.[key] ?? translations.en?.[key] ?? key;
}

export function applyI18n(translations: Translations, lang: string): void {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  const t = createT(translations, lang);
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const val = t(el.dataset.i18n!);
    if (typeof val === 'string') {
      if (val.includes('<')) el.innerHTML = val;
      else el.textContent = val;
    }
  });
}
