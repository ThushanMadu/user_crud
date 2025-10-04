import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

/**
 * Rate Limiting Middleware
 * Implements basic rate limiting to prevent abuse
 */
@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requestCounts = new Map<string, { count: number; resetTime: number }>();

  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const clientIp = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowMs = this.configService.get<number>('app.security.rateLimitTtl') * 1000;
    const maxRequests = this.configService.get<number>('app.security.rateLimitLimit');

    // Get or create client record
    let clientRecord = this.requestCounts.get(clientIp);
    if (!clientRecord) {
      clientRecord = { count: 0, resetTime: now + windowMs };
      this.requestCounts.set(clientIp, clientRecord);
    }

    // Reset counter if window has passed
    if (now > clientRecord.resetTime) {
      clientRecord.count = 0;
      clientRecord.resetTime = now + windowMs;
    }

    // Increment request count
    clientRecord.count++;

    // Check if limit exceeded
    if (clientRecord.count > maxRequests) {
      throw new HttpException(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - clientRecord.count));
    res.setHeader('X-RateLimit-Reset', new Date(clientRecord.resetTime).toISOString());

    next();
  }
}

