import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Logging Middleware
 * Logs HTTP requests and responses for monitoring and debugging
 */
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const startTime = Date.now();

    // Log request
    this.logger.log(`${method} ${originalUrl} - ${ip} - ${userAgent}`);

    // Log response on finish event
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;

      if (statusCode >= 400) {
        this.logger.error(`${method} ${originalUrl} - ${statusCode} - ${duration}ms`);
      } else {
        this.logger.log(`${method} ${originalUrl} - ${statusCode} - ${duration}ms`);
      }
    });

    next();
  }
}

