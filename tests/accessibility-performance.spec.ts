import { test, expect } from "@playwright/test";

test.describe("Accessibility Tests", () => {
  test("page has proper heading structure", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Check for proper heading hierarchy
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1, { timeout: 10000 }); // Exactly one H1 per page

    const h2s = page.locator("h2");
    await expect(h2s.first()).toBeVisible({ timeout: 10000 });
  });

  test("images have alt text", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Wait for images to load
    await page.waitForTimeout(2000);

    // Check that images have alt attributes
    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute("alt");

      // Alt text should exist (can be empty for decorative images)
      expect(altText).not.toBeNull();
    }
  });

  test("links have accessible names", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Wait for navigation to be ready
    await expect(page.locator("nav.header__nav")).toBeVisible({
      timeout: 10000,
    });

    // Check navigation links
    const navLinks = page.locator("nav.header__nav a");
    const linkCount = await navLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");

      // Links should have either text content or aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test("form elements have labels", async ({ page }) => {
    await page.goto("/");

    // Check form inputs have proper labels
    const inputs = page.locator("input, textarea, select");
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const inputId = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const placeholder = await input.getAttribute("placeholder");

      if (inputId) {
        // If input has ID, check for corresponding label
        const label = page.locator(`label[for="${inputId}"]`);
        const hasLabel = (await label.count()) > 0;

        // Input should have label, aria-label, or meaningful placeholder
        expect(hasLabel || ariaLabel || placeholder).toBeTruthy();
      }
    }
  });

  test("page has proper focus management", async ({ page }) => {
    await page.goto("/");

    // Check that focusable elements exist and are accessible
    await page.keyboard.press("Tab");
    const focusedElement = page.locator(":focus");

    // Should have a focused element after tab
    await expect(focusedElement).toBeVisible();

    // Focus should be visible
    const outline = await focusedElement.evaluate(
      (el) =>
        window.getComputedStyle(el).outline ||
        window.getComputedStyle(el).boxShadow,
    );

    // Focus indicator should be present (outline or box-shadow)
    expect(outline).not.toBe("none");
  });
});

test.describe("Performance Tests", () => {
  test("page loads within reasonable time", async ({ page }) => {
    test.setTimeout(30000); // Increase timeout for CI

    const startTime = Date.now();
    await page.goto("/", { waitUntil: "networkidle" });

    // Wait for main content to be visible
    await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible({
      timeout: 10000,
    });

    const loadTime = Date.now() - startTime;

    // Page should load within 10 seconds in CI (more lenient)
    expect(loadTime).toBeLessThan(10000);
  });

  test("images are optimized", async ({ page }) => {
    test.setTimeout(30000); // Increase timeout for CI

    await page.goto("/", { waitUntil: "networkidle" });

    const images = page.locator("img");
    const imageCount = await images.count();

    // Only check first 3 images to avoid timeout
    for (let i = 0; i < Math.min(imageCount, 3); i++) {
      const img = images.nth(i);
      const src = await img.getAttribute("src");

      if (src && !src.startsWith("data:") && src.startsWith("/")) {
        // Only check local images to avoid network issues
        const response = await page.request.get(src);

        // Image should load successfully
        expect(response.status()).toBe(200);

        // Check file size is reasonable (less than 5MB for CI)
        const contentLength = response.headers()["content-length"];
        if (contentLength) {
          const sizeInMB = parseInt(contentLength) / (1024 * 1024);
          expect(sizeInMB).toBeLessThan(5);
        }
      }
    }
  });

  test("no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(3000); // Wait for any async operations

    // Filter out common non-critical errors
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes("favicon") &&
        !error.includes("Extension") &&
        !error.includes("chrome-extension") &&
        !error.includes("telemetry") &&
        !error.includes(
          "Failed to load resource: the server responded with a status of 404 (Not Found)",
        ), // Ignore 404 errors for resources
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
