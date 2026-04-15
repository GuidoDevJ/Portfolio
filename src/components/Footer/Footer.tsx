import { SocialMedia } from "src/ui/Social-Media/socialMedia";
import { useLanguage } from "src/context/LanguageContext";
import styles from "./styles.module.css";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.mainFooter}>
        <SocialMedia />
        <div className={styles.containerTextFooter}>
          <h2>{t.footer.title}</h2>
          <p>{t.footer.description}</p>
        </div>
      </div>
      <hr />
      <div className={styles.mainFooterDown}>
        <span>{t.footer.copyright.replace("{year}", String(currentYear))}</span>
      </div>
    </footer>
  );
};

export { Footer };
