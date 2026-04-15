import { en, type Translations } from "./translations/en";
import { es } from "./translations/es";

export type Language = "en" | "es";

export const translations: Record<Language, Translations> = {
  en,
  es,
};

export const defaultLanguage: Language = "en";

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export type { Translations };
