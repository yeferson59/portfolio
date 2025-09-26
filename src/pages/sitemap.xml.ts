import type { APIRoute } from "astro";
import { siteMetadata } from "@/data/site";

const staticPages = ["", "/blog", "/terms", "/privacy", "/licenses"];

export const GET: APIRoute = async () => {
  const baseUrl = siteMetadata.siteUrl;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "" ? "1.0" : "0.7"}</priority>
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
