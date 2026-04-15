import { Subtitle, Text, TextSecondary, Title } from "src/ui/text";
import { Button } from "src/ui/Button/Button";
import { Skill } from "src/ui/Skill-Button";
import { useLanguage } from "src/context/LanguageContext";
import { SKILLS } from "src/constants";
import style from "./style.module.css";

const AboutMe = () => {
  const { t } = useLanguage();

  return (
    <div className={style.container} id="About">
      <Title>{t.about.title}</Title>
      <span className={style.divider}></span>
      <div className={style.text}>
        <Text>{t.about.description}</Text>
      </div>
      <div className={style.aboutMe}>
        <div className={style.aboutMeText}>
          <Subtitle>{t.about.subtitle}</Subtitle>
          <TextSecondary>{t.about.text1}</TextSecondary>
          <TextSecondary>{t.about.text2}</TextSecondary>
          <TextSecondary>{t.about.text3}</TextSecondary>
          <Button>
            <a href="#Contact">{t.about.contactBtn}</a>
          </Button>
        </div>
        <div className={style.skillContainer}>
          <Subtitle>{t.about.skillsTitle}</Subtitle>
          <div className={style.skills}>
            {SKILLS.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutMe };
