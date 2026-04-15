import { Title, Text } from "src/ui/text";
import { CERTIFICATIONS } from "src/constants/certifications";
import { useLanguage } from "src/context/LanguageContext";
import style from "./style.module.css";

const Certifications = () => {
  const { t } = useLanguage();

  return (
    <section className={style.container} id="Certifications">
      <Title>{t.certifications.title}</Title>
      <span></span>
      <div className={style.text}>
        <Text>{t.certifications.description}</Text>
      </div>

      <div className={style.grid}>
        {CERTIFICATIONS.map((cert) => (
          <article key={cert.id} className={style.card}>
            <div className={style.badge}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </div>
            <h3 className={style.name}>{cert.name}</h3>
            <p className={style.issuer}>{cert.issuer}</p>
            <span className={style.date}>{cert.date}</span>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={style.link}
              >
                {t.certifications.viewCredential}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export { Certifications };
