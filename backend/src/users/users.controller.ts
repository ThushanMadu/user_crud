import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserDocument } from '../schemas/user.schema';

/**
 * Users Controller
 * Handles user profile management endpoints
 */
@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get current user profile
   * @param user - Current user from JWT
   * @param res - Express response object
   */
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getProfile(@CurrentUser() user: UserDocument, @Res() res: Response) {
    const result = await this.usersService.getUserProfile(user.id);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Update current user profile
   * @param user - Current user from JWT
   * @param updateUserDto - Update data
   * @param res - Express response object
   */
  @Put('me')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile updated successfully',
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
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
  })
  async updateProfile(
    @CurrentUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const result = await this.usersService.updateUserProfile(user.id, updateUserDto);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Delete current user account
   * @param user - Current user from JWT
   * @param res - Express response object
   */
  @Delete('me')
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({
    status: 200,
    description: 'User account deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async deleteAccount(@CurrentUser() user: UserDocument, @Res() res: Response) {
    const result = await this.usersService.deleteUserAccount(user.id);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Get user statistics
   * @param user - Current user from JWT
   * @param res - Express response object
   */
  @Get('me/stats')
  @ApiOperation({ summary: 'Get current user statistics' })
  @ApiResponse({
    status: 200,
    description: 'User statistics retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getStats(@CurrentUser() user: UserDocument, @Res() res: Response) {
    const result = await this.usersService.getUserStats(user.id);
    return res.status(result.statusCode).json(result.response);
  }
}
