/**
 * Image utility functions
 * Handles image URL formatting and validation
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Get the full image URL
 * @param imagePath - Relative or absolute image path
 * @returns Full image URL
 */
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path, prepend the API base URL
  return `${API_BASE_URL}${imagePath}`;
}

/**
 * Check if an image URL is valid
 * @param imagePath - Image path to validate
 * @returns True if the image path is valid
 */
export function isValidImageUrl(imagePath: string | null | undefined): boolean {
  return Boolean(imagePath && imagePath.trim() !== '');
}
