/**
 * Application constants
 * Centralized constants for the application
 */

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  // Authentication errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User with this email already exists',
  INVALID_TOKEN: 'Invalid or expired token',
  TOKEN_NOT_PROVIDED: 'Access token not provided',
  REFRESH_TOKEN_INVALID: 'Invalid or expired refresh token',
  
  // Validation errors
  VALIDATION_FAILED: 'Validation failed',
  INVALID_EMAIL: 'Invalid email format',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long',
  NAME_REQUIRED: 'Name is required',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  
  // Product errors
  PRODUCT_NOT_FOUND: 'Product not found',
  PRODUCT_ACCESS_DENIED: 'You do not have permission to access this product',
  PRODUCT_NAME_REQUIRED: 'Product name is required',
  PRODUCT_PRICE_INVALID: 'Product price must be a positive number',
  
  // File upload errors
  FILE_TOO_LARGE: 'File size exceeds maximum allowed size',
  INVALID_FILE_TYPE: 'Invalid file type. Only images are allowed',
  UPLOAD_FAILED: 'File upload failed',
  FILE_NOT_FOUND: 'File not found',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  USER_LOGGED_IN: 'User logged in successfully',
  USER_LOGGED_OUT: 'User logged out successfully',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  USER_UPDATED: 'User profile updated successfully',
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  FILE_UPLOADED: 'File uploaded successfully',
} as const;

// Database Constants
export const DB_CONSTANTS = {
  USER_TABLE: 'users',
  PRODUCT_TABLE: 'products',
  REFRESH_TOKEN_TABLE: 'refresh_tokens',
} as const;

// JWT Constants
export const JWT_CONSTANTS = {
  ACCESS_TOKEN_COOKIE_NAME: 'access_token',
  REFRESH_TOKEN_COOKIE_NAME: 'refresh_token',
  COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
} as const;

// File Upload Constants
export const UPLOAD_CONSTANTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  UPLOAD_DIR: 'uploads',
  PRODUCT_IMAGES_DIR: 'uploads/products',
} as const;

// Pagination Constants
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;



