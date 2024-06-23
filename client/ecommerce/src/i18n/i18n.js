import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import httpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// 26.6


i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "fi"],
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  load: 'currentOnly',
  resources: {
    en:{
      translation:{
        login:"Login",
        lastviewed:"Last viewed",
        favorities:"Favorities",
        menu:"Menu"
      }
  },
    fi:{
      translation:{
      login:"Kirjaudu sisään",
      lastviewed:"Viimeksi katsottu",
      favorities:"Suosikit",
      menu:"Valikko"
    }
  },
},
});

export default i18n;