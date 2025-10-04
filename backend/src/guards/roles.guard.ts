import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserDocument } from '../schemas/user.schema';

/**
 * Roles Guard
 * Protects routes based on user roles (extensible for future role-based access)
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: UserDocument = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // For now, all authenticated users have access
    // This can be extended to check actual roles when implemented
    return true;
  }
}
