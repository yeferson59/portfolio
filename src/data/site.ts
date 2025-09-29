import { config } from "@/config";

/**
 * Centralized site configuration and data
 * This file contains all repeated information used across the project
 */

// Developer Information
export const developer = {
  name: "Yeferson Toloza C.",
  title: "Full-Stack Developer & Systems Architect",
  description:
    "Computer Engineering student specialized in building high-performance full-stack applications and distributed systems. Expert in Node.js, TypeScript, Go, and PostgreSQL with real-world experience in e-commerce platforms, AI integrations, and scalable systems.",
  bio: "Full-stack developer and Computer Engineering student (7th semester) with hands-on experience building production systems. I've architected complete e-commerce platforms with JWT authentication, Redis caching, and Docker orchestration. My expertise spans modern frontend applications with Next.js and Astro to scalable backend systems with Node.js and Go. I've worked on AI chatbot integrations, database management with PostgreSQL, and DevOps practices. I'm passionate about emerging technologies, AI, Machine Learning, and fintech. I believe in writing clean, testable code and building systems that scale—demonstrated through my 50+ repositories covering microservices, university projects, and experimental tech.",
  email: "yefersontoloza59@gmail.com",
  location: "Pamplona, Colombia",
  avatar: "https://avatars.githubusercontent.com/u/116679774?v=4",
} as const;

// Brand Information
export const brand = {
  name: "Full-Stack Developer",
  subtitle: "& Systems Architect",
  tagline: "Full-Stack Developer & Systems Architect",
  description:
    "Crafting high-performance full-stack applications and distributed architectures. From modern frontend experiences with Next.js and Astro to scalable backend systems with Node.js and Go—I build complete solutions that handle thousands of users, integrate AI capabilities, and power modern digital experiences.",
} as const;

// Navigation Links
export const navigationLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#metrics", label: "Metrics" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

// Mobile Navigation Items (with icons)
export const mobileNavigationItems = [
  { href: "#about", label: "About", icon: "user" },
  { href: "#skills", label: "Skills", icon: "code" },
  { href: "#metrics", label: "Metrics", icon: "activity" },
  { href: "#projects", label: "Projects", icon: "folder" },
  { href: "#services", label: "Services", icon: "settings" },
  { href: "#contact", label: "Contact", icon: "mail" },
] as const;

