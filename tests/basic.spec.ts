import { test, expect } from "@playwright/test";

test.describe("Portfolio Site Basic Validation", () => {
  test("Page loads successfully", async ({ page }) => {
    await page.goto("/");

    // Check page title
    await expect(page).toHaveTitle(/Backend Developer Portfolio/);

    // Check main sections are visible (using strict selectors)
    await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Technical Skills" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Featured Projects" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Professional Services" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Get in touch" }),
    ).toBeVisible();
  });
});
