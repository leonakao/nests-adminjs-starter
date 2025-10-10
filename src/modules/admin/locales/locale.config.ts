import { Locale } from '../types/types.config.js';
import { enUsTranslation } from './en-us.translation.js';
import { ptBrTranslation } from './pt-br.translation.js';

export const locale: Locale = {
  language: 'pt-BR',
  availableLanguages: ['pt-BR', 'en'],
  translations: {
    'pt-BR': ptBrTranslation,
    en: enUsTranslation,
  },
};
