-- GameCatalog Database Schema
-- Run this script to initialize the PostgreSQL database

-- Create games table
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

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, game_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_games_title ON games(title);
CREATE INDEX IF NOT EXISTS idx_games_rating ON games(rating DESC);
CREATE INDEX IF NOT EXISTS idx_games_release_date ON games(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_games_platforms ON games USING GIN(platforms);
CREATE INDEX IF NOT EXISTS idx_games_genres ON games USING GIN(genres);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_game ON favorites(game_id);

-- Insert seed data
INSERT INTO games (title, description, release_date, rating, metacritic_score, platforms, genres, developer, publisher, cover_image, screenshots) VALUES
('The Witcher 3: Wild Hunt', 'An action role-playing game set in an open world environment.', '2015-05-19', 9.5, 93, ARRAY['PC', 'PlayStation', 'Xbox', 'Nintendo'], ARRAY['RPG', 'Action', 'Adventure'], 'CD Projekt Red', 'CD Projekt', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/gjeu4o3ygpmf2tzwzg0p.webp']),
('Elden Ring', 'An action role-playing game developed by FromSoftware.', '2022-02-25', 9.6, 96, ARRAY['PC', 'PlayStation', 'Xbox'], ARRAY['RPG', 'Action'], 'FromSoftware', 'Bandai Namco', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/scgeu8.webp']),
('Red Dead Redemption 2', 'An epic tale of life in America at the dawn of the modern age.', '2018-10-26', 9.7, 97, ARRAY['PC', 'PlayStation', 'Xbox'], ARRAY['Action', 'Adventure'], 'Rockstar Games', 'Rockstar Games', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/kpc1ld0tq5pn5pteawot.webp']),
('God of War Ragnarök', 'Embark on an epic and heartfelt journey.', '2022-11-09', 9.4, 94, ARRAY['PlayStation'], ARRAY['Action', 'Adventure'], 'Santa Monica Studio', 'Sony Interactive Entertainment', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/sce5l0.webp']),
('Cyberpunk 2077', 'An open-world action-adventure RPG set in Night City.', '2020-12-10', 8.5, 86, ARRAY['PC', 'PlayStation', 'Xbox'], ARRAY['RPG', 'Action', 'Shooter'], 'CD Projekt Red', 'CD Projekt', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4hxx.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/scahch.webp']),
('Grand Theft Auto V', 'An action-adventure game set in the fictional state of San Andreas.', '2013-09-17', 9.7, 97, ARRAY['PC', 'PlayStation', 'Xbox'], ARRAY['Action', 'Adventure', 'Shooter'], 'Rockstar North', 'Rockstar Games', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/gstbpk9ay4m2x2xvjqq2.webp']),
('The Legend of Zelda: Tears of the Kingdom', 'An epic adventure across the land and skies of Hyrule.', '2023-05-12', 9.6, 96, ARRAY['Nintendo'], ARRAY['Adventure', 'Action'], 'Nintendo EPD', 'Nintendo', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/scl0py.webp']),
('Baldurs Gate 3', 'A story-rich, party-based RPG set in the universe of Dungeons & Dragons.', '2023-08-03', 9.7, 96, ARRAY['PC', 'PlayStation'], ARRAY['RPG', 'Strategy'], 'Larian Studios', 'Larian Studios', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/scmpnr.webp']),
('Horizon Zero Dawn', 'Action role-playing game in a post-apocalyptic world.', '2017-02-28', 8.9, 89, ARRAY['PC', 'PlayStation'], ARRAY['Action', 'RPG', 'Adventure'], 'Guerrilla Games', 'Sony Interactive Entertainment', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/sckw8v.webp']),
('Sekiro: Shadows Die Twice', 'A third-person action-adventure game with RPG elements.', '2019-03-22', 9.0, 90, ARRAY['PC', 'PlayStation', 'Xbox'], ARRAY['Action', 'Adventure'], 'FromSoftware', 'Activision', 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rba.webp', ARRAY['https://images.igdb.com/igdb/image/upload/t_screenshot_big/scaidn.webp']);

-- Add more games as needed...

SELECT 'Database initialized with ' || COUNT(*) || ' games' as status FROM games;
