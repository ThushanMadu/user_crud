import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto, RefreshResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User, UserDocument } from '../schemas/user.schema';
import { JWT_CONSTANTS } from '../constants/app.constants';

/**
 * Authentication Controller
 * Handles authentication endpoints
 */
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user
   * @param registerDto - Registration data
   * @param res - Express response object
   */
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(registerDto);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Login user
   * @param loginDto - Login data
   * @param res - Express response object
   */
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Refresh access token
   * @param req - Express request object
   * @param res - Express response object
   */
  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: RefreshResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token',
  })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.[JWT_CONSTANTS.REFRESH_TOKEN_COOKIE_NAME];
    const result = await this.authService.refresh(refreshToken);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Logout user
   * @param req - Express request object
   * @param res - Express response object
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User logged out successfully',
  })
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.[JWT_CONSTANTS.REFRESH_TOKEN_COOKIE_NAME];
    const result = await this.authService.logout(refreshToken);
    return res.status(result.statusCode).json(result.response);
  }

  /**
   * Get current user profile
   * @param user - Current user from JWT
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  async getProfile(@CurrentUser() user: UserDocument) {
    return {
      success: true,
      message: 'User profile retrieved successfully',
      data: user.getProfile(),
    };
  }
}

