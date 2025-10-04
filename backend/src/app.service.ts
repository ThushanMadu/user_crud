import { Injectable } from '@nestjs/common';

/**
 * Application Service
 * Provides basic application services
 */
@Injectable()
export class AppService {
  /**
   * Get application information
   * @returns Application information
   */
  getAppInfo() {
    return {
      name: 'User CRUD API',
      version: '1.0.0',
      description: 'A comprehensive API for user management and product CRUD operations',
      features: [
        'User Authentication (JWT + Refresh Tokens)',
        'User Profile Management',
        'Product CRUD Operations',
        'File Upload with Image Processing',
        'Rate Limiting',
        'Security Headers',
        'Input Validation',
        'API Documentation',
      ],
    };
  }
}



