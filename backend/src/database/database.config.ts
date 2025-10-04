import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

/**
 * Database configuration factory
 * Configures Mongoose with environment variables
 */
export const createDatabaseConfig = (configService: ConfigService): MongooseModuleOptions => ({
  uri: configService.get<string>('app.database.uri'),
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferCommands: false,
});
