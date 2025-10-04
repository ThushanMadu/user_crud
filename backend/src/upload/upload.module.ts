import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { Product, ProductSchema } from '../schemas/product.schema';

/**
 * Upload Module
 * Provides file upload functionality with Multer
 */
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        limits: {
          fileSize: configService.get<number>('app.upload.maxFileSize'),
        },
        fileFilter: (req, file, callback) => {
          const allowedTypes = configService.get<string[]>('app.upload.allowedImageTypes');
          if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
          } else {
            callback(new Error('Invalid file type'), false);
          }
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
