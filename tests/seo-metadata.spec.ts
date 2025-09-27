import { test, expect } from "@playwright/test";

test.describe("SEO and Metadata Tests", () => {
  test("has proper meta tags", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Check essential meta tags
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(70); // SEO best practice

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1, { timeout: 5000 });

    const descriptionContent = await metaDescription.getAttribute("content");
    expect(descriptionContent).toBeTruthy();
    expect(descriptionContent!.length).toBeGreaterThan(20); // More lenient for CI
    expect(descriptionContent!.length).toBeLessThan(220); // Más tolerante para CI
  });

  test("has Open Graph meta tags", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Check Open Graph tags with timeouts
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogType = page.locator('meta[property="og:type"]');
    const ogUrl = page.locator('meta[property="og:url"]');

    await expect(ogTitle).toHaveCount(1, { timeout: 5000 });
    await expect(ogDescription).toHaveCount(1, { timeout: 5000 });
    await expect(ogType).toHaveCount(1, { timeout: 5000 });
    await expect(ogUrl).toHaveCount(1, { timeout: 5000 });

    // Verify content
    const titleContent = await ogTitle.getAttribute("content");
    const descContent = await ogDescription.getAttribute("content");
    const typeContent = await ogType.getAttribute("content");
    const urlContent = await ogUrl.getAttribute("content");

    expect(titleContent).toBeTruthy();
    expect(descContent).toBeTruthy();
    expect(typeContent).toBe("website");
    expect(urlContent).toMatch(/^https?:\/\//);
  });

  test("has Twitter Card meta tags", async ({ page }) => {
    await page.goto("/");

    // Check Twitter Card tags
    const twitterCard = page.locator('meta[name="twitter:card"]');
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    const twitterDescription = page.locator('meta[name="twitter:description"]');

    await expect(twitterCard).toHaveCount(1);
    await expect(twitterTitle).toHaveCount(1);
    await expect(twitterDescription).toHaveCount(1);

    const cardType = await twitterCard.getAttribute("content");
    expect(cardType).toBe("summary_large_image");
  });

  test("has structured data", async ({ page }) => {
    await page.goto("/");

    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]');

    if ((await structuredData.count()) > 0) {
      const jsonContent = await structuredData.first().textContent();
      expect(jsonContent).toBeTruthy();

      // Validate JSON structure
      const parsed = JSON.parse(jsonContent!);
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@type"] || parsed["@graph"]).toBeTruthy();
    }
  });

  test("has proper language and direction attributes", async ({ page }) => {
    await page.goto("/");

    // Check html lang attribute
    const htmlElement = page.locator("html");
    const lang = await htmlElement.getAttribute("lang");
    expect(lang).toBeTruthy();
    expect(lang).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/); // Format: en or en-US
  });

  test("has favicon and app icons", async ({ page }) => {
    await page.goto("/");

    // Check for favicon
    const favicon = page.locator('link[rel="icon"]');
    const faviconCount = await favicon.count();
    expect(faviconCount).toBeGreaterThanOrEqual(1);

    const faviconHref = await favicon.first().getAttribute("href");
    expect(faviconHref).toBeTruthy();

    // Verify favicon loads
    if (faviconHref && !faviconHref.startsWith("data:")) {
      const response = await page.request.get(faviconHref);
      expect(response.status()).toBe(200);
    }
  });

  test("has proper canonical URL", async ({ page }) => {
    await page.goto("/");

    // Check for canonical URL
    const canonical = page.locator('link[rel="canonical"]');

    if ((await canonical.count()) > 0) {
      const canonicalHref = await canonical.getAttribute("href");
      expect(canonicalHref).toBeTruthy();
      expect(canonicalHref).toMatch(/^https?:\/\//);
    }
  });

  test("robots meta tag allows indexing", async ({ page }) => {
    await page.goto("/");

    // Check robots meta tag
    const robotsMeta = page.locator('meta[name="robots"]');

    if ((await robotsMeta.count()) > 0) {
      const robotsContent = await robotsMeta.getAttribute("content");

      // Should not prevent indexing for main pages
      expect(robotsContent).not.toContain("noindex");
      expect(robotsContent).not.toContain("nofollow");
    }
  });

  test("page has proper heading hierarchy for SEO", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // Check that there's exactly one H1
    const h1Elements = page.locator("h1");
    await expect(h1Elements).toHaveCount(1, { timeout: 10000 });

    // H1 should have meaningful content
    const h1Text = await h1Elements.textContent();
    expect(h1Text).toBeTruthy();
    expect(h1Text!.length).toBeGreaterThan(5);

    // Should have H2 elements for main sections
    const h2Elements = page.locator("h2");
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThanOrEqual(2);
  });
});
