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
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yeferson-toloza-42a6a7279",
    icon: "linkedin",
  },
  {
    label: "Twitter",
    href: "https://x.com/yefersont59",
    icon: "twitter",
  },
  {
    label: "Blog",
    href: "/blog",
    icon: "blog",
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
    icon: "mail-lg",
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
    icon: "code-lg",
    variant: "secondary" as const,
  },
] as const;

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
