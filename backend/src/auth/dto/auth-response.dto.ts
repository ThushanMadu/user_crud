import { ApiProperty } from '@nestjs/swagger';

/**
 * Auth Response DTO
 * Response object for authentication endpoints
 */
export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'User profile information',
    type: 'object',
  })
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isActive: boolean;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

/**
 * Refresh Response DTO
 * Response object for token refresh endpoint
 */
export class RefreshResponseDto {
  @ApiProperty({
    description: 'New JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}

