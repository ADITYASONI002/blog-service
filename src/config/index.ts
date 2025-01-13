import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  baseUrl: string;
  allowedOrigin: string;
  database: {
    port: number;
    host: string;
    username: string;
    password: string;
    name: string;
  };
  jwtSecretKey: string;
}

const config: Config = {
  port: parseInt(process.env.PORT as string) || 8001,
  baseUrl: '/api/v1/blog',
  allowedOrigin: process.env.ALLOWED_ORIGINS || 'https://blogsphere.com',
  database: {
    port: parseInt(process.env.DB_PORT as string) || 3306,
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    name: process.env.DB_NAME || 'BlogSphere',
  },
  jwtSecretKey: process.env.JWT_SECRET || 'SECURE_JWT_SECRET',
};

export default config;
