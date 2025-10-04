import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserDocument } from '../schemas/user.schema';

/**
 * Products Controller
 * Handles product CRUD operations endpoints
 */
@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Create a new product
   * @param createProductDto - Product data
   * @param user - Current user
   * @param res - Express response object
   */
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    const result = await this.productsService.createProduct(createProductDto, user);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Get all products for current user
   * @param queryDto - Query parameters
   * @param user - Current user
   * @param res - Express response object
   */
  @Get()
  @ApiOperation({ summary: 'Get all products for current user' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term' })
  @ApiQuery({ name: 'sortBy', required: false, type: String, description: 'Sort field' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], description: 'Sort order' })
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getUserProducts(
    @Query() queryDto: ProductQueryDto,
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    const result = await this.productsService.getUserProducts(queryDto, user);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Get product statistics for current user
   * @param user - Current user
   * @param res - Express response object
   */
  @Get('stats/overview')
  @ApiOperation({ summary: 'Get product statistics for current user' })
  @ApiResponse({
    status: 200,
    description: 'Product statistics retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getProductStats(
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    const result = await this.productsService.getProductStats(user);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Get a single product by ID
   * @param id - Product ID
   * @param user - Current user
   * @param res - Express response object
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product retrieved successfully',
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
  async getProduct(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    const result = await this.productsService.getProduct(id, user);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Update a product
   * @param id - Product ID
   * @param updateProductDto - Update data
   * @param user - Current user
   * @param res - Express response object
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
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
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    const result = await this.productsService.updateProduct(id, updateProductDto, user);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Delete a product
   * @param id - Product ID
   * @param user - Current user
   * @param res - Express response object
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
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
  async deleteProduct(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
    @Res() res: Response,
  ) {
    const result = await this.productsService.deleteProduct(id, user);
    return res.status(result.statusCode).json(result.response);
  }

}
