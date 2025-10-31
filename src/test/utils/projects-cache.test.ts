import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock Astro content collection
vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
}));

describe("Projects Cache Optimization", () => {
  beforeEach(() => {
    // Reset module cache to clear projectsCache
    vi.resetModules();
  });

  it("should cache projects after first call", async () => {
    const { getCollection } = await import("astro:content");
    const { getAllProjects } = await import("@/utils/projects");

    const mockProjects = [
      {
        id: "project1",
        slug: "project1",
        data: {
          title: "Project 1",
          description: "Test project 1",
          featured: true,
          draft: false,
          year: 2024,
          status: "Active",
          stack: ["TypeScript"],
          links: { github: "https://github.com/test/project1" },
        },
      },
      {
        id: "project2",
        slug: "project2",
        data: {
          title: "Project 2",
          description: "Test project 2",
          featured: false,
          draft: false,
          year: 2023,
          status: "Completed",
          stack: ["JavaScript"],
          links: { github: "https://github.com/test/project2" },
        },
      },
    ];

    vi.mocked(getCollection).mockResolvedValue(mockProjects as any);

    // First call should fetch from getCollection
    const firstCall = await getAllProjects();
    expect(getCollection).toHaveBeenCalledTimes(1);
    expect(firstCall).toHaveLength(2);

    // Second call should use cache, not call getCollection again
    const secondCall = await getAllProjects();
    expect(getCollection).toHaveBeenCalledTimes(1); // Still 1, not 2
    expect(secondCall).toBe(firstCall); // Same reference, proving cache is used
  });

  it("should filter out draft projects", async () => {
    const { getCollection } = await import("astro:content");
    const { getAllProjects } = await import("@/utils/projects");

    const mockProjects = [
      {
        id: "project1",
        slug: "project1",
        data: {
          title: "Published Project",
          description: "This is published",
          featured: false,
          draft: false,
          year: 2024,
          status: "Active",
          stack: ["TypeScript"],
          links: { github: "https://github.com/test/project1" },
        },
      },
      {
        id: "project2",
        slug: "project2",
        data: {
          title: "Draft Project",
          description: "This is a draft",
          featured: false,
          draft: true,
          year: 2024,
          status: "Active",
          stack: ["JavaScript"],
          links: { github: "https://github.com/test/project2" },
        },
      },
    ];

    vi.mocked(getCollection).mockResolvedValue(mockProjects as any);

    const projects = await getAllProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].data.title).toBe("Published Project");
  });

  it("should sort featured projects first", async () => {
    const { getCollection } = await import("astro:content");
    const { getAllProjects } = await import("@/utils/projects");

    const mockProjects = [
      {
        id: "project1",
        slug: "project1",
        data: {
          title: "Normal Project",
          description: "Test",
          featured: false,
          draft: false,
          year: 2024,
          status: "Active",
          stack: ["TypeScript"],
          links: { github: "https://github.com/test/project1" },
        },
      },
      {
        id: "project2",
        slug: "project2",
        data: {
          title: "Featured Project",
          description: "Test",
          featured: true,
          draft: false,
          year: 2023,
          status: "Active",
          stack: ["JavaScript"],
          links: { github: "https://github.com/test/project2" },
        },
      },
    ];

    vi.mocked(getCollection).mockResolvedValue(mockProjects as any);

    const projects = await getAllProjects();
    expect(projects[0].data.title).toBe("Featured Project");
    expect(projects[1].data.title).toBe("Normal Project");
  });
});
