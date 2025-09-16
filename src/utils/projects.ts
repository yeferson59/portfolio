import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export type Project = CollectionEntry<"projects">;

/**
 * Get all projects sorted by priority:
 * 1. Featured projects first
 * 2. Newest projects first (by year)
 * 3. Active projects first (by status)
 */
export async function getAllProjects(): Promise<Project[]> {
  const projects = await getCollection("projects");

  return projects.sort((a, b) => {
    // Featured projects first
    if (a.data.featured && !b.data.featured) return -1;
    if (!a.data.featured && b.data.featured) return 1;

    // Then by year (newest first)
    if (a.data.year !== b.data.year) return b.data.year - a.data.year;

    // Then by status (Active first)
    const statusOrder = {
      Active: 0,
      "In Progress": 1,
      Completed: 2,
      Closed: 3,
      Archived: 4,
    };
    return (
      (statusOrder[a.data.status] || 5) - (statusOrder[b.data.status] || 5)
    );
  });
}

/**
 * Get only featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.data.featured);
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(
  category: string,
): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.data.category === category);
}

/**
 * Get projects by status
 */
export async function getProjectsByStatus(status: string): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((project) => project.data.status === status);
}

/**
 * Get project statistics
 */
export async function getProjectStats() {
  const projects = await getAllProjects();
  const featuredCount = projects.filter((p) => p.data.featured).length;
  const totalCount = projects.length;

  // Get unique technologies
  const allTechnologies = projects.flatMap((p) => p.data.stack);
  const uniqueTechnologies = [...new Set(allTechnologies)];

  // Get status distribution
  const statusCounts = projects.reduce(
    (acc, project) => {
      acc[project.data.status] = (acc[project.data.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Get category distribution
  const categoryCounts = projects.reduce(
    (acc, project) => {
      const category = project.data.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    total: totalCount,
    featured: featuredCount,
    technologies: uniqueTechnologies,
    statusDistribution: statusCounts,
    categoryDistribution: categoryCounts,
  };
}
