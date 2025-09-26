import { test, expect } from '@playwright/test';

test.describe('Portfolio Site Basic Validation', () => {
  test.skip('Page loads successfully', async ({ page }) => {
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
});