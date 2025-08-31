import {registerAs} from '@nestjs/config';

export default registerAs('app', () => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT ?? '3000', 10),
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
}))