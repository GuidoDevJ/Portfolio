// Initialize i18next before any component renders
import "src/i18n/config";
import { LanguageProvider } from "src/context/LanguageContext";
import { Header } from "src/components/Header/Header";
import { Hero } from "src/components/Hero/Hero";
import { AboutMe } from "src/components/About-Me/About-Me";
import { Projects } from "src/components/Projects/Projects";
import { Experience } from "src/components/Experience/Experience";
import { Certifications } from "src/components/Certifications/Certifications";
import { Contact } from "src/components/Contact/Contact";
import { Footer } from "src/components/Footer/Footer";
import { ScrollProgress } from "src/ui/ScrollProgress";
import { ChatWidget } from "src/ui/ChatWidget";
import type { Project } from "src/constants/projects";
import type { Experience as ExperienceType } from "src/constants/experience";

interface AppProps {
  projects: Project[];
  experiences: ExperienceType[];
}

export const App = ({ projects, experiences }: AppProps) => {
  return (
    <LanguageProvider>
      <ScrollProgress />
      <header className="header" id="Home">
        <Header />
        <Hero />
      </header>
      <main className="main">
        <AboutMe />
        <Projects projects={projects} />
        <Experience experiences={experiences} />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </LanguageProvider>
  );
};
