import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || '*',
  },
  cache: {
    forecast: process.env.CACHE_TTL || 3600, 
  },
  apiRequestTimeout: process.env.API_REQUEST_TIMEOUT || 5000, 
};

export default config;