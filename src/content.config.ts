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
    links: z
      .array(
        z.object({
          name: z.string().min(1, "Link name is required"),
          url: z.string().url("Must be a valid URL"),
          type: z
            .enum(["repository", "demo", "documentation", "api"])
            .optional()
            .default("repository"),
        }),
      )
      .min(1, "At least one link is required"),
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
        "AI",
        "Simulation",
        "CMS",
        "Template",
      ])
      .optional(),
    draft: z.boolean().optional().default(false),
    performance: z
      .object({
        response_time_p50: z.string().optional(),
        response_time_p95: z.string().optional(),
        response_time_p99: z.string().optional(),
        requests_per_second: z.string().optional(),
        uptime: z.string().optional(),
        cache_hit_ratio: z.string().optional(),
        concurrent_users: z.string().optional(),
        database_queries_optimized: z.string().optional(),
        build_time: z.string().optional(),
        bundle_size: z.string().optional(),
        container_size: z.string().optional(),
        memory_usage: z.string().optional(),
        test_coverage: z.string().optional(),
        concurrent_requests: z.string().optional(),
        database_queries: z.string().optional(),
        data_refresh_rate: z.string().optional(),
        concurrent_connections: z.string().optional(),
      })
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
