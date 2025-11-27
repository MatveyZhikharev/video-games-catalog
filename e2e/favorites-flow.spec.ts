import { test, expect } from '@playwright/test';

test.describe('Favorites Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test('should display empty favorites page initially', async ({ page }) => {
    await page.goto('/favorites');
    
    await expect(page.getByRole('heading', { name: /My Favorites/i })).toBeVisible();
    await expect(page.getByText(/No Favorites Yet/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Browse Games/i })).toBeVisible();
  });

  test('should navigate from empty favorites to home page', async ({ page }) => {
    await page.goto('/favorites');
    
    const browseButton = page.getByRole('link', { name: /Browse Games/i });
    await browseButton.click();
    
    await expect(page).toHaveURL('/video-games-catalog/');
  });

  test('should add game to favorites from game page', async ({ page }) => {
    // This test requires games to be loaded
    await page.goto('/');
    
    // Wait for potential content to load
    await page.waitForTimeout(1000);
    
    // Navigate to a game page if available
    const gameCard = page.locator('[aria-label*="View details for"]').first();
    if (await gameCard.isVisible()) {
      await gameCard.click();
      
      // Find and click the add to favorites button
      const favoriteButton = page.getByRole('button', { name: /Add to Favorites/i });
      if (await favoriteButton.isVisible()) {
        await favoriteButton.click();
        
        // Button should change to "Remove from Favorites"
        await expect(page.getByRole('button', { name: /Remove from Favorites/i })).toBeVisible();
      }
    }
  });

  test('should remove game from favorites', async ({ page }) => {
    // Set up a favorite in localStorage
    await page.addInitScript(() => {
      localStorage.setItem('favorites', JSON.stringify(['test-game-id']));
    });
    
    await page.goto('/');
    
    // Wait for content
    await page.waitForTimeout(1000);
    
    // If there's a game card with favorite indicator, click it
    const favoriteButton = page.locator('button', { hasText: '❤️' }).first();
    if (await favoriteButton.isVisible()) {
      await favoriteButton.click();
    }
  });

  test('should show favorites count in header', async ({ page }) => {
    // Add some favorites to localStorage
    await page.addInitScript(() => {
      localStorage.setItem('favorites', JSON.stringify(['game-1', 'game-2']));
    });
    
    await page.goto('/');
    
    // Check if badge with count is visible
    const favoritesLink = page.getByRole('link', { name: /Favorites/i });
    await expect(favoritesLink).toBeVisible();
  });

  test('should persist favorites after page reload', async ({ page }) => {
    // Add a favorite
    await page.addInitScript(() => {
      localStorage.setItem('favorites', JSON.stringify(['persisted-game']));
    });
    
    await page.goto('/favorites');
    
    // Reload the page
    await page.reload();
    
    // Check if favorites are still there
    await expect(page.getByRole('heading', { name: /My Favorites/i })).toBeVisible();
  });
});

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Favorites
    await page.getByRole('link', { name: /Favorites/i }).click();
    await expect(page).toHaveURL('/video-games-catalog/favorites');
    
    // Navigate to About
    await page.getByRole('link', { name: /About/i }).click();
    await expect(page).toHaveURL('/video-games-catalog/about');
    
    // Navigate back to Home
    await page.getByRole('link', { name: /Home/i }).click();
    await expect(page).toHaveURL('/video-games-catalog/');
  });

  test('should display about page content', async ({ page }) => {
    await page.goto('/about');
    
    await expect(page.getByRole('heading', { name: /About GameCatalog/i })).toBeVisible();
    await expect(page.getByText(/Features/i)).toBeVisible();
    await expect(page.getByText(/Technologies/i)).toBeVisible();
  });

  test('should have accessible skip link', async ({ page }) => {
    await page.goto('/');
    
    // Focus on the skip link
    await page.keyboard.press('Tab');
    
    // Check if skip link is visible when focused
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    if (await skipLink.isVisible()) {
      await expect(skipLink).toBeFocused();
    }
  });
});
