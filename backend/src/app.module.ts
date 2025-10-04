import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Configuration
import configuration from './config/configuration';
import { createDatabaseConfig } from './database/database.config';

// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';

// Controllers and Services
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Middleware
import { LoggingMiddleware } from './middleware/logging.middleware';
import { SecurityMiddleware } from './middleware/security.middleware';

/**
 * Application Module
 * Main module that configures the entire application
 */
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: createDatabaseConfig,
      inject: [ConfigService],
    }),

    // Static file serving for uploads
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => [
        {
          rootPath: join(process.cwd(), configService.get<string>('app.upload.uploadPath')),
          serveRoot: '/uploads',
        },
      ],
      inject: [ConfigService],
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    ProductsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply middleware in order
    consumer
      .apply(SecurityMiddleware)
      .forRoutes('*');
    
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
