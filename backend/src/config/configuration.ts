import { registerAs } from '@nestjs/config';

/**
 * Application configuration factory
 * Centralizes all environment variables and provides type safety
 */
export default registerAs('app', () => ({
  // Application settings
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/user_crud_db',
    host: process.env.MONGODB_HOST || 'localhost',
    port: parseInt(process.env.MONGODB_PORT, 10) || 27017,
    database: process.env.MONGODB_DATABASE || 'user_crud_db',
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  
  // Security configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 12,
    rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60,
    rateLimitLimit: parseInt(process.env.RATE_LIMIT_LIMIT, 10) || 100,
  },
  
  // File upload configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5MB
    uploadPath: process.env.UPLOAD_PATH || 'uploads',
    allowedImageTypes: process.env.ALLOWED_IMAGE_TYPES?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ],
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: process.env.CORS_CREDENTIALS === 'true' || true,
  },
}));
