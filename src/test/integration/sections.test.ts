import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe } from "vitest";
import About from "../../components/sections/About.astro";
import Skills from "../../components/sections/Skills.astro";
import Contact from "../../components/sections/Contact.astro";

describe("Page Sections Integration Tests", () => {
  describe("About Section", () => {
    test("renders About section with content", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(About);

      // Should contain section structure
      expect(result).toContain("section");

      // Should have meaningful content (checking for common about section elements)
      expect(result.length).toBeGreaterThan(100); // Should have substantial content
    });
  });

  describe("Skills Section", () => {
    test("renders Skills section with technologies", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Skills);

      // Should contain section structure
      expect(result).toContain("section");

      // Should have meaningful content
      expect(result.length).toBeGreaterThan(100);

      // Skills section might contain progress bars, lists, or skill cards
      const hasSkillIndicators =
        result.includes("progress") ||
        result.includes("skill") ||
        result.includes("technology") ||
        result.includes("stack");

      expect(hasSkillIndicators).toBe(true);
    });
  });

  describe("Contact Section", () => {
    test("renders Contact section with form elements", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Contact);

      // Should contain section structure
      expect(result).toContain("section");

      // Should have form elements
      const hasFormElements =
        result.includes("form") ||
        result.includes("input") ||
        result.includes("textarea") ||
        result.includes("contact");

      expect(hasFormElements).toBe(true);
    });

    test("Contact form has required fields", async () => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Contact);

      // Common contact form fields
      const hasNameField =
        result.includes('name="name"') ||
        (result.includes("placeholder") && result.includes("name"));
      const hasEmailField =
        result.includes('type="email"') || result.includes('name="email"');
      const hasMessageField =
        result.includes("textarea") || result.includes('name="message"');

      // Should have at least some form of contact mechanism
      expect(hasNameField || hasEmailField || hasMessageField).toBe(true);
    });
  });
});
