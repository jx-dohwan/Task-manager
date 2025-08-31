import {Injectable, NestMiddleware, Logger} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');
    
    use(req: Request, res: Response, next: NextFunction): void {
        const {ip, method, originalUrl} = req;
        const userAgent = req.get('user-agent') || '';
        const startTime = Date.now();

        // 요청 로깅
        this.logger.log(
            `📨 ${method} ${originalUrl} - ${ip} - ${userAgent}`
        );

        // 응답 완료시 로깅
        res.on('finish', () => {
            const {statusCode} = res;
            const responseTime = Date.now() - startTime;

            const logLevel = statusCode >= 400 ? 'error' : 'log';
            const emoji = statusCode >= 400 ? '❌' : '✅';

            this.logger[logLevel](
                `${emoji} ${method} ${statusCode} ${originalUrl} - ${responseTime}ms - ${ip}`
            );
        });

        next();
    }
}