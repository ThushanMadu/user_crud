import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES, PAGINATION_CONSTANTS } from '../constants/app.constants';
import { createSuccessResponse, createPaginatedResponse } from '../utils/response.util';

/**
 * Products Service
 * Handles product CRUD operations and business logic
 */
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  /**
   * Create a new product
   * @param createProductDto - Product data
   * @param user - Current user
   * @returns Created product
   */
  async createProduct(
    createProductDto: CreateProductDto,
    user: UserDocument,
  ): Promise<{ response: any; statusCode: number }> {
    const product = new this.productModel({
      ...createProductDto,
      userId: user._id,
    });

    const savedProduct = await product.save();

    return {
      response: createSuccessResponse(
        savedProduct.getFormattedProduct(),
        SUCCESS_MESSAGES.PRODUCT_CREATED,
      ),
      statusCode: 201,
    };
  }

  /**
   * Get all products for a user with pagination and filtering
   * @param queryDto - Query parameters
   * @param user - Current user
   * @returns Paginated products list
   */
  async getUserProducts(
    queryDto: ProductQueryDto,
    user: UserDocument,
  ): Promise<{ response: any; statusCode: number }> {
    const {
      page = PAGINATION_CONSTANTS.DEFAULT_PAGE,
      limit = PAGINATION_CONSTANTS.DEFAULT_LIMIT,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = queryDto;

    const skip = (page - 1) * limit;

    // Build query conditions
    const query: any = {
      userId: user._id,
      isActive: true,
    };

    // Add search condition if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort options
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'ASC' ? 1 : -1;

    const [products, total] = await Promise.all([
      this.productModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.productModel.countDocuments(query).exec(),
    ]);

    const formattedProducts = products.map(product => product.getFormattedProduct());

    return {
      response: createPaginatedResponse(
        formattedProducts,
        page,
        limit,
        total,
        'Products retrieved successfully',
      ),
      statusCode: 200,
    };
  }

  /**
   * Get a single product by ID
   * @param productId - Product ID
   * @param user - Current user
   * @returns Product details
   */
  async getProduct(
    productId: string,
    user: UserDocument,
  ): Promise<{ response: any; statusCode: number }> {
    const product = await this.productModel.findOne({
      _id: productId,
      isActive: true,
    }).exec();

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // Check if user owns the product
    if (product.userId.toString() !== user._id.toString()) {
      throw new ForbiddenException(ERROR_MESSAGES.PRODUCT_ACCESS_DENIED);
    }

    return {
      response: createSuccessResponse(
        product.getFormattedProduct(),
        'Product retrieved successfully',
      ),
      statusCode: 200,
    };
  }

  /**
   * Update a product
   * @param productId - Product ID
   * @param updateProductDto - Update data
   * @param user - Current user
   * @returns Updated product
   */
  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
    user: UserDocument,
  ): Promise<{ response: any; statusCode: number }> {
    const product = await this.productModel.findOne({
      _id: productId,
      isActive: true,
    }).exec();

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // Check if user owns the product
    if (product.userId.toString() !== user._id.toString()) {
      throw new ForbiddenException(ERROR_MESSAGES.PRODUCT_ACCESS_DENIED);
    }

    // Update product fields
    Object.assign(product, updateProductDto);

    const updatedProduct = await product.save();

    return {
      response: createSuccessResponse(
        updatedProduct.getFormattedProduct(),
        SUCCESS_MESSAGES.PRODUCT_UPDATED,
      ),
      statusCode: 200,
    };
  }

  /**
   * Delete a product
   * @param productId - Product ID
   * @param user - Current user
   * @returns Success response
   */
  async deleteProduct(
    productId: string,
    user: UserDocument,
  ): Promise<{ response: any; statusCode: number }> {
    const product = await this.productModel.findOne({
      _id: productId,
      isActive: true,
    }).exec();

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    // Check if user owns the product
    if (product.userId.toString() !== user._id.toString()) {
      throw new ForbiddenException(ERROR_MESSAGES.PRODUCT_ACCESS_DENIED);
    }

    // Soft delete by setting isActive to false
    product.isActive = false;
    await product.save();

    return {
      response: createSuccessResponse(
        null,
        SUCCESS_MESSAGES.PRODUCT_DELETED,
      ),
      statusCode: 200,
    };
  }

  /**
   * Get product statistics for a user
   * @param user - Current user
   * @returns Product statistics
   */
  async getProductStats(user: UserDocument): Promise<{ response: any; statusCode: number }> {
    const [totalProducts, activeProducts] = await Promise.all([
      this.productModel.countDocuments({
        userId: user._id,
      }).exec(),
      this.productModel.countDocuments({
        userId: user._id,
        isActive: true,
      }).exec(),
    ]);

    const stats = {
      totalProducts,
      activeProducts,
      inactiveProducts: totalProducts - activeProducts,
    };

    return {
      response: createSuccessResponse(
        stats,
        'Product statistics retrieved successfully',
      ),
      statusCode: 200,
    };
  }
}
