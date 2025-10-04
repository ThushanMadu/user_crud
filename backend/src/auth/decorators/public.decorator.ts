import { SetMetadata } from '@nestjs/common';

/**
 * Public Decorator
 * Marks routes as public (no authentication required)
 */
export const Public = () => SetMetadata('isPublic', true);

