import { test, expect } from '@playwright/test';

test('home page has expected content', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Wait for the page to be fully loaded and rendered
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');

  // Wait for the title to be set (give it a reasonable timeout)
  await page.waitForFunction(() => document.title !== '', { timeout: 5000 });

  // Check if the page has a title
  const title = await page.title();
  expect(title).not.toBe('');

  // // Check if the page has some content
  // const mainContent = await page.locator('main');
  // await expect(mainContent).toBeVisible();

  // Take a screenshot for visual verification
  await page.screenshot({ path: 'playwright-report/report-screenshots/home-page/home-page.png' });
});
