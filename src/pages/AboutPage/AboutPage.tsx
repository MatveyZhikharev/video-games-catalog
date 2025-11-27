import styles from './AboutPage.module.scss';

const TECHNOLOGIES = [
  { name: 'React 18', description: 'Functional components and hooks' },
  { name: 'TypeScript', description: 'Strict typing for the entire codebase' },
  { name: 'Redux Toolkit', description: 'State management with slices and async thunks' },
  { name: 'React Router v6', description: 'Client-side routing' },
  { name: 'SCSS Modules', description: 'Styled components with responsive design' },
  { name: 'Supabase', description: 'PostgreSQL database with REST API' },
  { name: 'Jest + RTL', description: 'Unit testing for reducers and helpers' },
  { name: 'Storybook', description: 'Component documentation and testing' },
  { name: 'Playwright', description: 'End-to-end testing' },
  { name: 'ESLint + Prettier', description: 'Code quality and formatting' },
];

const FEATURES = [
  '🎮 Browse and search through a catalog of video games',
  '🔍 Filter games by platform and genre',
  '📊 Sort games by rating or release date',
  '❤️ Save your favorite games locally and in the cloud',
  '📱 Responsive design for all devices',
  '♿ Accessible with keyboard navigation and ARIA support',
  '🚀 Fast and optimized performance',
];

export const AboutPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>About GameCatalog</h1>
        <p className={styles.subtitle}>
          A modern SPA for discovering and tracking your favorite video games
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✨ Features</h2>
        <ul className={styles.featureList}>
          {FEATURES.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🛠️ Technologies</h2>
        <div className={styles.techGrid}>
          {TECHNOLOGIES.map((tech) => (
            <div key={tech.name} className={styles.techCard}>
              <h3 className={styles.techName}>{tech.name}</h3>
              <p className={styles.techDescription}>{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>📖 Project Architecture</h2>
        <div className={styles.architecture}>
          <pre className={styles.codeBlock}>
{`src/
├── api/           # Supabase client and API methods
├── app/           # Redux store and typed hooks
├── components/
│   ├── common/    # Reusable UI components
│   ├── layout/    # Header, Footer, Layout
│   └── features/  # Feature-specific components
├── features/      # Redux slices and selectors
├── pages/         # Route components
├── types/         # TypeScript interfaces
├── utils/         # Helper functions
└── styles/        # SCSS variables and mixins`}
          </pre>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🚀 Getting Started</h2>
        <div className={styles.instructions}>
          <h3>Installation</h3>
          <pre className={styles.codeBlock}>
{`# Clone the repository
git clone https://github.com/MatveyZhikharev/video-games-catalog.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev`}
          </pre>

          <h3>Environment Variables</h3>
          <pre className={styles.codeBlock}>
{`VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
          </pre>

          <h3>Running Tests</h3>
          <pre className={styles.codeBlock}>
{`# Unit tests
npm test

# E2E tests
npm run e2e

# Storybook
npm run storybook`}
          </pre>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>👤 Author</h2>
        <div className={styles.author}>
          <p>This project was created as a demonstration of modern web development practices.</p>
          <a
            href="https://github.com/MatveyZhikharev/video-games-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
};
