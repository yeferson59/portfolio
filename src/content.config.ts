import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    year: z.coerce.number(),
    status: z.coerce.string(),
    href: z.coerce.string().url(),
  }),
});

export const collections = {
  projects,
};
