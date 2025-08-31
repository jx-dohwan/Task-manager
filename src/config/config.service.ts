import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.configService.get<string>('app.nodeEnv') === 'development';
  }

  get isProduction(): boolean {
    return this.configService.get<string>('app.nodeEnv') === 'production';
  }

  get jwtSecret(): string | undefined {
    return this.configService.get<string>('app.jwtSecret');
  }

  get databaseConfig() {
    return {
        host: this.configService.get<string>('database.host'),
        port: this.configService.get<number>('database.port'),
        database: this.configService.get<string>('database.database'),
    }
  }
}
