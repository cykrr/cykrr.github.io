import { navTranslations } from './translations/nav';
import { welcomeTranslations } from './translations/welcome';
import { portfolioTranslations } from './translations/portfolio';
import { planetariumvrTranslations } from './translations/planetariumvr';
import { biolabTranslations } from './translations/biolab';
import { floreriaTranslations } from './translations/floreria';

export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    ...navTranslations.es,
    ...welcomeTranslations.es,
    ...portfolioTranslations.es,
    ...planetariumvrTranslations.es,
    ...biolabTranslations.es,
    ...floreriaTranslations.es,
  },
  en: {
    ...navTranslations.en,
    ...welcomeTranslations.en,
    ...portfolioTranslations.en,
    ...planetariumvrTranslations.en,
    ...biolabTranslations.en,
    ...floreriaTranslations.en,
  },
} as const;
