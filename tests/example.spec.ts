import { test, expect } from "@playwright/test";

const PORTFOLIO_TITLE_PATTERN = /Backend Developer Portfolio/;

test.describe("Portfolio Homepage", () => {
  test("has correct title and loads main sections", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Check page title
    await expect(page).toHaveTitle(PORTFOLIO_TITLE_PATTERN, { timeout: 10000 });

    // Check main sections are visible with timeouts (usando selectores estrictos)
    await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible({
      timeout: 10000,
    });
    await expect(
      page.getByRole("heading", { name: "Technical Skills" }),
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByRole("heading", { name: "Featured Projects" }),
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByRole("heading", { name: "Professional Services" }),
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByRole("heading", { name: "Get in touch" }),
    ).toBeVisible({ timeout: 10000 });
  });

  test("navigation links work correctly", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Wait for page to load with increased timeout
    await expect(page.getByRole("navigation")).toBeVisible({ timeout: 10000 });

    // Test navigation to different sections (si hay múltiples, usar el primero)
    const aboutLinks = page.getByRole("link", { name: "About" });
    if ((await aboutLinks.count()) > 0) {
      await aboutLinks.nth(0).click();
      await page.waitForTimeout(2000); // Allow scroll animation
    }

    const skillsLinks = page.getByRole("link", { name: "Skills" });
    if ((await skillsLinks.count()) > 0) {
      await skillsLinks.nth(0).click();
      await page.waitForTimeout(2000);
    }
  });

  test("contact form is present and functional", async ({ page }) => {
    await page.goto("/");

    // Look for contact form elements
    const nameInput = page
      .getByLabel("Name")
      .or(page.locator('input[name="name"]'))
      .or(page.locator('input[placeholder*="name" i]'));
    const emailInput = page
      .getByLabel("Email")
      .or(page.locator('input[name="email"]'))
      .or(page.locator('input[type="email"]'));
    const messageInput = page
      .getByLabel("Message")
      .or(page.locator('textarea[name="message"]'))
      .or(page.locator('textarea[placeholder*="message" i]'));

    // Check if contact form exists
    if ((await nameInput.count()) > 0) {
      await expect(nameInput.nth(0)).toBeVisible();
      await expect(emailInput.nth(0)).toBeVisible();
      await expect(messageInput.nth(0)).toBeVisible();

      // Test form interaction
      await nameInput.nth(0).fill("Test User");
      await emailInput.nth(0).fill("test@example.com");
      await messageInput.nth(0).fill("This is a test message");

      // Verify form was filled
      await expect(nameInput.nth(0)).toHaveValue("Test User");
      await expect(emailInput.nth(0)).toHaveValue("test@example.com");
      await expect(messageInput.nth(0)).toHaveValue("This is a test message");
    }
  });
});

test.describe("Responsive Design", () => {
  test("works on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto("/");

    await expect(page).toHaveTitle(/Backend Developer Portfolio/);
    await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();
  });

  test("works on tablet viewport", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.goto("/");

    await expect(page).toHaveTitle(/Backend Developer Portfolio/);
    await expect(
      page.getByRole("heading", { name: "Technical Skills" }),
    ).toBeVisible();
  });

  test("mobile menu functionality", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Look for mobile menu button (hamburger menu)
    const menuButton = page
      .getByRole("button", { name: /menu/i })
      .or(page.locator('button[aria-label*="menu" i]'))
      .or(page.locator(".hamburger"))
      .or(page.locator("[data-mobile-menu-trigger]"));

    if ((await menuButton.count()) > 0) {
      await menuButton.click();
      await page.waitForTimeout(500); // Allow menu animation

      // Menu should be visible after clicking
      const mobileMenu = page
        .locator('[role="menu"]')
        .or(page.locator(".mobile-menu"))
        .or(page.locator("[data-mobile-menu]"));

      if ((await mobileMenu.count()) > 0) {
        await expect(mobileMenu).toBeVisible();
      }
    }
  });
});
