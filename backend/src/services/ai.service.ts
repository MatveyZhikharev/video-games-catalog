import { gamesService } from './games.service.js';
import type { AIRecommendationRequest, AIRecommendation, Game } from '../types/index.js';

// Mood-to-genre mapping for AI recommendations
const moodGenreMapping: Record<string, string[]> = {
  'relaxed': ['Adventure', 'Simulation', 'Puzzle'],
  'excited': ['Action', 'Shooter', 'Racing'],
  'competitive': ['Sports', 'Fighting', 'Strategy'],
  'adventurous': ['RPG', 'Adventure', 'Action'],
  'strategic': ['Strategy', 'RPG', 'Simulation'],
  'nostalgic': ['Adventure', 'RPG', 'Action'],
  'social': ['Sports', 'Racing', 'Party'],
  'immersive': ['RPG', 'Adventure', 'Action'],
};

export class AIService {
  async getRecommendations(request: AIRecommendationRequest): Promise<AIRecommendation[]> {
    const { mood, preferences, limit = 5 } = request;
    
    // Get matching genres based on mood
    const moodGenres = moodGenreMapping[mood.toLowerCase()] || ['Action', 'Adventure'];
    const targetGenres = preferences?.genres?.length ? preferences.genres : moodGenres;
    
    // Fetch games matching the criteria
    const result = await gamesService.getAll({
      genres: targetGenres,
      platforms: preferences?.platforms,
      sortBy: 'rating',
      sortOrder: 'desc',
      limit: 50, // Get more to filter
      page: 1,
    });
    
    // Filter by minimum rating if specified
    let filteredGames = result.data;
    if (preferences?.minRating) {
      filteredGames = filteredGames.filter(g => g.rating >= preferences.minRating!);
    }
    
    // Calculate match scores and generate reasons
    const recommendations: AIRecommendation[] = filteredGames
      .slice(0, limit)
      .map(game => ({
        game,
        matchScore: this.calculateMatchScore(game, mood, targetGenres),
        reason: this.generateReason(game, mood),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
    
    return recommendations;
  }
  
  private calculateMatchScore(game: Game, mood: string, targetGenres: string[]): number {
    let score = 0;
    
    // Base score from rating
    score += (game.rating / 10) * 40;
    
    // Genre match bonus
    const genreMatches = game.genres.filter(g => targetGenres.includes(g)).length;
    score += (genreMatches / Math.max(targetGenres.length, 1)) * 30;
    
    // Metacritic bonus
    if (game.metacritic_score) {
      score += (game.metacritic_score / 100) * 20;
    }
    
    // Recency bonus for certain moods
    if (['excited', 'competitive'].includes(mood.toLowerCase())) {
      const releaseYear = new Date(game.release_date).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - releaseYear <= 2) {
        score += 10;
      }
    }
    
    return Math.min(100, Math.round(score));
  }
  
  private generateReason(game: Game, mood: string): string {
    const moodReasons: Record<string, string> = {
      'relaxed': `${game.title} offers a laid-back gaming experience perfect for unwinding.`,
      'excited': `${game.title} delivers thrilling action that will keep your adrenaline pumping!`,
      'competitive': `${game.title} provides intense competitive gameplay to test your skills.`,
      'adventurous': `${game.title} takes you on an epic journey full of discoveries.`,
      'strategic': `${game.title} challenges your mind with deep strategic gameplay.`,
      'nostalgic': `${game.title} brings back the classic gaming feel you love.`,
      'social': `${game.title} is perfect for gaming sessions with friends.`,
      'immersive': `${game.title} offers a deeply immersive world to lose yourself in.`,
    };
    
    return moodReasons[mood.toLowerCase()] || 
      `${game.title} matches your preferences with a ${game.rating}/10 rating.`;
  }
  
  getAvailableMoods(): string[] {
    return Object.keys(moodGenreMapping);
  }
}

export const aiService = new AIService();
