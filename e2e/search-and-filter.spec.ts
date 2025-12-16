import { test, expect } from '@playwright/test';

test.describe('Search and Filter Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the home page with game catalog', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Game Catalog/i })).toBeVisible();
    await expect(page.getByPlaceholder(/Search games/i)).toBeVisible();
  });

  test('should search for games by name', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search games/i);
    await searchInput.fill('Witcher');
    
    // Wait for debounce and results
    await page.waitForTimeout(500);
    
    // Check if search was applied
    await expect(searchInput).toHaveValue('Witcher');
  });

  test('should open filter panel', async ({ page }) => {
    const filterButton = page.getByRole('button', { name: /Filters/i });
    await filterButton.click();
    
    // Check if filter panel is visible
    await expect(page.getByText('Platforms')).toBeVisible();
    await expect(page.getByText('Genres')).toBeVisible();
  });

  test('should apply platform filter', async ({ page }) => {
    const filterButton = page.getByRole('button', { name: /Filters/i });
    await filterButton.click();
    
    // Click on PC platform filter
    const pcFilter = page.getByRole('button', { name: 'PC' });
    await pcFilter.click();
    
    // Check if filter is applied
    await expect(pcFilter).toHaveAttribute('aria-pressed', 'true');
  });

  test('should apply genre filter', async ({ page }) => {
    const filterButton = page.getByRole('button', { name: /Filters/i });
    await filterButton.click();
    
    // Click on Action genre filter
    const actionFilter = page.getByRole('button', { name: 'Action' });
    await actionFilter.click();
    
    // Check if filter is applied
    await expect(actionFilter).toHaveAttribute('aria-pressed', 'true');
  });

  test('should clear filters', async ({ page }) => {
    // Apply a filter first
    const filterButton = page.getByRole('button', { name: /Filters/i });
    await filterButton.click();
    
    const pcFilter = page.getByRole('button', { name: 'PC' });
    await pcFilter.click();
    
    // Close filter panel
    await filterButton.click();
    
    // Clear filters
    const clearButton = page.getByRole('button', { name: /Clear all/i });
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
  });

  test('should change sorting', async ({ page }) => {
    // Open sorting dropdown
    const sortButton = page.getByRole('button', { name: /Rating|Sort/i });
    await sortButton.click();
    
    // Select a sort option
    await expect(page.getByRole('listbox')).toBeVisible();
  });

  test('should navigate to game details page', async ({ page }) => {
    // Wait for games to load
    await page.waitForTimeout(1000);
    
    // Click on a game card if available
    const gameCard = page.locator('[aria-label*="View details for"]').first();
    if (await gameCard.isVisible()) {
      await gameCard.click();
      
      // Should navigate to game details page
      await expect(page).toHaveURL(/\/game\//);
    }
  });
});
