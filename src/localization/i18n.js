import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { storage, STORAGE_KEYS } from '../utils/mmkvStorage';

import en from './locales/en.json';
import ur from './locales/ur.json';

const resources = {
  en: { translation: en },
  ur: { translation: ur },
};

const initLanguage = () => {
  const savedLang = storage.getString(STORAGE_KEYS.LANGUAGE);

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: savedLang || 'en',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
};

initLanguage();

export const changeAppLanguage = async lang => {
  storage.set(STORAGE_KEYS.LANGUAGE, lang);
  await i18n.changeLanguage(lang);
};

export default i18n;
