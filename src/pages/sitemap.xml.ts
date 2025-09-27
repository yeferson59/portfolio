import type { APIRoute } from "astro";
import { siteMetadata } from "@/data/site";
import { getPaginatedProjects } from "@/utils/projects";

const staticPages = ["", "/projects", "/blog", "/terms", "/privacy", "/licenses"];

export const GET: APIRoute = async () => {
  const baseUrl = siteMetadata.siteUrl;

  // Get all project pages for pagination
  const projectsPerPage = 6;
  const allPaginatedData = await getPaginatedProjects(1, projectsPerPage);
  const totalPages = allPaginatedData.totalPages;

  // Generate project page URLs (skip page 1 since it's handled by /projects)
  const projectPages = [];
  for (let page = 2; page <= totalPages; page++) {
    projectPages.push(`/projects/${page}`);
  }

  const allPages = [...staticPages, ...projectPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === "" ? "weekly" : page.startsWith("/projects") ? "monthly" : "monthly"}</changefreq>
    <priority>${page === "" ? "1.0" : page === "/projects" ? "0.9" : page.startsWith("/projects") ? "0.8" : "0.7"}</priority>
  </url>`,
    )
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
