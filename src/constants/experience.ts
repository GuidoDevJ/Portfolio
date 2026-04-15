export interface Experience {
  id: string;
  key: string;
  company: string;
  role: string;
  period: string;
  technologies: string[];
  logo?: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    key: "itr",
    company: "ITR",
    role: "SSR Backend Developer",
    period: "2025 - Present",
    technologies: ["Node.js", "Jenkins"],
  },
  {
    id: "2",
    key: "comafi",
    company: "Comafi Bursátil",
    role: "SSR Backend Developer",
    period: "2025 - Present",
    technologies: ["Node.js", "JavaScript", "Amazon Bedrock", "AWS Lambda", "AWS CDK", "S3"],
  },
  {
    id: "3",
    key: "freelance",
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "2024 - Present",
    technologies: ["React", "Node.js", "AWS", "Amazon Bedrock", "RAG", "MongoDB", "TypeScript"],
  },
  {
    id: "4",
    key: "macroIntell",
    company: "Macro Intell SA",
    role: "Team Leader & FullStack Developer",
    period: "2023 - 2026",
    technologies: ["React", "Next.js", "Node.js", "NestJS", "TypeScript", "AWS", "Docker", "Microservices", "Scrum"],
  },
];
