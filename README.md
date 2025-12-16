# 🎮 Video Games Catalog

A modern SPA (Single Page Application) for discovering and tracking your favorite video games. Built with React, TypeScript, Redux Toolkit, and Supabase.

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-purple)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

## 📸 Screenshots

<!-- Screenshots will be added after deployment -->
| Home Page | Game Details | Favorites |
|-----------|--------------|-----------|
| ![Home](placeholder-home.png) | ![Game](placeholder-game.png) | ![Favorites](placeholder-favorites.png) |

## 🌐 Demo

[Live Demo](https://matveyzhikharev.github.io/video-games-catalog/) <!-- Update after deployment -->

## ✨ Features

- 🎮 Browse and search through a catalog of video games
- 🔍 Filter games by platform (PC, PlayStation, Xbox, Nintendo)
- 🏷️ Filter games by genre (Action, RPG, Strategy, Adventure, Sports, Shooter)
- 📊 Sort games by rating or release date
- ❤️ Save your favorite games locally and in the cloud
- 📱 Responsive design for all devices
- ♿ Accessible with keyboard navigation and ARIA support
- 🚀 Fast and optimized performance with lazy loading
- 🌙 Modern and clean UI

## 🛠️ Technologies

### Frontend
- **React 18** — Functional components and hooks
- **TypeScript** — Strict typing for the entire codebase
- **Redux Toolkit** — State management with slices, async thunks, and selectors
- **React Router v6** — Client-side routing with lazy loading
- **SCSS Modules** — Styled components with responsive design

### Backend
- **Supabase** — PostgreSQL database with REST API (default)
- **Express.js** — Custom Node.js backend (optional, see backend/)
- Full CRUD operations support
- **GameMatch AI** — Smart game recommendations by mood

### Testing
- **Jest + React Testing Library** — Unit tests for reducers and helpers
- **Storybook** — Component documentation and visual testing
- **Playwright** — End-to-end testing

### Code Quality
- **ESLint** — Linting
- **Prettier** — Code formatting

## 📁 Project Structure

\`\`\`
src/
├── api/                    # API clients
│   ├── supabaseClient.ts   # Supabase client and mock data
│   └── expressClient.ts    # Express.js API client
├── app/                    # Redux store and typed hooks
│   ├── store.ts
│   └── hooks.ts
├── components/
│   ├── common/             # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Loader/
│   │   ├── ErrorMessage/
│   │   └── Rating/
│   ├── layout/             # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Layout/
│   └── features/           # Feature-specific components
│       ├── GameCard/
│       ├── GameList/
│       ├── SearchBar/
│       ├── Filters/
│       ├── Sorting/
│       └── GameGallery/
├── features/               # Redux slices and selectors
│   ├── games/
│   └── favorites/
├── pages/                  # Route components
│   ├── HomePage/
│   ├── GamePage/
│   ├── FavoritesPage/
│   └── AboutPage/
├── types/                  # TypeScript interfaces
├── utils/                  # Helper functions
├── styles/                 # SCSS variables and mixins
├── router.tsx              # Application routing
└── main.tsx                # Entry point
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/MatveyZhikharev/video-games-catalog.git
cd video-games-catalog
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Configure your backend in \`.env\`:
\`\`\`env
# Option 1: Use Supabase (default)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Option 2: Use Express.js backend
VITE_USE_EXPRESS_BACKEND=true
VITE_API_URL=http://localhost:3001/api
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🗄️ Backend Options

### Option 1: Supabase (Default)

Create the following tables in your Supabase project:

\`\`\`sql
-- Games table
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  release_date DATE,
  rating DECIMAL(3,1),
  metacritic_score INTEGER,
  platforms TEXT[],
  genres TEXT[],
  developer VARCHAR(255),
  publisher VARCHAR(255),
  cover_image VARCHAR(500),
  screenshots TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Favorites table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, game_id)
);

-- Enable Row Level Security
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to games
CREATE POLICY "Allow anonymous read" ON games FOR SELECT USING (true);

-- Allow anonymous CRUD on favorites
CREATE POLICY "Allow anonymous CRUD" ON favorites FOR ALL USING (true);
\`\`\`

### Option 2: Express.js Backend (Custom Server)

See \`backend/README.md\` for full documentation.

\`\`\`bash
# Setup Express.js backend
cd backend
npm install
cp .env.example .env
# Configure PostgreSQL connection in .env
npm run dev
\`\`\`

**Express.js API Endpoints:**
| Method | URL | Description |
|--------|-----|-------------|
| GET | \`/api/games\` | List games with filters |
| GET | \`/api/games/:id\` | Get game by ID |
| POST | \`/api/games\` | Create game |
| PATCH | \`/api/games/:id\` | Update game |
| DELETE | \`/api/games/:id\` | Delete game |
| GET | \`/api/favorites\` | Get user favorites |
| POST | \`/api/favorites\` | Add to favorites |
| DELETE | \`/api/favorites\` | Remove from favorites |
| GET | \`/api/ai/moods\` | Get available moods |
| POST | \`/api/ai/recommend\` | Get AI recommendations |

### 🤖 GameMatch AI

Get personalized game recommendations based on your mood!

\`\`\`bash
# Available moods:
# relaxed, excited, competitive, adventurous, 
# strategic, nostalgic, social, immersive

curl -X POST http://localhost:3001/api/ai/recommend \\
  -H "Content-Type: application/json" \\
  -d '{"mood": "adventurous", "limit": 5}'
\`\`\`

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| \`npm run dev\` | Start development server |
| \`npm run build\` | Build for production |
| \`npm run preview\` | Preview production build |
| \`npm run lint\` | Run ESLint |
| \`npm run lint:fix\` | Fix ESLint errors |
| \`npm run format\` | Format code with Prettier |
| \`npm test\` | Run unit tests |
| \`npm run test:watch\` | Run tests in watch mode |
| \`npm run test:coverage\` | Run tests with coverage |
| \`npm run e2e\` | Run Playwright E2E tests |
| \`npm run storybook\` | Start Storybook |
| \`npm run build-storybook\` | Build Storybook |

## 🧪 Testing

### Unit Tests
\`\`\`bash
npm test
\`\`\`

### E2E Tests
\`\`\`bash
npm run e2e
\`\`\`

### Storybook
\`\`\`bash
npm run storybook
\`\`\`

## 📱 Responsive Design

| Breakpoint | Screen Size |
|------------|-------------|
| Mobile | < 576px |
| Tablet | 576px - 992px |
| Desktop | > 992px |

## ♿ Accessibility

- Semantic HTML5 markup
- ARIA attributes for interactive elements
- Keyboard navigation support
- Skip to main content link
- Focus indicators
- Screen reader support

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Matvey Zhikharev**

- GitHub: [@MatveyZhikharev](https://github.com/MatveyZhikharev)

---

Made with ❤️ and React
