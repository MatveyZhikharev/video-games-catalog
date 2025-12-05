import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Game, Platform, Genre } from '@/types';
import { aiApi } from '@/api/expressClient';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { Rating } from '@/components/common/Rating';
import styles from './AIRecommendPage.module.scss';

interface AIRecommendation {
  game: Game;
  matchScore: number;
  reason: string;
}

interface MoodConfig {
  emoji: string;
  label: string;
  description: string;
}

const MOODS: Record<string, MoodConfig> = {
  relaxed: {
    emoji: '😌',
    label: 'Расслабленный',
    description: 'Хочу спокойную игру без стресса',
  },
  excited: {
    emoji: '🔥',
    label: 'Возбуждённый',
    description: 'Хочу драйва и экшена!',
  },
  competitive: {
    emoji: '🏆',
    label: 'Соревновательный',
    description: 'Хочу проверить свои навыки',
  },
  adventurous: {
    emoji: '🗺️',
    label: 'Авантюрный',
    description: 'Хочу исследовать новые миры',
  },
  strategic: {
    emoji: '🧠',
    label: 'Стратегический',
    description: 'Хочу подумать и спланировать',
  },
  immersive: {
    emoji: '🎭',
    label: 'Погружающий',
    description: 'Хочу глубокую историю и атмосферу',
  },
};

const PLATFORMS: Platform[] = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];
const GENRES: Genre[] = ['Action', 'RPG', 'Strategy', 'Adventure', 'Sports', 'Shooter'];

export const AIRecommendPage = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [minRating, setMinRating] = useState<number>(7);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setRecommendations([]);
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const toggleGenre = (genre: Genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const getRecommendations = async () => {
    if (!selectedMood) return;

    try {
      setLoading(true);
      setError(null);
      
      const result = await aiApi.getRecommendations({
        mood: selectedMood,
        preferences: {
          platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
          genres: selectedGenres.length > 0 ? selectedGenres : undefined,
          minRating,
        },
        limit: 6,
      });
      
      setRecommendations(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить рекомендации');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMood) {
      getRecommendations();
    }
  }, [selectedMood]);

  return (
    <div className={styles.aiPage}>
      <header className={styles.header}>
        <h1>🤖 GameMatch AI</h1>
        <p>Умная подборка игр по вашему настроению</p>
      </header>

      <section className={styles.moodSection}>
        <h2>Какое у вас сейчас настроение?</h2>
        <div className={styles.moodGrid}>
          {Object.entries(MOODS).map(([key, config]) => (
            <button
              key={key}
              className={`${styles.moodCard} ${selectedMood === key ? styles.selected : ''}`}
              onClick={() => handleMoodSelect(key)}
            >
              <span className={styles.moodEmoji}>{config.emoji}</span>
              <span className={styles.moodLabel}>{config.label}</span>
              <span className={styles.moodDescription}>{config.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.filtersSection}>
        <button 
          className={styles.filtersToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          ⚙️ {showFilters ? 'Скрыть' : 'Показать'} дополнительные фильтры
        </button>

        {showFilters && (
          <div className={styles.filtersContent}>
            <div className={styles.filterGroup}>
              <label>Минимальный рейтинг: {minRating}</label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className={styles.slider}
              />
            </div>

            <div className={styles.filterGroup}>
              <label>Платформы:</label>
              <div className={styles.chipGroup}>
                {PLATFORMS.map(platform => (
                  <button
                    key={platform}
                    className={`${styles.chip} ${selectedPlatforms.includes(platform) ? styles.active : ''}`}
                    onClick={() => togglePlatform(platform)}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label>Жанры:</label>
              <div className={styles.chipGroup}>
                {GENRES.map(genre => (
                  <button
                    key={genre}
                    className={`${styles.chip} ${selectedGenres.includes(genre) ? styles.active : ''}`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={getRecommendations} variant="primary" disabled={!selectedMood}>
              🔄 Обновить рекомендации
            </Button>
          </div>
        )}
      </section>

      {loading && (
        <div className={styles.loadingSection}>
          <Loader />
          <p>Анализируем ваше настроение...</p>
        </div>
      )}

      {error && (
        <div className={styles.errorSection}>
          <p>❌ {error}</p>
          <Button onClick={getRecommendations} variant="secondary">
            Попробовать снова
          </Button>
        </div>
      )}

      {recommendations.length > 0 && !loading && (
        <section className={styles.resultsSection}>
          <h2>
            {MOODS[selectedMood!]?.emoji} Рекомендации для настроения "{MOODS[selectedMood!]?.label}"
          </h2>
          <div className={styles.recommendationsGrid}>
            {recommendations.map(({ game, matchScore, reason }) => (
              <Link 
                key={game.id} 
                to={`/game/${game.id}`} 
                className={styles.recommendationCard}
              >
                <div className={styles.matchBadge}>
                  {Math.round(matchScore * 100)}% совпадение
                </div>
                <img 
                  src={game.cover_image} 
                  alt={game.title} 
                  className={styles.coverImage}
                />
                <div className={styles.cardContent}>
                  <h3>{game.title}</h3>
                  <Rating value={game.rating} />
                  <p className={styles.reason}>{reason}</p>
                  <div className={styles.tags}>
                    {game.genres.slice(0, 2).map(genre => (
                      <span key={genre} className={styles.tag}>{genre}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {selectedMood && recommendations.length === 0 && !loading && !error && (
        <div className={styles.emptySection}>
          <p>🔍 Не найдено игр, соответствующих вашим критериям.</p>
          <p>Попробуйте изменить фильтры или выбрать другое настроение.</p>
        </div>
      )}
    </div>
  );
};
