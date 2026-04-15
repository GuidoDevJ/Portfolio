import type { Experience } from "src/constants/experience";
import { useTranslation } from "src/context/LanguageContext";
import style from "./style.module.css";

interface TimelineItemProps {
  experience: Experience;
  isLast: boolean;
}

export const TimelineItem = ({ experience, isLast }: TimelineItemProps) => {
  const t = useTranslation();
  const itemTranslations = t.experience.items[experience.key as keyof typeof t.experience.items];
  const description: string[] = itemTranslations?.description ?? [];

  return (
    <div className={style.timelineItem}>
      <div className={style.timelineDot}>
        <div className={style.dot} />
        {!isLast && <div className={style.line} />}
      </div>
      <div className={style.content}>
        <div className={style.header}>
          <h3 className={style.role}>{experience.role}</h3>
          <span className={style.period}>{experience.period}</span>
        </div>
        <p className={style.company}>{experience.company}</p>
        <ul className={style.description}>
          {description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className={style.technologies}>
          {experience.technologies.map((tech) => (
            <span key={tech} className={style.tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
