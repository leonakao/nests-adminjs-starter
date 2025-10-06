import { Locale } from '../types';
import { enUsTranslation } from './en-us.translation';
import { ptBrTranslation } from './pt-br.translation';

export const locale: Locale = {
  language: 'pt-BR',
  availableLanguages: ['pt-BR', 'en'],
  translations: {
    'pt-BR': ptBrTranslation,
    en: enUsTranslation,
  },
};
