import { navTranslations } from './translations/nav';
import { welcomeTranslations } from './translations/welcome';
import { portfolioTranslations } from './translations/portfolio';
import { planetariumvrTranslations } from './translations/planetariumvr';
import { biolabTranslations } from './translations/biolab';
import { floreriaTranslations } from './translations/floreria';
import { krrflowTranslations } from './translations/krrflow';
import { haLiteTranslations } from './translations/ha_lite';
import { inspectorIaTranslations } from './translations/inspector_ia';
import { planIntegralTranslations } from './translations/plan_integral';

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
    ...krrflowTranslations.es,
    ...haLiteTranslations.es,
    ...inspectorIaTranslations.es,
    ...planIntegralTranslations.es,
  },
  en: {
    ...navTranslations.en,
    ...welcomeTranslations.en,
    ...portfolioTranslations.en,
    ...planetariumvrTranslations.en,
    ...biolabTranslations.en,
    ...floreriaTranslations.en,
    ...krrflowTranslations.en,
    ...haLiteTranslations.en,
    ...inspectorIaTranslations.en,
    ...planIntegralTranslations.en,
  },
} as const;
