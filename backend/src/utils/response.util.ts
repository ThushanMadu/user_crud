import { HTTP_STATUS } from '../constants/app.constants';

/**
 * Standardized API response utility
 * Provides consistent response format across the application
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * Creates a successful API response
 * @param data - Response data
 * @param message - Success message
 * @param meta - Optional pagination metadata
 * @returns Standardized success response
 */
export function createSuccessResponse<T>(
  data: T,
  message: string = 'Success',
  meta?: ApiResponse<T>['meta']
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    ...(meta && { meta }),
  };
}

/**
 * Creates an error API response
 * @param message - Error message
 * @param errors - Optional validation errors
 * @param statusCode - HTTP status code
 * @returns Standardized error response
 */
export function createErrorResponse(
  message: string,
  errors?: any[],
  statusCode: number = HTTP_STATUS.BAD_REQUEST
): { response: ApiResponse; statusCode: number } {
  return {
    response: {
      success: false,
      message,
      ...(errors && { errors }),
    },
    statusCode,
  };
}

/**
 * Creates a paginated response
 * @param data - Response data
 * @param page - Current page
 * @param limit - Items per page
 * @param total - Total items
 * @param message - Success message
 * @returns Paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message: string = 'Success'
): ApiResponse<T[]> {
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    message,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}



