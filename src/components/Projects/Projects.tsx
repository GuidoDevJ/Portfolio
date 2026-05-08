import { useState } from "react";
import { Title, Text } from "src/ui/text";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "src/constants/projects";
import { useLanguage } from "src/context/LanguageContext";
import style from "./style.module.css";

const INITIAL_LIMIT = 3;

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? projects : projects.slice(0, INITIAL_LIMIT);
  const hasMore = projects.length > INITIAL_LIMIT;

  return (
    <section className={style.container} id="Projects">
      <Title>{t.projects.title}</Title>
      <span className={style.divider}></span>
      <div className={style.text}>
        <Text>{t.projects.description}</Text>
      </div>
      <div className={style.projectsGrid}>
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {hasMore && (
        <button
          className={style.showMoreBtn}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? t.projects.showLess : t.projects.showMore}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={expanded ? style.chevronUp : style.chevronDown}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </section>
  );
};

export { Projects };
