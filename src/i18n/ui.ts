/**
 * UI translations for all supported locales.
 * Add new locales by extending the `ui` object with a matching key.
 */

export const ui = {
  en: {
    // Navigation
    nav: {
      about: "About",
      skills: "Skills",
      metrics: "Metrics",
      projects: "Projects",
      services: "Services",
      contact: "Contact",
    },

    // About section
    about: {
      title: "About Me",
      corePrinciples: "Core Principles",
      collaborationTitle: "Collaboration",
      collaborationText:
        "🤝 Let's Collaborate Got an idea or project? I can help define the architecture and bring it to production with scalable, secure, and observable practices.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
    },

    // Skills section
    skills: {
      title: "Technical Skills",
      subtitle:
        "Technologies and tools used to perform a specific task or job. They are often acquired through education, training, or experience",
      expert: "Expert • Core Stack",
      proficient: "Proficient • Ecosystem",
      familiar: "Familiar • Tools & Platforms",
      viewProjects: "View Projects",
    },

    // Metrics section
    metrics: {
      title: "API Performance Metrics",
      subtitle:
        "Real-time monitoring of API performance, response times, and system health across all endpoints",
      responseTime: "Response Time",
      uptime: "Uptime",
      totalRequests: "Total Requests",
      requestsToday: "Requests Today",
      excellent: "Excellent",
      stable: "Stable",
      allTime: "All Time",
      responseTimeTrend: "Response Time Trend (24h)",
      systemHealth: "System Health",
      activeConnections: "Active Connections",
      errorRate: "Error Rate",
      throughput: "Throughput",
      avgLoad: "Average Load",
      endpointPerformance: "Endpoint Performance",
      endpoint: "Endpoint",
      calls: "Calls (24h)",
      avgResponse: "Avg Response",
      status: "Status",
      liveMonitoring: "Live Monitoring Active",
      updatedEvery: "Updated every 30 seconds",
      mcpClientPerformance: "MCP Client Performance",
      loadingMcp: "Loading MCP client metrics...",
      mcpInteractiveViewer: "MCP Client Interactive Viewer",
      connectingMcp: "Connecting to MCP...",
      toolsLabel: "Tools:",
      responseTimeLabel: "Response Time:",
      availableMcpTools: "Available MCP Tools",
      loadingTools: "Loading MCP tools...",
      toolExecutor: "Tool Executor",
      selectTool: "Select Tool",
      loadingToolsOption: "Loading tools...",
      toolParameters: "Tool Parameters",
      executeTool: "Execute Tool",
      clearResult: "Clear Result",
      executionResult: "Execution Result",
    },

    // Projects section
    projects: {
      title: "Featured Projects",
      subtitlePrefix: "Showcasing",
      subtitleSuffix:
        "backend-focused projects: APIs, distributed systems, observability, and performance optimization.",
      featuredStats: (featured: number, total: number, tech: number) =>
        `${featured} featured projects • ${total} total • ${tech} technologies`,
      viewAll: "View All Projects",
      viewAllHref: "/projects",
    },

    // Services section
    services: {
      title: "Professional Services",
      subtitle: "Technical solutions and consulting tailored to your project's needs.",
      cantFindTitle: "Can't find what you need?",
      cantFindDesc:
        "Every project is unique. Let's talk about your specific needs and create a custom solution.",
      discussProject: "Let's discuss your project",
    },

    // Contact section
    contact: {
      heading: "Get in touch",
      subtitle:
        "Got an interesting project? Let's talk about architecture, APIs, or infrastructure.",
      contactButton: "Get in touch",
      sendMessageTitle: "Send me a message",
      sendMessageDesc:
        "Briefly describe your project and I'll get back to you within 24 hours.",
      nameLabel: "Name*",
      namePlaceholder: "Your name",
      emailLabel: "Email*",
      subjectLabel: "Subject*",
      subjectPlaceholder: "What would you like to talk about?",
      messageLabel: "Message*",
      messagePlaceholder: "Tell me about your project...",
      privacyNote: "By submitting, you agree to be contacted. No spam.",
      sendButton: "Send Message",
    },

    // Footer
    footer: {
      navigation: "Navigation",
      services: "Services",
      stayUpToDate: "Stay up to date",
      subscribeDesc:
        "Subscribe to receive technical notes, architectural patterns, and posts on scalability.",
      subscribePlaceholder: "your@email.com",
      subscribeButton: "Subscribe",
      noSpamNote:
        "No spam. Just useful technical content. You can unsubscribe at any time.",
      terms: "Terms",
      privacy: "Privacy",
      licenses: "Licenses",
    },
  },

  es: {
    // Navigation
    nav: {
      about: "Inicio",
      skills: "Habilidades",
      metrics: "Métricas",
      projects: "Proyectos",
      services: "Servicios",
      contact: "Contacto",
    },

    // About section
    about: {
      title: "Sobre Mí",
      corePrinciples: "Principios Fundamentales",
      collaborationTitle: "Colaboración",
      collaborationText:
        "🤝 Trabajemos juntos. ¿Tienes una idea o proyecto? Puedo ayudarte a definir la arquitectura y llevarlo a producción con prácticas escalables, seguras y observables.",
      viewProjects: "Ver Proyectos",
      contactMe: "Contáctame",
    },

    // Skills section
    skills: {
      title: "Habilidades Técnicas",
      subtitle:
        "Tecnologías y herramientas utilizadas para realizar una tarea o trabajo específico. A menudo se adquieren a través de la educación, la formación o la experiencia.",
      expert: "Experto • Stack Principal",
      proficient: "Competente • Ecosistema",
      familiar: "Familiarizado • Herramientas y Plataformas",
      viewProjects: "Ver Proyectos",
    },

    // Metrics section
    metrics: {
      title: "Métricas de Rendimiento API",
      subtitle:
        "Monitoreo en tiempo real del rendimiento de la API, tiempos de respuesta y salud del sistema en todos los endpoints",
      responseTime: "Tiempo de Respuesta",
      uptime: "Disponibilidad",
      totalRequests: "Total de Solicitudes",
      requestsToday: "Solicitudes Hoy",
      excellent: "Excelente",
      stable: "Estable",
      allTime: "Histórico",
      responseTimeTrend: "Tendencia de Tiempo de Respuesta (24h)",
      systemHealth: "Salud del Sistema",
      activeConnections: "Conexiones Activas",
      errorRate: "Tasa de Errores",
      throughput: "Rendimiento",
      avgLoad: "Carga Promedio",
      endpointPerformance: "Rendimiento de Endpoints",
      endpoint: "Endpoint",
      calls: "Llamadas (24h)",
      avgResponse: "Resp. Promedio",
      status: "Estado",
      liveMonitoring: "Monitoreo en Vivo Activo",
      updatedEvery: "Actualizado cada 30 segundos",
      mcpClientPerformance: "Rendimiento del Cliente MCP",
      loadingMcp: "Cargando métricas del cliente MCP...",
      mcpInteractiveViewer: "Visor Interactivo del Cliente MCP",
      connectingMcp: "Conectando a MCP...",
      toolsLabel: "Herramientas:",
      responseTimeLabel: "Tiempo de Respuesta:",
      availableMcpTools: "Herramientas MCP Disponibles",
      loadingTools: "Cargando herramientas MCP...",
      toolExecutor: "Ejecutor de Herramientas",
      selectTool: "Seleccionar Herramienta",
      loadingToolsOption: "Cargando herramientas...",
      toolParameters: "Parámetros de la Herramienta",
      executeTool: "Ejecutar Herramienta",
      clearResult: "Limpiar Resultado",
      executionResult: "Resultado de Ejecución",
    },

    // Projects section
    projects: {
      title: "Proyectos Destacados",
      subtitlePrefix: "Mostrando",
      subtitleSuffix:
        "proyectos enfocados en backend: APIs, sistemas distribuidos, observabilidad y optimización de rendimiento.",
      featuredStats: (featured: number, total: number, tech: number) =>
        `${featured} proyectos destacados • ${total} total • ${tech} tecnologías`,
      viewAll: "Ver Todos los Proyectos",
      viewAllHref: "/es/projects",
    },

    // Services section
    services: {
      title: "Servicios Profesionales",
      subtitle: "Soluciones técnicas y consultoría adaptadas a las necesidades de tu proyecto.",
      cantFindTitle: "¿No encuentras lo que necesitas?",
      cantFindDesc:
        "Cada proyecto es único. Hablemos de tus necesidades específicas y creemos una solución personalizada.",
      discussProject: "Hablemos de tu proyecto",
    },

    // Contact section
    contact: {
      heading: "Ponte en contacto",
      subtitle:
        "¿Tienes un proyecto interesante? Hablemos de arquitectura, APIs o infraestructura.",
      contactButton: "Contáctame",
      sendMessageTitle: "Envíame un mensaje",
      sendMessageDesc:
        "Describe brevemente tu proyecto y te responderé en menos de 24 horas.",
      nameLabel: "Nombre*",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico*",
      subjectLabel: "Asunto*",
      subjectPlaceholder: "¿De qué quieres hablar?",
      messageLabel: "Mensaje*",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      privacyNote: "Al enviar, aceptas ser contactado. Sin spam.",
      sendButton: "Enviar Mensaje",
    },

    // Footer
    footer: {
      navigation: "Navegación",
      services: "Servicios",
      stayUpToDate: "Mantente al día",
      subscribeDesc:
        "Suscríbete para recibir notas técnicas, patrones de arquitectura y publicaciones sobre escalabilidad.",
      subscribePlaceholder: "tu@correo.com",
      subscribeButton: "Suscribirse",
      noSpamNote:
        "Sin spam. Solo contenido técnico útil. Puedes darte de baja en cualquier momento.",
      terms: "Términos",
      privacy: "Privacidad",
      licenses: "Licencias",
    },
  },
};

export type Locale = keyof typeof ui;

/**
 * Get translations for a given locale, falling back to English.
 */
export function useTranslations(locale: string | undefined) {
  const lang = (locale && locale in ui ? locale : "en") as Locale;
  return ui[lang];
}
