import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Game, Favorite, Platform, Genre, GamesSorting } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Only create client if credentials are provided
const hasSupabaseCredentials = !!(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = hasSupabaseCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock data for development when Supabase is not configured
const mockGames: Game[] = [
  {
    id: '1',
    title: 'The Witcher 3: Wild Hunt',
    description: 'The Witcher 3: Wild Hunt is a story-driven, open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.',
    release_date: '2015-05-19',
    rating: 9.5,
    metacritic_score: 93,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['RPG', 'Action'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    cover_image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '2',
    title: 'Elden Ring',
    description: 'Elden Ring is an action role-playing game developed by FromSoftware. It features an expansive open world with challenging combat and rich lore.',
    release_date: '2022-02-25',
    rating: 9.6,
    metacritic_score: 96,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Action'],
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    cover_image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '3',
    title: 'Cyberpunk 2077',
    description: 'Cyberpunk 2077 is an open-world, action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification.',
    release_date: '2020-12-10',
    rating: 8.5,
    metacritic_score: 86,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Action', 'Shooter'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    cover_image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '4',
    title: 'Red Dead Redemption 2',
    description: 'Red Dead Redemption 2 is a Western-themed action-adventure game. Developed by Rockstar Games, it features a vast open world and compelling story.',
    release_date: '2018-10-26',
    rating: 9.7,
    metacritic_score: 97,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Action', 'Adventure'],
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    cover_image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '5',
    title: 'God of War Ragnarök',
    description: 'God of War Ragnarök is an action-adventure game that continues the story of Kratos and Atreus as they journey through the Nine Realms.',
    release_date: '2022-11-09',
    rating: 9.4,
    metacritic_score: 94,
    platforms: ['PlayStation', 'PC'],
    genres: ['Action', 'Adventure'],
    developer: 'Santa Monica Studio',
    publisher: 'Sony Interactive Entertainment',
    cover_image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '6',
    title: 'Horizon Zero Dawn',
    description: 'Horizon Zero Dawn is an action role-playing game set in a post-apocalyptic world overrun by robotic creatures.',
    release_date: '2017-02-28',
    rating: 8.9,
    metacritic_score: 89,
    platforms: ['PC', 'PlayStation'],
    genres: ['Action', 'RPG'],
    developer: 'Guerrilla Games',
    publisher: 'Sony Interactive Entertainment',
    cover_image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '7',
    title: 'FIFA 24',
    description: 'FIFA 24 brings the world of football to life with HyperMotion technology and enhanced gameplay.',
    release_date: '2023-09-29',
    rating: 7.5,
    metacritic_score: 75,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['Sports'],
    developer: 'EA Sports',
    publisher: 'Electronic Arts',
    cover_image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '8',
    title: 'Call of Duty: Modern Warfare III',
    description: 'Call of Duty: Modern Warfare III delivers the ultimate multiplayer experience with new maps and modes.',
    release_date: '2023-11-10',
    rating: 7.8,
    metacritic_score: 78,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Shooter', 'Action'],
    developer: 'Sledgehammer Games',
    publisher: 'Activision',
    cover_image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '9',
    title: 'Civilization VI',
    description: "Sid Meier's Civilization VI is a turn-based strategy game where you build an empire to stand the test of time.",
    release_date: '2016-10-21',
    rating: 8.8,
    metacritic_score: 88,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['Strategy'],
    developer: 'Firaxis Games',
    publisher: '2K Games',
    cover_image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '10',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'The Legend of Zelda: Tears of the Kingdom is an action-adventure game that expands on the world of Breath of the Wild.',
    release_date: '2023-05-12',
    rating: 9.6,
    metacritic_score: 96,
    platforms: ['Nintendo'],
    genres: ['Adventure', 'Action'],
    developer: 'Nintendo EPD',
    publisher: 'Nintendo',
    cover_image: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '11',
    title: "Baldur's Gate 3",
    description: "Baldur's Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons & Dragons.",
    release_date: '2023-08-03',
    rating: 9.7,
    metacritic_score: 96,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Strategy'],
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    cover_image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '12',
    title: 'Grand Theft Auto V',
    description: 'Grand Theft Auto V is an action-adventure game set in the fictional state of San Andreas.',
    release_date: '2013-09-17',
    rating: 9.5,
    metacritic_score: 97,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Action', 'Adventure'],
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    cover_image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '13',
    title: 'Minecraft',
    description: 'Minecraft is a sandbox game that allows players to build and explore virtual worlds made of blocks.',
    release_date: '2011-11-18',
    rating: 9.2,
    metacritic_score: 93,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['Adventure', 'Strategy'],
    developer: 'Mojang Studios',
    publisher: 'Microsoft',
    cover_image: 'https://images.unsplash.com/photo-1587573089734-599d584d15fb?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1587573089734-599d584d15fb?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '14',
    title: 'Spider-Man 2',
    description: "Marvel's Spider-Man 2 features both Peter Parker and Miles Morales in an epic adventure across New York City.",
    release_date: '2023-10-20',
    rating: 9.3,
    metacritic_score: 90,
    platforms: ['PlayStation'],
    genres: ['Action', 'Adventure'],
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    cover_image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '15',
    title: 'Hades',
    description: 'Hades is a roguelike action dungeon crawler where you defy the god of the dead as you hack and slash out of the Underworld.',
    release_date: '2020-09-17',
    rating: 9.3,
    metacritic_score: 93,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['Action', 'RPG'],
    developer: 'Supergiant Games',
    publisher: 'Supergiant Games',
    cover_image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '16',
    title: 'Sekiro: Shadows Die Twice',
    description: 'Sekiro: Shadows Die Twice is an action-adventure game set in a dark and twisted reimagining of 16th-century Sengoku Japan.',
    release_date: '2019-03-22',
    rating: 9.4,
    metacritic_score: 91,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Action', 'Adventure'],
    developer: 'FromSoftware',
    publisher: 'Activision',
    cover_image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '17',
    title: 'Hollow Knight',
    description: 'Hollow Knight is a challenging 2D action-adventure set in the vast interconnected underground kingdom of Hallownest.',
    release_date: '2017-02-24',
    rating: 9.1,
    metacritic_score: 90,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['Action', 'Adventure'],
    developer: 'Team Cherry',
    publisher: 'Team Cherry',
    cover_image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '18',
    title: 'Disco Elysium',
    description: 'Disco Elysium is a groundbreaking role-playing game with an emphasis on story and dialogue over combat.',
    release_date: '2019-10-15',
    rating: 9.2,
    metacritic_score: 91,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['RPG', 'Adventure'],
    developer: 'ZA/UM',
    publisher: 'ZA/UM',
    cover_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '19',
    title: 'Death Stranding',
    description: 'Death Stranding is an action game set in an open world with multiplayer elements. Reconnect a fractured society.',
    release_date: '2019-11-08',
    rating: 8.3,
    metacritic_score: 82,
    platforms: ['PC', 'PlayStation'],
    genres: ['Action', 'Adventure'],
    developer: 'Kojima Productions',
    publisher: 'Sony Interactive Entertainment',
    cover_image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
  {
    id: '20',
    title: 'Monster Hunter: World',
    description: 'Monster Hunter: World sees players take on the role of a hunter that completes various quests to hunt and slay monsters.',
    release_date: '2018-01-26',
    rating: 9.0,
    metacritic_score: 90,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Action', 'RPG'],
    developer: 'Capcom',
    publisher: 'Capcom',
    cover_image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=225&fit=crop',
    screenshots: ['https://images.unsplash.com/photo-1511882150382-421056c89033?w=800'],
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
];

// Get user ID from localStorage or create new one
export const getUserId = (): string => {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('user_id', userId);
  }
  return userId;
};

// Helper function to filter games locally
const filterGamesLocally = (
  games: Game[],
  searchQuery: string,
  platforms: Platform[],
  genres: Genre[]
): Game[] => {
  return games.filter((game) => {
    if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (platforms.length > 0 && !platforms.some((p) => game.platforms.includes(p))) {
      return false;
    }
    if (genres.length > 0 && !genres.some((g) => game.genres.includes(g))) {
      return false;
    }
    return true;
  });
};

// Helper function to sort games locally
const sortGamesLocally = (games: Game[], sorting: GamesSorting): Game[] => {
  return [...games].sort((a, b) => {
    const aVal = sorting.field === 'rating' ? a.rating : new Date(a.release_date).getTime();
    const bVal = sorting.field === 'rating' ? b.rating : new Date(b.release_date).getTime();
    return sorting.order === 'asc' ? aVal - bVal : bVal - aVal;
  });
};

// Games API
export interface FetchGamesParams {
  searchQuery?: string;
  platforms?: Platform[];
  genres?: Genre[];
  sorting?: GamesSorting;
  page?: number;
  limit?: number;
}

export const gamesApi = {
  async fetchGames(params: FetchGamesParams = {}): Promise<{ data: Game[]; total: number }> {
    const {
      searchQuery = '',
      platforms = [],
      genres = [],
      sorting = { field: 'rating', order: 'desc' },
      page = 1,
      limit = 12,
    } = params;

    // Use mock data if Supabase is not configured
    if (!supabase) {
      let filteredGames = filterGamesLocally(mockGames, searchQuery, platforms, genres);
      filteredGames = sortGamesLocally(filteredGames, sorting);
      const total = filteredGames.length;
      const start = (page - 1) * limit;
      const paginatedGames = filteredGames.slice(start, start + limit);
      return { data: paginatedGames, total };
    }

    let query = supabase.from('games').select('*', { count: 'exact' });

    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }

    if (platforms.length > 0) {
      query = query.overlaps('platforms', platforms);
    }

    if (genres.length > 0) {
      query = query.overlaps('genres', genres);
    }

    query = query.order(sorting.field, { ascending: sorting.order === 'asc' });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: (data as Game[]) || [],
      total: count || 0,
    };
  },

  async fetchGameById(id: string): Promise<Game> {
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const game = mockGames.find((g) => g.id === id);
      if (!game) {
        throw new Error('Game not found');
      }
      return game;
    }

    const { data, error } = await supabase.from('games').select('*').eq('id', id).single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Game;
  },

  async createGame(game: Omit<Game, 'id' | 'created_at' | 'updated_at'>): Promise<Game> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase.from('games').insert(game).select().single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Game;
  },

  async updateGame(id: string, updates: Partial<Game>): Promise<Game> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { data, error } = await supabase
      .from('games')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Game;
  },

  async deleteGame(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase not configured');
    }

    const { error } = await supabase.from('games').delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  },
};

