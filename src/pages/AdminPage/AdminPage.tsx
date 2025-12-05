import { useState, useEffect, useCallback } from 'react';
import { Game, Platform, Genre } from '@/types';
import { expressGamesApi } from '@/api/expressClient';
import { fetchGamesFromSupabase } from '@/api/supabaseClient';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Loader } from '@/components/common/Loader';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import styles from './AdminPage.module.scss';

const PLATFORMS: Platform[] = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];
const GENRES: Genre[] = ['Action', 'RPG', 'Strategy', 'Adventure', 'Sports', 'Shooter'];

interface GameFormData {
  title: string;
  description: string;
  release_date: string;
  rating: number;
  metacritic_score: number | null;
  platforms: Platform[];
  genres: Genre[];
  developer: string;
  publisher: string;
  cover_image: string;
  screenshots: string[];
}

const emptyFormData: GameFormData = {
  title: '',
  description: '',
  release_date: '',
  rating: 0,
  metacritic_score: null,
  platforms: [],
  genres: [],
  developer: '',
  publisher: '',
  cover_image: '',
  screenshots: [],
};

export const AdminPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState<GameFormData>(emptyFormData);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [screenshotInput, setScreenshotInput] = useState('');

  const loadGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try Express.js first, fallback to Supabase
      try {
        const result = await expressGamesApi.fetchGames({ limit: 100 });
        setGames(result.data);
      } catch {
        const result = await fetchGamesFromSupabase({
          searchQuery: '',
          platforms: [],
          genres: [],
          sorting: { field: 'rating', order: 'desc' },
          page: 1,
          limit: 100,
        });
        setGames(result.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить игры');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  const handleInputChange = (field: keyof GameFormData, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlatformToggle = (platform: Platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleGenreToggle = (genre: Genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleAddScreenshot = () => {
    if (screenshotInput.trim()) {
      setFormData(prev => ({
        ...prev,
        screenshots: [...prev.screenshots, screenshotInput.trim()],
      }));
      setScreenshotInput('');
    }
  };

  const handleRemoveScreenshot = (index: number) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setFormData({
      title: game.title,
      description: game.description,
      release_date: game.release_date,
      rating: game.rating,
      metacritic_score: game.metacritic_score,
      platforms: game.platforms,
      genres: game.genres,
      developer: game.developer,
      publisher: game.publisher,
      cover_image: game.cover_image,
      screenshots: game.screenshots,
    });
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditingGame(null);
    setFormData(emptyFormData);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingGame(null);
    setFormData(emptyFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Название игры обязательно');
      return;
    }

    try {
      setSaving(true);
      
      if (editingGame) {
        await expressGamesApi.updateGame(editingGame.id, formData);
      } else {
        await expressGamesApi.createGame(formData);
      }
      
      await loadGames();
      handleCancel();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при сохранении');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту игру?')) {
      return;
    }

    try {
      await expressGamesApi.deleteGame(id);
      await loadGames();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при удалении');
    }
  };

  if (loading) {
    return (
      <div className={styles.adminPage}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.adminPage}>
        <ErrorMessage message={error} onRetry={loadGames} />
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>🛠️ Админ-панель</h1>
        <p>Управление каталогом игр</p>
      </header>

      <div className={styles.actions}>
        <Button onClick={handleCreate} variant="primary">
          ➕ Добавить игру
        </Button>
        <span className={styles.count}>Всего игр: {games.length}</span>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{editingGame ? 'Редактировать игру' : 'Добавить игру'}</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Название *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Название игры"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Разработчик</label>
                <Input
                  value={formData.developer}
                  onChange={(e) => handleInputChange('developer', e.target.value)}
                  placeholder="Разработчик"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Издатель</label>
                <Input
                  value={formData.publisher}
                  onChange={(e) => handleInputChange('publisher', e.target.value)}
                  placeholder="Издатель"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Дата выхода</label>
                <Input
                  type="date"
                  value={formData.release_date}
                  onChange={(e) => handleInputChange('release_date', e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Рейтинг (0-10)</label>
                <Input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Metacritic Score</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.metacritic_score ?? ''}
                  onChange={(e) => handleInputChange('metacritic_score', e.target.value ? parseInt(e.target.value) : null)}
                />
              </div>

              <div className={styles.formGroup}>
                <label>URL обложки</label>
                <Input
                  value={formData.cover_image}
                  onChange={(e) => handleInputChange('cover_image', e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Описание</label>
              <textarea
                className={styles.textarea}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Описание игры..."
                rows={4}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Платформы</label>
              <div className={styles.checkboxGroup}>
                {PLATFORMS.map(platform => (
                  <label key={platform} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={formData.platforms.includes(platform)}
                      onChange={() => handlePlatformToggle(platform)}
                    />
                    {platform}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Жанры</label>
              <div className={styles.checkboxGroup}>
                {GENRES.map(genre => (
                  <label key={genre} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={formData.genres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Скриншоты</label>
              <div className={styles.screenshotInput}>
                <Input
                  value={screenshotInput}
                  onChange={(e) => setScreenshotInput(e.target.value)}
                  placeholder="URL скриншота"
                />
                <Button type="button" onClick={handleAddScreenshot} variant="secondary">
                  Добавить
                </Button>
              </div>
              <div className={styles.screenshotList}>
                {formData.screenshots.map((url, index) => (
                  <div key={index} className={styles.screenshotItem}>
                    <img src={url} alt={`Screenshot ${index + 1}`} />
                    <button type="button" onClick={() => handleRemoveScreenshot(index)}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.formActions}>
              <Button type="button" onClick={handleCancel} variant="secondary">
                Отмена
              </Button>
              <Button type="submit" variant="primary" disabled={saving}>
                {saving ? 'Сохранение...' : editingGame ? 'Сохранить' : 'Создать'}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.gamesTable}>
        <table>
          <thead>
            <tr>
              <th>Обложка</th>
              <th>Название</th>
              <th>Рейтинг</th>
              <th>Платформы</th>
              <th>Жанры</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.id}>
                <td>
                  <img 
                    src={game.cover_image} 
                    alt={game.title} 
                    className={styles.thumbnail}
                  />
                </td>
                <td>
                  <strong>{game.title}</strong>
                  <br />
                  <small>{game.developer}</small>
                </td>
                <td>⭐ {game.rating}</td>
                <td>{game.platforms.join(', ')}</td>
                <td>{game.genres.join(', ')}</td>
                <td className={styles.tableActions}>
                  <Button onClick={() => handleEdit(game)} variant="secondary" size="small">
                    ✏️ Изменить
                  </Button>
                  <Button onClick={() => handleDelete(game.id)} variant="danger" size="small">
                    🗑️ Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
