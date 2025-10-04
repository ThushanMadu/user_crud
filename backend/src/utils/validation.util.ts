import { ValidationError } from 'class-validator';

/**
 * Validation utility functions
 * Provides helper functions for data validation and error handling
 */

/**
 * Formats validation errors into a readable format
 * @param errors - Array of validation errors
 * @returns Formatted error messages
 */
export function formatValidationErrors(errors: ValidationError[]): string[] {
  return errors.map(error => {
    const constraints = error.constraints;
    if (constraints) {
      return Object.values(constraints).join(', ');
    }
    return `${error.property} is invalid`;
  });
}

/**
 * Validates email format
 * @param email - Email to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Object with validation result and message
 */
export function validatePassword(password: string): { isValid: boolean; message?: string } {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password must be less than 128 characters' };
  }
  
  return { isValid: true };
}

/**
 * Sanitizes string input by trimming whitespace
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeString(input: string): string {
  return input.trim();
}

/**
 * Validates file type for image uploads
 * @param mimeType - MIME type of the file
 * @param allowedTypes - Array of allowed MIME types
 * @returns True if file type is allowed
 */
export function isValidImageType(mimeType: string, allowedTypes: string[]): boolean {
  return allowedTypes.includes(mimeType);
}

/**
 * Validates file size
 * @param size - File size in bytes
 * @param maxSize - Maximum allowed size in bytes
 * @returns True if file size is valid
 */
export function isValidFileSize(size: number, maxSize: number): boolean {
  return size <= maxSize;
}

/**
 * Generates a unique filename with timestamp
 * @param originalName - Original filename
 * @returns Unique filename
 */
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
}

