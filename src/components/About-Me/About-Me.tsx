import { Text, Title } from "src/ui/text";
import { Button } from "src/ui/Button/Button";
import { useLanguage } from "src/context/LanguageContext";
import style from "./style.module.css";

const CheckIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    width="16"
    height="16"
    aria-hidden="true"
    className={style.checkIcon}
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const AboutMe = () => {
  const { t } = useLanguage();

  return (
    <section className={style.container} id="About">
      <div className={style.header}>
        <Title>{t.about.title}</Title>
        <span className={style.divider} />
        <div className={style.headerText}>
          <Text>{t.about.description}</Text>
        </div>
      </div>

      <div className={style.content}>
        <div className={style.bio}>
          <p className={style.bioText}>{t.about.text1}</p>
          <p className={style.bioText}>{t.about.text2}</p>
          <p className={style.bioText}>{t.about.text3}</p>
          <Button>
            <a href="#Contact">{t.about.contactBtn}</a>
          </Button>
        </div>

        <div className={style.card}>
          <h3 className={style.cardTitle}>{t.about.highlightsTitle}</h3>
          <ul className={style.highlights}>
            {t.about.highlights.map((item) => (
              <li key={item} className={style.highlightItem}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { AboutMe };
