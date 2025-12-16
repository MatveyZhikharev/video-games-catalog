# GameCatalog Backend - Express.js + PostgreSQL

## 🚀 API Server для каталога видеоигр

### Технологии
- **Express.js** - веб-фреймворк
- **PostgreSQL** - база данных (pg-promise)
- **TypeScript** - типизация
- **GameMatch AI** - умная подборка игр по настроению

### Структура
```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts    # PostgreSQL подключение
│   │   ├── env.ts         # Переменные окружения
│   │   └── schema.sql     # SQL схема
│   ├── controllers/
│   │   ├── games.controller.ts
│   │   ├── favorites.controller.ts
│   │   └── ai.controller.ts
│   ├── routes/
│   │   ├── games.routes.ts
│   │   ├── favorites.routes.ts
│   │   └── ai.routes.ts
│   ├── services/
│   │   ├── games.service.ts
│   │   ├── favorites.service.ts
│   │   └── ai.service.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts           # Entry point
├── package.json
├── tsconfig.json
└── .env.example
```

### Установка

```bash
cd backend
npm install
```

### Настройка базы данных

1. Создайте PostgreSQL базу данных:
```sql
CREATE DATABASE gamecatalog;
```

2. Скопируйте `.env.example` в `.env` и настройте:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/gamecatalog
```

3. Запустите SQL схему:
```bash
psql -d gamecatalog -f src/config/schema.sql
```

### Запуск

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### API Эндпоинты

#### Games (CRUD)
| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/games` | Список игр с фильтрами |
| GET | `/api/games/:id` | Игра по ID |
| POST | `/api/games` | Создать игру |
| PATCH | `/api/games/:id` | Обновить игру |
| DELETE | `/api/games/:id` | Удалить игру |

**Query параметры для GET /api/games:**
- `search` - поиск по названию
- `platforms` - фильтр по платформам (через запятую)
- `genres` - фильтр по жанрам (через запятую)
- `sortBy` - сортировка: rating, release_date, title
- `sortOrder` - порядок: asc, desc
- `page` - номер страницы
- `limit` - количество на странице

#### Favorites
| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/favorites?userId=xxx` | Избранное пользователя |
| POST | `/api/favorites` | Добавить в избранное |
| DELETE | `/api/favorites?userId=xxx&gameId=xxx` | Удалить из избранного |
| GET | `/api/favorites/check?userId=xxx&gameId=xxx` | Проверить избранное |

#### GameMatch AI 🤖
| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/ai/moods` | Доступные настроения |
| POST | `/api/ai/recommend` | Получить рекомендации |

**Пример запроса AI рекомендаций:**
```json
POST /api/ai/recommend
{
  "mood": "adventurous",
  "preferences": {
    "genres": ["RPG", "Action"],
    "platforms": ["PC", "PlayStation"],
    "minRating": 8.0
  },
  "limit": 5
}
```

**Доступные настроения:**
- `relaxed` - расслабленный
- `excited` - возбуждённый
- `competitive` - соревновательный
- `adventurous` - авантюрный
- `strategic` - стратегический
- `nostalgic` - ностальгический
- `social` - социальный
- `immersive` - погружающий

### Примеры запросов

```bash
# Получить все игры
curl http://localhost:3001/api/games

# Поиск игр
curl "http://localhost:3001/api/games?search=witcher&platforms=PC&sortBy=rating"

# Получить AI рекомендации
curl -X POST http://localhost:3001/api/ai/recommend \
  -H "Content-Type: application/json" \
  -d '{"mood": "adventurous", "limit": 3}'
```
