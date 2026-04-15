import type { Translations } from "./en";

export const es: Translations = {
  // Navegación
  nav: {
    home: "Inicio",
    about: "Sobre Mí",
    projects: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
  },

  // Sección Hero
  hero: {
    greeting: "Hola, soy Guido",
    title: "Desarrollador de Software",
    subtitle:
      "Soy un desarrollador de software enfocado en construir aplicaciones web de alto rendimiento que brindan una excelente experiencia de usuario.",
    cta: "Contáctame",
  },

  // Sección Sobre Mí
  about: {
    title: "Sobre Mí",
    description:
      "Aquí encontrarás más información sobre mí, lo que hago y mis habilidades actuales principalmente en programación y tecnología",
    subtitle: "Un poco más",
    text1:
      "Soy un desarrollador de software que siempre intenta mejorar cada día, por eso me gusta ver, escuchar y leer sobre tecnologías y sus usos.",
    text2:
      "También me gusta compartir contenido relacionado con lo que he aprendido a lo largo de los años en Desarrollo Web para ayudar a otras personas de la comunidad Dev. No dudes en conectar o seguirme en mi Linkedin",
    text3:
      "Estoy abierto a oportunidades laborales donde pueda contribuir, aprender y crecer. Si tienes una buena oportunidad que coincida con mis habilidades y experiencia, no dudes en contactarme.",
    skillsTitle: "Mis Habilidades",
    contactBtn: "Contactar",
  },

  // Sección Proyectos
  projects: {
    title: "Proyectos",
    description:
      "Aquí están algunos de mis proyectos recientes. Cada uno representa un desafío único y una experiencia de aprendizaje.",
    liveDemo: "Ver Demo",
    github: "GitHub",
  },

  // Sección Experiencia
  experience: {
    title: "Experiencia",
    description:
      "Mi trayectoria profesional en desarrollo de software, construyendo soluciones impactantes en diferentes industrias.",
    items: {
      itr: {
        description: [
          "Desarrollo y mantenimiento de servicios backend escalables",
          "Implementación de pipelines CI/CD con Jenkins",
          "Trabajo en entorno 100% remoto con equipos distribuidos",
        ],
      },
      comafi: {
        description: [
          "Desarrollo de servicios backend para plataforma bursátil",
          "Implementación de APIs REST para operaciones financieras",
          "Integración de sistemas de IA con Amazon Bedrock para procesamiento inteligente de datos financieros",
          "Diseño e implementación de infraestructura serverless con AWS Lambda y CDK",
          "Gestión y procesamiento de datos en Amazon S3",
          "Trabajo en entorno remoto con foco en performance y seguridad",
        ],
      },
      freelance: {
        description: [
          "Desarrollo de aplicaciones web robustas y escalables end-to-end",
          "Integración de sistemas de IA generativa utilizando Amazon Bedrock y arquitecturas RAG",
          "Implementación de pipelines de Retrieval-Augmented Generation para productos con LLMs",
          "Creación de interfaces dinámicas y responsivas con React",
          "Desarrollo de APIs y microservicios con Node.js y despliegue en AWS",
        ],
      },
      macroIntell: {
        description: [
          "Lideré un equipo de desarrollo definiendo arquitectura y estándares de código",
          "Desarrollo full-stack con React/Next.js en frontend y Node.js/NestJS en backend",
          "Diseño y despliegue de microservicios en AWS con monitoreo continuo",
          "Implementación de tests unitarios, de integración y e2e",
          "Escritura de pipelines CI/CD y mantenimiento de infraestructura cloud",
          "Propuse y ejecuté soluciones a problemas críticos de arquitectura en producción",
        ],
      },
    },
  },

  // Sección Certificaciones
  certifications: {
    title: "Certificaciones",
    description:
      "Certificaciones profesionales y credenciales que validan mi experiencia.",
    viewCredential: "Ver Credencial",
  },

  // Sección Contacto
  contact: {
    title: "Contacto",
    description: "¡No dudes en escribirme si quieres colaborar o simplemente saludar!",
    form: {
      name: "Nombre Completo",
      namePlaceholder: "Ingresa tu nombre",
      email: "Correo Electrónico",
      emailPlaceholder: "Ingresa tu correo",
      message: "Mensaje",
      messagePlaceholder: "Escribe tu mensaje aquí...",
      submit: "Enviar Mensaje",
      sending: "Enviando...",
      success: "¡Gracias! Tu mensaje ha sido enviado exitosamente.",
    },
    validation: {
      nameRequired: "El nombre es requerido",
      nameMin: "El nombre debe tener al menos 2 caracteres",
      emailRequired: "El correo es requerido",
      emailInvalid: "Por favor ingresa un correo válido",
      messageRequired: "El mensaje es requerido",
      messageMin: "El mensaje debe tener al menos 10 caracteres",
    },
    toast: {
      success: "¡Mensaje enviado exitosamente!",
      error: "Error al enviar el mensaje. Por favor intenta de nuevo.",
    },
    rateLimit: {
      exceeded: "Ya enviaste el máximo de 2 mensajes desde este dispositivo.",
      contact: "Podés contactarme directamente por LinkedIn.",
      remaining1: "Te queda 1 mensaje",
      remainingN: "Te quedan {count} mensajes",
    },
  },

  // Footer
  footer: {
    title: "Guido Gauna",
    description:
      "Un Desarrollador de Software construyendo Aplicaciones Web que llevan al éxito.",
    social: "Redes",
    copyright: "© {year} Guido Gauna. Todos los derechos reservados.",
  },

  // Página 404
  notFound: {
    title: "Página No Encontrada",
    message:
      "¡Ups! La página que buscas parece haberse perdido. Volvamos al camino correcto.",
    backHome: "Volver al Inicio",
  },

  // Toggle de Tema
  theme: {
    switchTo: "Cambiar a modo {mode}",
    light: "claro",
    dark: "oscuro",
  },

  // Toggle de Idioma
  language: {
    switchTo: "Switch to English",
    current: "ES",
  },

  // Chat Widget
  chat: {
    title: "Preguntame sobre mí",
    subtitle: "Powered by IA",
    placeholder: "Preguntame cualquier cosa sobre Guido...",
    send: "Enviar",
    thinking: "Pensando...",
    noInfo: "No tengo información específica sobre eso, ¡pero podés contactarme directamente!",
    error: "Algo salió mal. Por favor intentá de nuevo.",
    confidence: "Confianza",
    welcome: "¡Hola! Soy el asistente de IA de Guido. Preguntame sobre su experiencia, proyectos o habilidades.",
  },
};
