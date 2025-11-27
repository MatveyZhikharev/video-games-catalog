import type { Game, Platform, Genre } from '@/types';

/**
 * Debounce function that delays the execution of a function
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Format date to locale string
 */
export function formatDate(dateString: string, locale = 'ru-RU'): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format date to short format
 */
export function formatDateShort(dateString: string, locale = 'ru-RU'): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Filter games by search query, platforms, and genres
 */
export function filterGames(
  games: Game[],
  searchQuery: string,
  platforms: Platform[],
  genres: Genre[]
): Game[] {
  return games.filter((game) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        game.title.toLowerCase().includes(query) ||
        game.description?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Platform filter
    if (platforms.length > 0) {
      const hasMatchingPlatform = platforms.some((platform) =>
        game.platforms.includes(platform)
      );
      if (!hasMatchingPlatform) return false;
    }

    // Genre filter
    if (genres.length > 0) {
      const hasMatchingGenre = genres.some((genre) => game.genres.includes(genre));
      if (!hasMatchingGenre) return false;
    }

    return true;
  });
}

/**
 * Sort games by field and order
 */
export function sortGames(
  games: Game[],
  field: 'rating' | 'release_date',
  order: 'asc' | 'desc'
): Game[] {
  return [...games].sort((a, b) => {
    let comparison = 0;

    if (field === 'rating') {
      comparison = (a.rating ?? 0) - (b.rating ?? 0);
    } else if (field === 'release_date') {
      const dateA = new Date(a.release_date).getTime();
      const dateB = new Date(b.release_date).getTime();
      comparison = dateA - dateB;
    }

    return order === 'desc' ? -comparison : comparison;
  });
}

/**
 * Get platform icon name
 */
export function getPlatformIcon(platform: Platform): string {
  const icons: Record<Platform, string> = {
    PC: '💻',
    PlayStation: '🎮',
    Xbox: '🎯',
    Nintendo: '🕹️',
  };
  return icons[platform] || '🎮';
}

/**
 * Get genre color
 */
export function getGenreColor(genre: Genre): string {
  const colors: Record<Genre, string> = {
    Action: '#e74c3c',
    RPG: '#9b59b6',
    Strategy: '#3498db',
    Adventure: '#2ecc71',
    Sports: '#f39c12',
    Shooter: '#e67e22',
  };
  return colors[genre] || '#95a5a6';
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate array of page numbers for pagination
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible = 5
): (number | string)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  if (currentPage <= halfVisible + 1) {
    for (let i = 1; i <= maxVisible - 1; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
  } else if (currentPage >= totalPages - halfVisible) {
    pages.push(1);
    pages.push('...');
    for (let i = totalPages - maxVisible + 2; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    pages.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Class name utility
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
