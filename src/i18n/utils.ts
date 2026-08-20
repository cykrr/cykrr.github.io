import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const lang = url.pathname.split('/')[1];
  if (lang in ui) {
    return lang as keyof typeof ui;
  }
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    // Fall back to the default locale, then to the key itself: a missing or
    // misspelled key renders visibly instead of silently collapsing to ''.
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  }
}
