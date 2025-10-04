import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from './auth/decorators/public.decorator';

/**
 * Application Controller
 * Provides basic application endpoints
 */
@ApiTags('Application')
@Controller()
export class AppController {
  /**
   * Health check endpoint
   * @returns Application status
   */
  @Public()
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
  })
  getHealth() {
    return {
      success: true,
      message: 'Application is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
    };
  }

  /**
   * API information endpoint
   * @returns API information
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get API information' })
  @ApiResponse({
    status: 200,
    description: 'API information retrieved successfully',
  })
  getApiInfo() {
    return {
      success: true,
      message: 'User CRUD API',
      version: '1.0.0',
      description: 'A comprehensive API for user management and product CRUD operations',
      endpoints: {
        auth: '/api/v1/auth',
        users: '/api/v1/users',
        products: '/api/v1/products',
        upload: '/api/v1/products/:id/upload',
        docs: '/api/docs',
        health: '/health',
      },
    };
  }
}



