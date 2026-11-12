export interface ProjectLanguage {
  name: string;
  color: string;
  percentage: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  stars?: number;
  language?: string;
  languageColor?: string;
  languages?: ProjectLanguage[];
  readme?: string;
  pushedAt?: string;
}
