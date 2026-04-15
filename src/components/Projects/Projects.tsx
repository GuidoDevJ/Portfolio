import { Title, Text } from "src/ui/text";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "src/constants/projects";
import { useLanguage } from "src/context/LanguageContext";
import style from "./style.module.css";

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const { t } = useLanguage();

  return (
    <section className={style.container} id="Projects">
      <Title>{t.projects.title}</Title>
      <span className={style.divider}></span>
      <div className={style.text}>
        <Text>{t.projects.description}</Text>
      </div>
      <div className={style.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export { Projects };
