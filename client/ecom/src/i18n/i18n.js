import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import httpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import Finnish from './fi/translation.json'
import English from './en/translation.json'
import Swedish from './sv/translation.json'

// 26.6
/**
 *
 */
i18n
  .use(initReactI18next).init({
    lng: 'en',
    fallbackLng: ['en', 'fi', 'sv'],
    supportedLngs: ['en', 'fi', 'sv'],
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    load: 'currentOnly',
    resources: {
      en: {
        translation: English,
      },
      fi: {
        translation: Finnish,
      },
      sv: {
        translation: Swedish,
      },
    },
  })

export default i18n