import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const maxDate = new Date().getFullYear() + 1;

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    stack: z.array(z.string()).min(1, "At least one technology is required"),
    year: z.coerce.number().min(2020).max(maxDate),
    status: z.enum([
      "Active",
      "Completed",
      "In Progress",
      "In Development",
      "Archived",
      "Closed",
    ]),
    href: z.string().url("Must be a valid URL"),
    featured: z.boolean().optional().default(false),
    category: z
      .enum([
        "API",
        "Microservices",
        "DevOps",
        "Analytics",
        "Blockchain",
        "Storage",
        "E-commerce",
        "Middleware",
        "Database",
        "Monitoring",
      ])
      .optional(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    cta: z.string(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = {
  projects,
  services,
};
