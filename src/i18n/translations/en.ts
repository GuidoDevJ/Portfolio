export const en = {
  // Navigation
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },

  // Hero Section
  hero: {
    greeting: "Hey, I'm Guido",
    title: "Software Developer",
    subtitle:
      "I'm a software developer focused on building well-performing Web Applications that provide a great user experience.",
    cta: "Get in Touch",
  },

  // About Section
  about: {
    title: "About Me",
    description:
      "Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology",
    subtitle: "A little more",
    text1:
      "I'm a software developer, who is always trying to be a little better everyday, so I really like watching, listening and reading about technologies and their uses.",
    text2:
      "I also like sharing content related to the stuff that I have learned over the years in Web Development so it can help other people of the Dev Community. Feel free to Connect or Follow me on my Linkedin",
    text3:
      "I'm open to Job opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience then don't hesitate to contact me.",
    skillsTitle: "My Skills",
    contactBtn: "Contact",
  },

  // Projects Section
  projects: {
    title: "Projects",
    description:
      "Here are some of my recent projects. Each one represents a unique challenge and learning experience.",
    liveDemo: "Live Demo",
    github: "GitHub",
  },

  // Experience Section
  experience: {
    title: "Experience",
    description:
      "My professional journey in software development, building impactful solutions across different industries.",
    items: {
      itr: {
        description: [
          "Development and maintenance of scalable backend services",
          "Implementation of CI/CD pipelines with Jenkins",
          "Fully remote work with distributed teams",
        ],
      },
      comafi: {
        description: [
          "Backend service development for a stock brokerage platform",
          "Implementation of REST APIs for financial operations",
          "AI system integration with Amazon Bedrock for intelligent financial data processing",
          "Design and implementation of serverless infrastructure with AWS Lambda and CDK",
          "Data management and processing in Amazon S3",
          "Remote work with a focus on performance and security",
        ],
      },
      freelance: {
        description: [
          "End-to-end development of robust and scalable web applications",
          "Integration of generative AI systems using Amazon Bedrock and RAG architectures",
          "Implementation of Retrieval-Augmented Generation pipelines for LLM-powered products",
          "Creation of dynamic and responsive interfaces with React",
          "API and microservices development with Node.js, deployed on AWS",
        ],
      },
      macroIntell: {
        description: [
          "Led a development team defining architecture and code standards",
          "Full-stack development with React/Next.js on the frontend and Node.js/NestJS on the backend",
          "Design and deployment of microservices on AWS with continuous monitoring",
          "Implementation of unit, integration, and e2e tests",
          "CI/CD pipeline authoring and cloud infrastructure maintenance",
          "Proposed and executed solutions to critical production architecture problems",
        ],
      },
    },
  },

  // Certifications Section
  certifications: {
    title: "Certifications",
    description:
      "Professional certifications and credentials that validate my expertise.",
    viewCredential: "View Credential",
  },

  // Contact Section
  contact: {
    title: "Contact",
    description: "Feel free to reach out if you want to collaborate or just say hi!",
    form: {
      name: "Full Name",
      namePlaceholder: "Enter your name",
      email: "Email Address",
      emailPlaceholder: "Enter your email",
      message: "Message",
      messagePlaceholder: "Write your message here...",
      submit: "Send Message",
      sending: "Sending...",
      success: "Thank you! Your message has been sent successfully.",
    },
    validation: {
      nameRequired: "Name is required",
      nameMin: "Name must be at least 2 characters",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email address",
      messageRequired: "Message is required",
      messageMin: "Message must be at least 10 characters",
    },
    toast: {
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
    },
    rateLimit: {
      exceeded: "You have already sent the maximum of 2 messages from this device.",
      contact: "You can reach me directly on LinkedIn.",
      remaining1: "You have 1 message left",
      remainingN: "You have {count} messages left",
    },
  },

  // Footer
  footer: {
    title: "Guido Gauna",
    description:
      "A Software Developer building Web Applications that leads to success.",
    social: "Social",
    copyright: "© {year} Guido Gauna. All rights reserved.",
  },

  // 404 Page
  notFound: {
    title: "Page Not Found",
    message:
      "Oops! The page you're looking for seems to have wandered off. Let's get you back on track.",
    backHome: "Back to Home",
  },

  // Theme Toggle
  theme: {
    switchTo: "Switch to {mode} mode",
    light: "light",
    dark: "dark",
  },

  // Language Toggle
  language: {
    switchTo: "Cambiar a Español",
    current: "EN",
  },

  // Chat Widget
  chat: {
    title: "Ask about me",
    subtitle: "Powered by AI",
    placeholder: "Ask me anything about Guido...",
    send: "Send",
    thinking: "Thinking...",
    noInfo: "I don't have specific information about that, but feel free to reach out directly!",
    error: "Something went wrong. Please try again.",
    confidence: "Confidence",
    welcome: "Hi! I'm Guido's AI assistant. Ask me anything about his experience, projects, or skills.",
  },
};

export type Translations = typeof en;
