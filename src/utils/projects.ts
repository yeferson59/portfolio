import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { paginate, type PaginationData } from "@/utils/pagination";

export type Project = CollectionEntry<"projects">;

/**
 * Get all projects sorted by priority:
 * 1. Featured projects first
 * 2. Newest projects first (by year)
 * 3. Active projects first (by status)
 */

// Then by status (Active first)
const statusOrder = {
  Active: 0,
  "In Progress": 1,
  "In Development": 2,
  Completed: 3,
  Closed: 4,
  Archived: 5,
};

export const getAllProjects = async (): Promise<Project[]> => {
  const projects = await getCollection("projects");

  return projects
    .filter((project) => project.data.draft !== true)
    .sort((a, b) => {
      if (a.data.featured && !b.data.featured) return -1;
      if (!a.data.featured && b.data.featured) return 1;

      // Then by year (newest first)
      if (a.data.year !== b.data.year) return b.data.year - a.data.year;

      const DEFAULT_STATUS_ORDER = 5;
      return (
        (statusOrder[a.data.status] ?? DEFAULT_STATUS_ORDER) -
        (statusOrder[b.data.status] ?? DEFAULT_STATUS_ORDER)
      );
    });
};

/**
 * Get only featured projects
 */
export const getFeaturedProjects = async (): Promise<Project[]> => {
  const projects = await getAllProjects();
  return projects.filter((project) => project.data.featured);
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = async (
  category: string,
): Promise<Project[]> => {
  const projects = await getAllProjects();
  return projects.filter(
    (project) => project.data.category === category && !project.data.draft,
  );
};

/**
 * Get projects by status
 */
export const getProjectsByStatus = async (
  status: string,
): Promise<Project[]> => {
  const projects = await getAllProjects();
  return projects.filter((project) => project.data.status === status);
};

/**
 * Get project statistics
 */
export const getProjectStats = async () => {
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
};

/**
 * Get paginated projects
 */
export const getPaginatedProjects = async (
  page: number = 1,
  itemsPerPage: number = 6,
): Promise<PaginationData<Project>> => {
  const projects = await getAllProjects();
  return paginate(projects, page, itemsPerPage);
};

/**
 * Get projects for homepage (limited to featured or first N projects)
 */
export const getHomepageProjects = async (limit: number = 6): Promise<Project[]> => {
  const projects = await getAllProjects();
  return projects.slice(0, limit);
};
