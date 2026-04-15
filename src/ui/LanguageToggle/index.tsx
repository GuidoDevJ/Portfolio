import { useLanguage } from "src/context/LanguageContext";
import style from "./style.module.css";

export const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      className={style.toggle}
      onClick={toggleLanguage}
      aria-label={t.language.switchTo}
      title={t.language.switchTo}
    >
      <span className={style.flag}>
        {language === "en" ? "🇺🇸" : "🇪🇸"}
      </span>
      <span className={style.code}>{t.language.current}</span>
    </button>
  );
};
