import { Title, Text } from "src/ui/text";
import { TimelineItem } from "./TimelineItem";
import type { Experience as ExperienceType } from "src/constants/experience";
import { useLanguage } from "src/context/LanguageContext";
import style from "./style.module.css";

interface ExperienceProps {
  experiences: ExperienceType[];
}

const Experience = ({ experiences }: ExperienceProps) => {
  const { t } = useLanguage();

  return (
    <section className={style.container} id="Experience">
      <Title>{t.experience.title}</Title>
      <span className={style.divider}></span>
      <div className={style.text}>
        <Text>{t.experience.description}</Text>
      </div>
      <div className={style.timeline}>
        {experiences.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            experience={experience}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export { Experience };
