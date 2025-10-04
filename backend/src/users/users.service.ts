import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../constants/app.constants';
import { createSuccessResponse } from '../utils/response.util';

/**
 * Users Service
 * Handles user profile management operations
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * Get user profile by ID
   * @param userId - User ID
   * @returns User profile
   */
  async getUserProfile(userId: string): Promise<{ response: any; statusCode: number }> {
    const user = await this.userModel.findOne({
      _id: userId,
      isActive: true,
    }).exec();

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    return {
      response: createSuccessResponse(
        user.getProfile(),
        'User profile retrieved successfully',
      ),
      statusCode: 200,
    };
  }

  /**
   * Update user profile
   * @param userId - User ID
   * @param updateUserDto - Update data
   * @returns Updated user profile
   */
  async updateUserProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ response: any; statusCode: number }> {
    const user = await this.userModel.findOne({
      _id: userId,
      isActive: true,
    }).exec();

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Check if email is being changed and if it already exists
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userModel.findOne({
        email: updateUserDto.email,
      }).exec();

      if (existingUser) {
        throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      }
    }

    // Update user fields
    Object.assign(user, updateUserDto);

    const updatedUser = await user.save();

    return {
      response: createSuccessResponse(
        updatedUser.getProfile(),
        SUCCESS_MESSAGES.USER_UPDATED,
      ),
      statusCode: 200,
    };
  }

  /**
   * Delete user account (soft delete)
   * @param userId - User ID
   * @returns Success response
   */
  async deleteUserAccount(userId: string): Promise<{ response: any; statusCode: number }> {
    const user = await this.userModel.findOne({
      _id: userId,
      isActive: true,
    }).exec();

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Soft delete by setting isActive to false
    user.isActive = false;
    await user.save();

    return {
      response: createSuccessResponse(
        null,
        'User account deleted successfully',
      ),
      statusCode: 200,
    };
  }

  /**
   * Get user statistics
   * @param userId - User ID
   * @returns User statistics
   */
  async getUserStats(userId: string): Promise<{ response: any; statusCode: number }> {
    const user = await this.userModel.findOne({
      _id: userId,
      isActive: true,
    }).exec();

    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Get product counts separately since we don't have a direct relationship
    const { Product, ProductSchema } = await import('../schemas/product.schema');
    const productModel = this.userModel.db.model('Product', ProductSchema);
    
    const [totalProducts, activeProducts] = await Promise.all([
      productModel.countDocuments({ userId: user._id }).exec(),
      productModel.countDocuments({ userId: user._id, isActive: true }).exec(),
    ]);

    const stats = {
      totalProducts,
      activeProducts,
      memberSince: user.createdAt,
      lastUpdated: user.updatedAt,
    };

    return {
      response: createSuccessResponse(
        stats,
        'User statistics retrieved successfully',
      ),
      statusCode: 200,
    };
  }
}
