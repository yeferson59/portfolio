import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe } from "vitest";
import Button from "../../components/ui/Button.astro";

describe("Button Component", () => {
  test("renders basic button with default props", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      slots: {
        default: "Click me",
      },
    });

    expect(result).toContain("Click me");
    expect(result).toContain('class="btn btn--primary btn--md"');
    expect(result).toContain("<button");
  });

  test("renders secondary variant button", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        variant: "secondary",
      },
      slots: {
        default: "Secondary Button",
      },
    });

    expect(result).toContain("Secondary Button");
    expect(result).toContain("btn--secondary");
  });

  test("renders ghost variant button", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        variant: "ghost",
      },
      slots: {
        default: "Ghost Button",
      },
    });

    expect(result).toContain("Ghost Button");
    expect(result).toContain("btn--ghost");
  });

  test("renders link when href is provided", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        href: "https://example.com",
      },
      slots: {
        default: "Link Button",
      },
    });

    expect(result).toContain("Link Button");
    expect(result).toContain("<a");
    expect(result).toContain('href="https://example.com"');
  });

  test("applies full width styling", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        fullWidth: true,
      },
      slots: {
        default: "Full Width Button",
      },
    });

    expect(result).toContain("Full Width Button");
    expect(result).toContain("btn--full");
  });

  test("handles disabled state", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: "Disabled Button",
      },
    });

    expect(result).toContain("Disabled Button");
    expect(result).toContain("disabled");
    expect(result).toContain('aria-disabled="true"');
  });

  test("applies custom class names", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: {
        class: "custom-class",
      },
      slots: {
        default: "Custom Button",
      },
    });

    expect(result).toContain("Custom Button");
    expect(result).toContain("custom-class");
  });
});
