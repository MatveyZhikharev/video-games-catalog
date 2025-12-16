import type { Game } from '@/types';

/**
 * Calculate relevance score (0-100) for a game based on favorite games
 * 
 * Formula considers:
 * - Genre match (40 points max)
 * - Platform match (25 points max)
 * - Rating similarity (20 points max)
 * - Release date proximity (15 points max)
 */
export function calculateRelevanceScore(game: Game, favoriteGames: Game[]): number {
  if (favoriteGames.length === 0) {
    return 0;
  }

  let totalScore = 0;

  // Extract patterns from favorites
  const favoriteGenres = new Set(favoriteGames.flatMap(g => g.genres));
  const favoritePlatforms = new Set(favoriteGames.flatMap(g => g.platforms));
  const favoriteRatings = favoriteGames.map(g => g.rating);
  const favoriteYears = favoriteGames.map(g => new Date(g.release_date).getFullYear());

  // 1. Genre Match (40 points)
  const gameGenres = game.genres;
  const genreMatches = gameGenres.filter(g => favoriteGenres.has(g)).length;
  const genreScore = (genreMatches / Math.max(gameGenres.length, 1)) * 40;
  totalScore += genreScore;

  // 2. Platform Match (25 points)
  const gamePlatforms = game.platforms;
  const platformMatches = gamePlatforms.filter(p => favoritePlatforms.has(p)).length;
  const platformScore = (platformMatches / Math.max(gamePlatforms.length, 1)) * 25;
  totalScore += platformScore;

  // 3. Rating Similarity (20 points)
  const avgFavoriteRating = favoriteRatings.reduce((a, b) => a + b, 0) / favoriteRatings.length;
  const ratingDiff = Math.abs(game.rating - avgFavoriteRating);
  const ratingScore = Math.max(0, (1 - ratingDiff / 10) * 20);
  totalScore += ratingScore;

  // 4. Release Date Proximity (15 points)
  const gameYear = new Date(game.release_date).getFullYear();
  const avgFavoriteYear = favoriteYears.reduce((a, b) => a + b, 0) / favoriteYears.length;
  const yearDiff = Math.abs(gameYear - avgFavoriteYear);
  const yearScore = Math.max(0, (1 - yearDiff / 20) * 15);
  totalScore += yearScore;

  return Math.min(100, Math.round(totalScore));
}

/**
 * Sort games by relevance score based on favorites
 */
export function sortByRelevance(games: Game[], favoriteGames: Game[]): Game[] {
  return [...games].sort((a, b) => {
    const scoreA = calculateRelevanceScore(a, favoriteGames);
    const scoreB = calculateRelevanceScore(b, favoriteGames);
    return scoreB - scoreA; // Descending order
  });
}

/**
 * Get relevance color based on score
 */
export function getRelevanceColor(score: number): string {
  if (score >= 75) return '#4caf50'; // green
  if (score >= 50) return '#ff9800'; // orange
  if (score >= 25) return '#f44336'; // red
  return '#9e9e9e'; // gray
}

/**
 * Get relevance label based on score
 */
export function getRelevanceLabel(score: number): string {
  if (score >= 75) return 'Высокая';
  if (score >= 50) return 'Средняя';
  if (score >= 25) return 'Низкая';
  return 'Очень низкая';
}
