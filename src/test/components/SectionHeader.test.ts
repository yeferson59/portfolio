import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe } from "vitest";
import SectionHeader from "../../components/layouts/SectionHeader.astro";

describe("SectionHeader Component", () => {
  test("renders header with title only", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeader, {
      props: {
        title: "Section Title",
      },
    });

    expect(result).toContain("Section Title");
    expect(result).toContain('class="section-header__title"');
    expect(result).toContain('class="section-header "');
    expect(result).not.toContain('class="section-header__subtitle"');
  });

  test("renders header with title and subtitle", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeader, {
      props: {
        title: "Main Title",
        subtitle: "This is a subtitle",
      },
    });

    expect(result).toContain("Main Title");
    expect(result).toContain("This is a subtitle");
    expect(result).toContain('class="section-header__title"');
    expect(result).toContain('class="section-header__subtitle"');
  });

  test("applies custom class names", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeader, {
      props: {
        title: "Custom Title",
        class: "custom-header-class",
      },
    });

    expect(result).toContain("Custom Title");
    expect(result).toContain("custom-header-class");
    expect(result).toContain('class="section-header custom-header-class"');
  });

  test("handles empty subtitle gracefully", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionHeader, {
      props: {
        title: "Only Title",
        subtitle: "",
      },
    });

    expect(result).toContain("Only Title");
    // Empty subtitle should not render paragraph element
    expect(result).not.toContain("<p");
  });
});
