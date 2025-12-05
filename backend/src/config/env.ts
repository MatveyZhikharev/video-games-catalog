import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    url: process.env.DATABASE_URL,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'gamecatalog',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
  },
  
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
  
  ai: {
    apiKey: process.env.AI_API_KEY,
    apiUrl: process.env.AI_API_URL || 'https://api.openai.com/v1',
  },
};