// Social Links
export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/yeferson59",
    icon: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.21.7-3.89-1.55-3.89-1.55-.52-1.32-1.27-1.67-1.27-1.67-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.32.96.1-.74.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.52-1.46.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.77.12 3.06.73.8 1.17 1.83 1.17 3.09 0 4.43-2.71 5.39-5.29 5.67.41.35.77 1.05.77 2.13 0 1.54-.01 2.78-.01 3.15 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>`,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yeferson-toloza-42a6a7279",
    icon: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4.9v13.5H.5V8Zm7.48 0H12.7l.02 1.85h.09c.59-1.07 2.04-2.15 4.2-2.15 4 0 4.98 2.38 4.98 6.53V21.5h-4.9v-6.29c0-1.5-.03-3.44-2.18-3.44-2.18 0-2.51 1.63-2.51 3.32v6.41H7.98V8Z"/></svg>`,
  },
  {
    label: "Twitter",
    href: "https://x.com/yefersont59",
    icon: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.43 4.84c-.8.36-1.66.6-2.56.71a4.48 4.48 0 0 0 1.97-2.47 9 9 0 0 1-2.85 1.1 4.49 4.49 0 0 0-7.66 4.09A12.75 12.75 0 0 1 3.16 3.6a4.48 4.48 0 0 0 1.4 5.99 4.42 4.42 0 0 1-2.03-.56v.06a4.49 4.49 0 0 0 3.6 4.4 4.52 4.52 0 0 1-2.02.08 4.49 4.49 0 0 0 4.19 3.12 8.99 8.99 0 0 1-5.57 1.92A9.18 9.18 0 0 1 2 18.56a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.77 0-.2 0-.39-.01-.58a9.1 9.1 0 0 0 2.23-2.33l-.45-.06Z"/></svg>`,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: `<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6.18 17.82a2.18 2.18 0 1 1-4.36 0 2.18 2.18 0 0 1 4.36 0ZM.75 8.34a.75.75 0 0 1 .75-.75 14.41 14.41 0 0 1 14.41 14.41.75.75 0 0 1-1.5 0A12.91 12.91 0 0 0 1.5 9.09a.75.75 0 0 1-.75-.75Zm0-5.84A.75.75 0 0 1 1.5 1.75 20.25 20.25 0 0 1 21.75 22a.75.75 0 0 1-1.5 0A18.75 18.75 0 0 0 1.5 3.25.75.75 0 0 1 .75 2.5Z"/></svg>`,
  },
] as const;

// Technical Skills - Organized by proficiency level
export const skills = {
  expert: [
    "Node.js",
    "TypeScript",
    "Express.js",
    "PostgreSQL",
    "Docker",
    "JWT Authentication",
    "RESTful APIs",
    "JavaScript",
    "Git",
  ],
  proficient: [
    "Golang",
    "Fiber",
    "Gin",
    "Redis",
    "Microservices",
    "Better-Auth",
    "Drizzle ORM",
    "Docker Swarm",
    "WebSocket",
    "gRPC",
    "Bun.js",
    "NestJS",
    "Python",
    "Rust",
    "Next.js",
    "Astro",
    "TailwindCSS",
    "Makefile",
  ],
  familiar: [
    "C#",
    "Java",
    "GitHub Actions",
    "Swagger/OpenAPI",
    "Jest Testing",
    "ESLint",
    "NPM Publishing",
    "Prettier",
    "Husky",
    "Commitlint",
    "Django",
    "PLpgSQL",
    "Shell Scripting",
    "WordPress",
    "Machine Learning",
    "AI/Gemini API",
  ],
} as const;

// Core Features/Principles
export const coreFeatures = [
  {
    title: "Clean Code",
    description:
      "I prioritize readability, testing, and modular design to ensure maintainable and evolving codebases.",
    variant: "primary" as const,
  },
  {
    title: "Security",
    description:
      "Authentication, authorization, encryption, and dependency auditing are integrated into my workflow.",
    variant: "secondary" as const,
  },
  {
    title: "Performance",
    description:
      "I optimize bottlenecks, caching strategies, and query tuning to reduce latency and infrastructure costs.",
    variant: "primary" as const,
  },
  {
    title: "Observability",
    description:
      "I implement tracing, metrics, and proactive alerting to detect and resolve incidents before they escalate.",
    variant: "secondary" as const,
  },
] as const;

// Contact Methods
export const contactMethods = [
  {
    label: "Email",
    value: "yefersontoloza59@gmail.com",
    action: "mailto:yefersontoloza59@gmail.com",
    icon: "mail",
    variant: "primary" as const,
  },
  {
    label: "Location",
    value: "Pamplona, Colombia",
    action:
      "https://www.google.com/maps/place/Pamplona,+Norte+de+Santander/@7.3719791,-72.6708932,14z/data=!3m1!4b1!4m6!3m5!1s0x8e68811722aa0c15:0x83b790e98f7db7d4!8m2!3d7.3733146!4d-72.6482058!16s%2Fm%2F026324g?entry=ttu&g_ep=EgoyMDI1MDkwOS4wIKXMDSoASAFQAw%3D%3D",
    icon: "map",
    variant: "secondary" as const,
  },
  {
    label: "LinkedIn",
    value: "Let's connect professionally",
    action: "https://www.linkedin.com/in/yeferson-toloza-42a6a7279",
    icon: "linkedin",
    variant: "primary" as const,
  },
  {
    label: "GitHub",
    value: "Explore my repositories",
    action: "https://github.com/yeferson59",
    icon: "code",
    variant: "secondary" as const,
  },
] as const;

// Icons used throughout the site
export const icons = {
  // Navigation icons
  user: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/></svg>`,
  code: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m10 20 4-16m4 4 4 4-4 4M6 16l-4-4 4-4"/></svg>`,
  activity: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  folder: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  "dollar-sign": `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  settings: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  mail: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>`,
  // Contact icons (larger size)
  "mail-lg": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 4.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"/></svg>`,
  map: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>`,
  linkedin: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4.9v13.5H.5V8Zm7.48 0H12.7l.02 1.85h.09c.59-1.07 2.04-2.15 4.2-2.15 4 0 4.98 2.38 4.98 6.53V21.5h-4.9v-6.29c0-1.5-.03-3.44-2.18-3.44-2.18 0-2.51 1.63-2.51 3.32v6.41H7.98V8Z"/></svg>`,
  "code-lg": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m7 8-4 4 4 4m10-8 4 4-4 4m-6 6 2-20"/></svg>`,
} as const;

// Footer links
export const footerLinks = {
  terms: "/terms",
  privacy: "/privacy",
  licenses: "/licenses",
} as const;

// Meta information
export const meta = {
  year: new Date().getFullYear(),
  copyright: `© ${new Date().getFullYear()} Full-Stack Developer. All rights reserved.`,
} as const;

// SEO and Site metadata
export const siteMetadata = {
  title: "Backend Developer Portfolio",
  titleTemplate: "%s | Backend Developer Portfolio",
  description:
    "Professional Backend Developer specializing in scalable API architecture, database optimization, and high-performance systems. Expert in Node.js, PostgreSQL, microservices, and cloud-native solutions.",
  siteUrl: config.baseUrl,
  siteName: "Yeferson Toloza - Full-Stack Developer",
  author: developer.name,
  authorEmail: developer.email,
  keywords: [
    "backend developer",
    "full-stack developer",
    "API development",
    "REST API",
    "GraphQL",
    "microservices",
    "system architecture",
    "database optimization",
    "scalable systems",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "Kubernetes",
    "cloud computing",
    "AWS",
    "DevOps",
    "performance optimization",
    "software architecture",
    "distributed systems",
    "high availability",
    "rate limiting",
    "caching strategies",
    "CI/CD",
    "monitoring",
    "observability",
    "software engineering",
  ],
  language: "en",
  locale: "en_US",
  type: "website",
  twitterHandle: "@yefersont59",
  image: {
    url: "/og-image.png",
    alt: "Yeferson Toloza - Full-Stack Developer Portfolio",
    width: 1200,
    height: 630,
  },
  favicon: {
    icon: "/favicon.ico",
    iconThirdTwoForThirdTwo: "/favicon-32x32.png",
    iconSixteenForSixteen: "/favicon-16x16.png",
    appleTouchIcon: "/apple-touch-icon.png",
    manifest: "/site.webmanifest",
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    noimageindex: false,
    nocache: false,
  },
} as const;
