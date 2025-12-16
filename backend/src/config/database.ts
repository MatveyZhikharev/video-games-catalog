import pgPromise from 'pg-promise';
import { config } from './env.js';

const pgp = pgPromise();

// Database connection configuration
const dbConfig = config.database.url 
  ? { connectionString: config.database.url }
  : {
      host: config.database.host,
      port: config.database.port,
      database: config.database.name,
      user: config.database.user,
      password: config.database.password,
    };

export const db = pgp(dbConfig);

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    await db.connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Initialize database tables
export async function initializeDatabase(): Promise<void> {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS games (
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
      
      CREATE TABLE IF NOT EXISTS favorites (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) NOT NULL,
        game_id UUID REFERENCES games(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, game_id)
      );
      
      CREATE INDEX IF NOT EXISTS idx_games_title ON games(title);
      CREATE INDEX IF NOT EXISTS idx_games_rating ON games(rating DESC);
      CREATE INDEX IF NOT EXISTS idx_games_release_date ON games(release_date DESC);
      CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
    `);
    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}
