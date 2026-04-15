import { useState } from "react";
import type { Project } from "src/constants/projects";
import { useLanguage } from "src/context/LanguageContext";
import { ReadmeModal } from "./ReadmeModal";
import style from "./style.module.css";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  const [readmeOpen, setReadmeOpen] = useState(false);

  const hasLanguages = project.languages && project.languages.length > 0;

  return (
    <>
      <article className={style.card}>
        {/* Image */}
        <div className={style.imageContainer}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className={style.image}
              loading="lazy"
            />
          ) : (
            <div className={style.imagePlaceholder}>
              <span>{project.title.charAt(0)}</span>
            </div>
          )}
        </div>

        <div className={style.content}>
          {/* Title + Stars */}
          <div className={style.titleRow}>
            <h3 className={style.title}>{project.title}</h3>
            {project.stars != null && project.stars > 0 && (
              <span className={style.stars}>
                <svg viewBox="0 0 16 16" fill="currentColor" width="13" height="13" aria-hidden="true">
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                </svg>
                {project.stars}
              </span>
            )}
          </div>

          {/* Description */}
          <p className={style.description}>{project.description}</p>

          {/* Language breakdown bar */}
          {hasLanguages && (
            <div className={style.languageBar} aria-label="Language breakdown">
              {project.languages!.map((lang) => (
                <span
                  key={lang.name}
                  className={style.languageSegment}
                  style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
          )}

          {/* Language legend */}
          {hasLanguages ? (
            <div className={style.languageLegend}>
              {project.languages!.slice(0, 4).map((lang) => (
                <span key={lang.name} className={style.legendItem}>
                  <span
                    className={style.legendDot}
                    style={{ backgroundColor: lang.color }}
                  />
                  {lang.name}
                  <span className={style.legendPct}>{lang.percentage}%</span>
                </span>
              ))}
            </div>
          ) : project.language ? (
            <span className={style.singleLanguage}>
              <span
                className={style.legendDot}
                style={{ backgroundColor: project.languageColor || "var(--color-primary)" }}
              />
              {project.language}
            </span>
          ) : null}

          {/* Tech stack topics */}
          {project.techStack.length > 0 && (
            <div className={style.techStack}>
              {project.techStack.map((tech) => (
                <span key={tech} className={style.tech}>
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className={style.links}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={style.link}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {t.projects.liveDemo}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={style.link}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {t.projects.github}
              </a>
            )}
            {project.readme && (
              <button
                className={style.readmeButton}
                onClick={() => setReadmeOpen(true)}
                aria-label={`Open README for ${project.title}`}
              >
                <svg viewBox="0 0 16 16" fill="currentColor" width="15" height="15" aria-hidden="true">
                  <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z" />
                </svg>
                README
              </button>
            )}
          </div>
        </div>
      </article>

      {readmeOpen && project.readme && (
        <ReadmeModal
          title={project.title}
          content={project.readme}
          onClose={() => setReadmeOpen(false)}
        />
      )}
    </>
  );
};
