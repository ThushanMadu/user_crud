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

    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any) {
      const duration = Date.now() - startTime;
      const { statusCode } = res;
      
      // Log response
      if (statusCode >= 400) {
        this.logger.error(`${method} ${originalUrl} - ${statusCode} - ${duration}ms`);
      } else {
        this.logger.log(`${method} ${originalUrl} - ${statusCode} - ${duration}ms`);
      }
      
      originalEnd.call(this, chunk, encoding);
    }.bind(res);

    next();
  }
}

