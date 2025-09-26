import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test, describe } from "vitest";
import Card from "../../components/ui/Card.astro";

describe("Card Component", () => {
  test("renders basic card with default props", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Card, {
      slots: {
        default: "Card content",
      },
    });

    expect(result).toContain("Card content");
    expect(result).toContain('class="card hover-lift"');
    expect(result).toContain("<div");
  });

  test("renders compact variant card", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Card, {
      props: {
        variant: "compact",
      },
      slots: {
        default: "Compact card content",
      },
    });

    expect(result).toContain("Compact card content");
    expect(result).toContain("card--compact");
  });

  test("renders raised variant card", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Card, {
      props: {
        variant: "raised",
      },
      slots: {
        default: "Raised card content",
      },
    });

    expect(result).toContain("Raised card content");
    expect(result).toContain("card--raised");
  });

  test("can disable hover effect", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Card, {
      props: {
        hover: false,
      },
      slots: {
        default: "No hover card",
      },
    });

    expect(result).toContain("No hover card");
    expect(result).not.toContain("hover-lift");
    expect(result).toContain('class="card"');
  });

  test("applies custom class names", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Card, {
      props: {
        class: "custom-card-class",
      },
      slots: {
        default: "Custom card",
      },
    });

    expect(result).toContain("Custom card");
    expect(result).toContain("custom-card-class");
  });

  test("combines multiple modifiers", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Card, {
      props: {
        variant: "raised",
        hover: false,
        class: "special-card",
      },
      slots: {
        default: "Complex card",
      },
    });

    expect(result).toContain("Complex card");
    expect(result).toContain("card--raised");
    expect(result).toContain("special-card");
    expect(result).not.toContain("hover-lift");
  });
});