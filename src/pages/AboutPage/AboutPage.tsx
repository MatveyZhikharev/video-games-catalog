import styles from './AboutPage.module.scss';

const TECHNOLOGIES = [
  { name: 'React 18', description: 'Функциональные компоненты и хуки' },
  { name: 'TypeScript', description: 'Строгая типизация всего кода' },
  { name: 'Redux Toolkit', description: 'Управление состоянием с slices и async thunks' },
  { name: 'React Router v6', description: 'Клиентская маршрутизация' },
  { name: 'SCSS Modules', description: 'Стилизация с адаптивным дизайном' },
  { name: 'Supabase', description: 'PostgreSQL база данных с REST API' },
  { name: 'Jest + RTL', description: 'Unit-тестирование редьюсеров и функций' },
  { name: 'Storybook', description: 'Документация и тестирование компонентов' },
  { name: 'Playwright', description: 'End-to-end тестирование' },
  { name: 'ESLint + Prettier', description: 'Качество кода и форматирование' },
];

const FEATURES = [
  '🎮 Просмотр и поиск игр в каталоге',
  '🔍 Фильтрация по платформе и жанру',
  '📊 Сортировка по рейтингу или дате выхода',
  '❤️ Сохранение избранных игр локально и в облаке',
  '📱 Адаптивный дизайн для всех устройств',
  '♿ Доступность: навигация с клавиатуры и ARIA',
  '🚀 Быстрая и оптимизированная производительность',
];

export const AboutPage = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>О проекте GameCatalog</h1>
        <p className={styles.subtitle}>
          Современное SPA для поиска и отслеживания любимых видеоигр
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✨ Возможности</h2>
        <ul className={styles.featureList}>
          {FEATURES.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🛠️ Технологии</h2>
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
        <h2 className={styles.sectionTitle}>📖 Архитектура проекта</h2>
        <div className={styles.architecture}>
          <pre className={styles.codeBlock}>
{`src/
├── api/           # Supabase клиент и API методы
├── app/           # Redux store и типизированные хуки
├── components/
│   ├── common/    # Переиспользуемые UI компоненты
│   ├── layout/    # Header, Footer, Layout
│   └── features/  # Компоненты для конкретных функций
├── features/      # Redux slices и селекторы
├── pages/         # Компоненты маршрутов
├── types/         # TypeScript интерфейсы
├── utils/         # Вспомогательные функции
└── styles/        # SCSS переменные и миксины`}
          </pre>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🚀 Начало работы</h2>
        <div className={styles.instructions}>
          <h3>Установка</h3>
          <pre className={styles.codeBlock}>
{`# Клонировать репозиторий
git clone https://github.com/MatveyZhikharev/video-games-catalog.git

# Установить зависимости
npm install

# Настроить переменные окружения
cp .env.example .env

# Запустить dev сервер
npm run dev`}
          </pre>

          <h3>Переменные окружения</h3>
          <pre className={styles.codeBlock}>
{`VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`}
          </pre>

          <h3>Запуск тестов</h3>
          <pre className={styles.codeBlock}>
{`# Unit-тесты
npm test

# E2E-тесты
npm run e2e

# Storybook
npm run storybook`}
          </pre>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>👤 Автор</h2>
        <div className={styles.author}>
          <p>Этот проект создан как демонстрация современных практик веб-разработки.</p>
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
            Открыть на GitHub
          </a>
        </div>
      </section>
    </div>
  );
};
