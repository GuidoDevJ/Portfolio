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

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration using Stripe.",
    image: "/images/projects/ecommerce.jpg",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/GuidoDevJ",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, team workspaces, and progress tracking dashboards.",
    image: "/images/projects/taskmanager.jpg",
    techStack: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/GuidoDevJ",
    featured: true,
  },
  {
    id: "3",
    title: "API Gateway Service",
    description:
      "Microservices API gateway with rate limiting, authentication, and request routing for distributed systems.",
    image: "/images/projects/apigateway.jpg",
    techStack: ["NestJS", "Redis", "Docker", "Kubernetes", "GraphQL"],
    githubUrl: "https://github.com/GuidoDevJ",
    featured: true,
  },
  {
    id: "4",
    title: "Real-time Chat Application",
    description:
      "WebSocket-based chat application supporting private messages, group chats, and file sharing with end-to-end encryption.",
    image: "/images/projects/chat.jpg",
    techStack: ["React", "Socket.io", "Express", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/GuidoDevJ",
  },
  {
    id: "5",
    title: "Analytics Dashboard",
    description:
      "Interactive data visualization dashboard with customizable widgets, real-time metrics, and export capabilities.",
    image: "/images/projects/dashboard.jpg",
    techStack: ["Vue.js", "D3.js", "Python", "FastAPI"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/GuidoDevJ",
  },
  {
    id: "6",
    title: "CI/CD Pipeline Tool",
    description:
      "Automated deployment pipeline with testing integration, rollback capabilities, and multi-environment support.",
    image: "/images/projects/cicd.jpg",
    techStack: ["GitHub Actions", "Docker", "AWS", "Terraform"],
    githubUrl: "https://github.com/GuidoDevJ",
  },
];
