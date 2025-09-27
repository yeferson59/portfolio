import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe } from "vitest";
import Badge from "../../components/ui/Badge.astro";

describe("Badge Component", () => {
  test("renders basic badge with default props", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      slots: {
        default: "Default Badge",
      },
    });

    expect(result).toContain("Default Badge");
    expect(result).toContain('class="badge"');
    expect(result).toContain("<span");
  });

  test("renders primary variant badge", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        variant: "primary",
      },
      slots: {
        default: "Primary Badge",
      },
    });

    expect(result).toContain("Primary Badge");
    expect(result).toContain("badge--primary");
  });

  test("renders secondary variant badge", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        variant: "secondary",
      },
      slots: {
        default: "Secondary Badge",
      },
    });

    expect(result).toContain("Secondary Badge");
    expect(result).toContain("badge--secondary");
  });

  test("renders success variant badge", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        variant: "success",
      },
      slots: {
        default: "Success Badge",
      },
    });

    expect(result).toContain("Success Badge");
    expect(result).toContain("badge--success");
  });

  test("applies custom class names", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        class: "custom-badge-class",
      },
      slots: {
        default: "Custom Badge",
      },
    });

    expect(result).toContain("Custom Badge");
    expect(result).toContain("custom-badge-class");
  });

  test("combines variant and custom class", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Badge, {
      props: {
        variant: "primary",
        class: "special-badge",
      },
      slots: {
        default: "Combined Badge",
      },
    });

    expect(result).toContain("Combined Badge");
    expect(result).toContain("badge--primary");
    expect(result).toContain("special-badge");
  });
});
