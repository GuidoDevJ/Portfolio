import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import i18n from "src/i18n/config";
import {
  translations,
  defaultLanguage,
  type Language,
  type Translations,
} from "src/i18n";

interface LanguageContextValue {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: defaultLanguage,
  t: translations[defaultLanguage],
  setLanguage: () => {},
  toggleLanguage: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Seed initial state from i18next (already resolved locale via detector)
  const [language, setLanguageState] = useState<Language>(
    () => (i18n.language?.slice(0, 2) as Language) || defaultLanguage
  );

  // Stay in sync when i18next changes language (e.g. via toggleLanguage)
  useEffect(() => {
    const handleChange = (lng: string) => {
      const lang = lng.slice(0, 2) as Language;
      setLanguageState(lang);
      document.documentElement.setAttribute("lang", lang);
    };

    i18n.on("languageChanged", handleChange);
    return () => {
      i18n.off("languageChanged", handleChange);
    };
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    i18n.changeLanguage(lang);
  }, []);

  const toggleLanguage = useCallback(() => {
    const next = i18n.language?.startsWith("es") ? "en" : "es";
    i18n.changeLanguage(next);
  }, []);

  // Keep providing the translation object so existing components (t.nav.home) work unchanged
  const t = translations[language] ?? translations[defaultLanguage];

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  return useContext(LanguageContext);
};

export const useTranslation = () => {
  return useContext(LanguageContext).t;
};
