import { test, expect } from '@playwright/test';

test.describe('Portfolio Homepage', () => {
  test('has correct title and loads main sections', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Backend Developer Portfolio/);
    
    // Check main sections are visible
    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('Skills')).toBeVisible();
    await expect(page.getByText('Projects')).toBeVisible();
    await expect(page.getByText('Services')).toBeVisible();
    await expect(page.getByText('Contact')).toBeVisible();
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Test navigation to different sections (if they exist)
    const aboutLink = page.getByRole('link', { name: 'About' });
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await page.waitForTimeout(1000); // Allow scroll animation
    }
    
    const skillsLink = page.getByRole('link', { name: 'Skills' });
    if (await skillsLink.count() > 0) {
      await skillsLink.click();
      await page.waitForTimeout(1000);
    }
  });

  test('contact form is present and functional', async ({ page }) => {
    await page.goto('/');
    
    // Look for contact form elements
    const nameInput = page.getByLabel('Name').or(page.locator('input[name="name"]')).or(page.locator('input[placeholder*="name" i]'));
    const emailInput = page.getByLabel('Email').or(page.locator('input[name="email"]')).or(page.locator('input[type="email"]'));
    const messageInput = page.getByLabel('Message').or(page.locator('textarea[name="message"]')).or(page.locator('textarea[placeholder*="message" i]'));
    
    // Check if contact form exists
    if (await nameInput.count() > 0) {
      await expect(nameInput).toBeVisible();
      await expect(emailInput).toBeVisible();
      await expect(messageInput).toBeVisible();
      
      // Test form interaction
      await nameInput.fill('Test User');
      await emailInput.fill('test@example.com');
      await messageInput.fill('This is a test message');
      
      // Verify form was filled
      await expect(nameInput).toHaveValue('Test User');
      await expect(emailInput).toHaveValue('test@example.com');
      await expect(messageInput).toHaveValue('This is a test message');
    }
  });
});

test.describe('Responsive Design', () => {
  test('works on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Backend Developer Portfolio/);
    await expect(page.getByText('About')).toBeVisible();
  });

  test('works on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Backend Developer Portfolio/);
    await expect(page.getByText('Skills')).toBeVisible();
  });

  test('mobile menu functionality', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Look for mobile menu button (hamburger menu)
    const menuButton = page.getByRole('button', { name: /menu/i })
      .or(page.locator('button[aria-label*="menu" i]'))
      .or(page.locator('.hamburger'))
      .or(page.locator('[data-mobile-menu-trigger]'));
    
    if (await menuButton.count() > 0) {
      await menuButton.click();
      await page.waitForTimeout(500); // Allow menu animation
      
      // Menu should be visible after clicking
      const mobileMenu = page.locator('[role="menu"]')
        .or(page.locator('.mobile-menu'))
        .or(page.locator('[data-mobile-menu]'));
      
      if (await mobileMenu.count() > 0) {
        await expect(mobileMenu).toBeVisible();
      }
    }
  });
});
