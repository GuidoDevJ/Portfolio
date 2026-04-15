import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "./translations/en";
import { es } from "./translations/es";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "es"],

    // Use same localStorage key as the existing system — no data loss
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "language",
    },

    interpolation: {
      escapeValue: false,
    },

    // Nested keys: t('nav.home') works with the existing translation objects
    keySeparator: ".",

    react: {
      useSuspense: false,
    },
  });

export default i18n;
