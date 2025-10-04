import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, UPLOAD_CONSTANTS } from '../constants/app.constants';
import { createSuccessResponse } from '../utils/response.util';
import { isValidImageType, isValidFileSize, generateUniqueFilename } from '../utils/validation.util';

/**
 * Upload Service
 * Handles file upload operations with image processing
 */
@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Process and save uploaded image
   * @param file - Uploaded file
   * @param productId - Product ID
   * @returns Upload result with file information
   */
  async uploadProductImage(
    file: Express.Multer.File,
    productId: string,
  ): Promise<{ response: any; statusCode: number }> {
    try {
      // Validate file type
      const allowedTypes = this.configService.get<string[]>('app.upload.allowedImageTypes');
      if (!isValidImageType(file.mimetype, allowedTypes)) {
        throw new BadRequestException(ERROR_MESSAGES.INVALID_FILE_TYPE);
      }

      // Validate file size
      const maxFileSize = this.configService.get<number>('app.upload.maxFileSize');
      if (!isValidFileSize(file.size, maxFileSize)) {
        throw new BadRequestException(ERROR_MESSAGES.FILE_TOO_LARGE);
      }

      // Create upload directory if it doesn't exist
      const uploadPath = this.configService.get<string>('app.upload.uploadPath');
      const productImagesDir = path.join(uploadPath, 'products', productId);
      
      if (!fs.existsSync(productImagesDir)) {
        fs.mkdirSync(productImagesDir, { recursive: true });
      }

      // Generate unique filename
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const uniqueFilename = `${uuidv4()}${fileExtension}`;
      const filePath = path.join(productImagesDir, uniqueFilename);

      // Process image with Sharp (resize, optimize)
      await sharp(file.buffer)
        .resize(800, 600, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 85 })
        .toFile(filePath);

      // Generate file URL
      const fileUrl = `/uploads/products/${productId}/${uniqueFilename}`;

      return {
        response: createSuccessResponse(
          {
            filename: uniqueFilename,
            originalName: file.originalname,
            size: file.size,
            url: fileUrl,
            path: filePath,
          },
          SUCCESS_MESSAGES.FILE_UPLOADED,
        ),
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(ERROR_MESSAGES.UPLOAD_FAILED);
    }
  }

  /**
   * Delete uploaded file
   * @param filePath - File path to delete
   * @returns Success response
   */
  async deleteFile(filePath: string): Promise<{ response: any; statusCode: number }> {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return {
        response: createSuccessResponse(
          null,
          'File deleted successfully',
        ),
        statusCode: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  /**
   * Get file information
   * @param filePath - File path
   * @returns File information
   */
  async getFileInfo(filePath: string): Promise<any> {
    try {
      if (!fs.existsSync(filePath)) {
        throw new BadRequestException(ERROR_MESSAGES.FILE_NOT_FOUND);
      }

      const stats = fs.statSync(filePath);
      return {
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        isFile: stats.isFile(),
      };
    } catch (error) {
      throw new BadRequestException(ERROR_MESSAGES.FILE_NOT_FOUND);
    }
  }

  /**
   * Clean up old files (utility method)
   * @param directory - Directory to clean
   * @param maxAge - Maximum age in days
   */
  async cleanupOldFiles(directory: string, maxAge: number = 30): Promise<void> {
    try {
      if (!fs.existsSync(directory)) {
        return;
      }

      const files = fs.readdirSync(directory);
      const now = Date.now();
      const maxAgeMs = maxAge * 24 * 60 * 60 * 1000;

      for (const file of files) {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        
        if (now - stats.mtime.getTime() > maxAgeMs) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (error) {
      // Log error but don't throw
      console.error('Error cleaning up old files:', error);
    }
  }
}
