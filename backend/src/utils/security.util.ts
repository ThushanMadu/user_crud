import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

/**
 * Security utility functions
 * Provides helper functions for password hashing, JWT operations, and security
 */

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password
 * @param rounds - Number of bcrypt rounds (default from config)
 * @returns Hashed password
 */
export async function hashPassword(password: string, rounds?: number): Promise<string> {
  const saltRounds = rounds || 12;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plain text password with a hashed password
 * @param password - Plain text password
 * @param hashedPassword - Hashed password
 * @returns True if passwords match
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generates a secure random token using crypto.randomBytes
 * @param length - Token length in bytes (default: 32)
 * @returns Random token string (base64 encoded)
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('base64url');
}

/**
 * Generates JWT access token
 * @param payload - Token payload
 * @param jwtService - JWT service instance
 * @param configService - Config service instance
 * @returns JWT access token
 */
export function generateAccessToken(
  payload: any,
  jwtService: JwtService,
  configService: ConfigService
): string {
  return jwtService.sign(payload, {
    secret: configService.get<string>('app.jwt.secret'),
    expiresIn: configService.get<string>('app.jwt.expiresIn'),
  });
}

/**
 * Generates JWT refresh token
 * @param payload - Token payload
 * @param jwtService - JWT service instance
 * @param configService - Config service instance
 * @returns JWT refresh token
 */
export function generateRefreshToken(
  payload: any,
  jwtService: JwtService,
  configService: ConfigService
): string {
  return jwtService.sign(payload, {
    secret: configService.get<string>('app.jwt.refreshSecret'),
    expiresIn: configService.get<string>('app.jwt.refreshExpiresIn'),
  });
}

/**
 * Verifies JWT token
 * @param token - JWT token to verify
 * @param jwtService - JWT service instance
 * @param configService - Config service instance
 * @param isRefreshToken - Whether this is a refresh token
 * @returns Decoded token payload or null if invalid
 */
export function verifyToken(
  token: string,
  jwtService: JwtService,
  configService: ConfigService,
  isRefreshToken: boolean = false
): any {
  try {
    const secret = isRefreshToken 
      ? configService.get<string>('app.jwt.refreshSecret')
      : configService.get<string>('app.jwt.secret');
    
    return jwtService.verify(token, { secret });
  } catch (error) {
    return null;
  }
}

/**
 * Sanitizes user data for public responses
 * @param user - User object
 * @returns Sanitized user object without sensitive data
 */
export function sanitizeUser(user: any): any {
  const { password, refreshTokens, ...sanitizedUser } = user;
  return sanitizedUser;
}

/**
 * Checks if password meets security requirements
 * @param password - Password to check
 * @returns Object with validation result and suggestions
 */
export function validatePasswordSecurity(password: string): {
  isValid: boolean;
  score: number;
  suggestions: string[];
} {
  const suggestions: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    suggestions.push('Use at least 8 characters');
  }

  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Include uppercase letters');
  }

  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Include lowercase letters');
  }

  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Include numbers');
  }

  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    suggestions.push('Include special characters');
  }

  return {
    isValid: score >= 3,
    score,
    suggestions,
  };
}

