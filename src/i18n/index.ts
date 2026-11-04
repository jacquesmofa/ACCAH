import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import messages from './local/index';

export const LANG_KEY = 'cwfcs-lang';
const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(LANG_KEY) : null;
const initial = saved === 'fr' ? 'fr' : 'en';

i18n
  .use(initReactI18next)
  .init({
    lng: initial,
    fallbackLng: 'en',
    debug: false,
    resources: messages,
    returnObjects: true,
    interpolation: { escapeValue: false },
  });

if (typeof document !== 'undefined') document.documentElement.lang = initial === 'fr' ? 'fr-CA' : 'en-CA';

export function setLanguage(lang: 'en' | 'fr') {
  i18n.changeLanguage(lang);
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en-CA';
}

export default i18n;