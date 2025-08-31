import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';

interface LoggedRequest extends Request {
  requestId?: string;
}

@Injectable()
export class EnhancedLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: LoggedRequest, res: Response, next:NextFunction): void {
        const requestId = this.generateRequestId();
        req.requestId = requestId;

        const {ip, method, originalUrl} = req;
        const userAgent = req.get('user-agent') || '';
        const startTime = Date.now();

        // 요청 정보 로깅
        this.logger.log(
            `[${requestId}] 📨 ${method} ${originalUrl}`,
            {
                ip,
                userAgent,
                body: method === 'POST' || method === 'PUT' || method === 'PATCH'
                    ? this.sanitizeBody(req.body)
                    : undefined,
            }
        );

        res.on('finish', () => {
            const {statusCode} = res;
            const responseTime = Date.now() - startTime;

            const logLevel = statusCode >= 400 ? 'error' : 'log';
            const emoji = statusCode >= 400 ? '❌' : '✅';

            this.logger[logLevel](
                `[${requestId} ${emoji} ${method} ${statusCode} ${originalUrl} - ${responseTime}ms]`
            );
        });

        next();
    }

    private generateRequestId(): string {
        return randomUUID();
      }
    
      private sanitizeBody(body: any): any {
        if (!body || typeof body !== 'object') return body;
    
        const sanitized = Array.isArray(body) ? [...body] : { ...body };
    
        const sensitiveFields = ['password', 'token', 'secret', 'key'];
        for (const field of sensitiveFields) {
          if (Object.prototype.hasOwnProperty.call(sanitized, field)) {
            (sanitized as any)[field] = '***REDACTED***';
          }
        }
        return sanitized;
      }

}