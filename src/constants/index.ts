// Skills list
export const SKILLS = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "REACT",
  "NEXTJS",
  "EXPRESS",
  "NODE",
  "GIT",
  "POSTGRESQL",
  "FIREBASE",
  "CI/CD",
  "AWS",
  "DOCKER",
  "NESTJS",
  "TESTING",
  "GRAPHQL",
  "MICROSERVICES",
  "SCRUM",
  "ASTRO",
] as const;

// Social media links
export const SOCIAL_LINKS = [
  {
    url: "https://www.linkedin.com/in/guidogauna",
    icon: "fa-brands fa-linkedin-in",
    name: "LinkedIn",
  },
  {
    url: "https://github.com/GuidoDevJ",
    icon: "fa-brands fa-github",
    name: "GitHub",
  },
] as const;

// Navigation links
export const NAV_LINKS = [
  "Home",
  "About",
  "Projects",
  "Experience",
  "Contact",
] as const;

// Breakpoints
export const BREAKPOINTS = {
  mobile: 600,
  tablet: 768,
  desktop: 1024,
} as const;

// Theme colors (for reference)
export const COLORS = {
  primary: "#facf0f",
  textPrimary: "#333333",
  textSecondary: "#666666",
  background: "#ffffff",
  backgroundSecondary: "#f0f0f0",
  border: "#dddddd",
} as const;