// Favorites API
export const favoritesApi = {
  async fetchFavorites(): Promise<string[]> {
    if (!supabase) {
      // Return from localStorage when Supabase is not configured
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    }

    const userId = getUserId();
    const { data, error } = await supabase
      .from('favorites')
      .select('game_id')
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    return (data as Pick<Favorite, 'game_id'>[])?.map((f) => f.game_id) || [];
  },

  async addToFavorites(gameId: string): Promise<Favorite> {
    if (!supabase) {
      // Store in localStorage when Supabase is not configured
      const stored = localStorage.getItem('favorites');
      const favorites = stored ? JSON.parse(stored) : [];
      if (!favorites.includes(gameId)) {
        favorites.push(gameId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
      return { id: gameId, user_id: 'local', game_id: gameId, created_at: new Date().toISOString() };
    }

    const userId = getUserId();
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, game_id: gameId })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as Favorite;
  },

  async removeFromFavorites(gameId: string): Promise<void> {
    if (!supabase) {
      // Remove from localStorage when Supabase is not configured
      const stored = localStorage.getItem('favorites');
      const favorites = stored ? JSON.parse(stored) : [];
      const filtered = favorites.filter((id: string) => id !== gameId);
      localStorage.setItem('favorites', JSON.stringify(filtered));
      return;
    }

    const userId = getUserId();
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('game_id', gameId);

    if (error) {
      throw new Error(error.message);
    }
  },
};
