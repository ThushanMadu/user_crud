import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as path from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';

/**
 * Upload Controller
 * Handles file upload operations for products
 */
@ApiTags('Upload')
@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  /**
   * Upload product image
   * @param productId - Product ID
   * @param file - Uploaded file
   * @param user - Current user
   * @param res - Express response object
   */
  @Post(':id/upload')
  @ApiOperation({ summary: 'Upload product image' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Image uploaded successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid file type or size',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadProductImage(
    @Param('id') productId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    // Verify product exists and user has access
    const product = await this.productModel.findOne({
      _id: productId,
      userId: user._id,
      isActive: true,
    }).exec();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or access denied',
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const result = await this.uploadService.uploadProductImage(file, productId);

    // Update product with new image path
    if (result.response.success) {
      product.images.push(result.response.data.url);
      await product.save();
    }

    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Delete product image
   * @param productId - Product ID
   * @param filename - Image filename
   * @param user - Current user
   * @param res - Express response object
   */
  @Delete(':id/images/:filename')
  @ApiOperation({ summary: 'Delete product image' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiParam({ name: 'filename', description: 'Image filename' })
  @ApiResponse({
    status: 200,
    description: 'Image deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @ApiResponse({
    status: 404,
    description: 'Product or image not found',
  })
  async deleteProductImage(
    @Param('id') productId: string,
    @Param('filename') filename: string,
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    // Verify product exists and user has access
    const product = await this.productModel.findOne({
      _id: productId,
      userId: user._id,
      isActive: true,
    }).exec();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or access denied',
      });
    }

    // Validate filename to prevent path traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid filename',
      });
    }

    // Use path.join for secure path construction
    const filePath = path.join('uploads', 'products', productId, filename);
    const result = await this.uploadService.deleteFile(filePath);
    
    return res.status(result.statusCode).json(result.response);
  }
}
