import { MiddlewareConsumer, Module, NestModule, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { PostsModule } from './posts/posts.module';
import { EnhancedLoggerMiddleware } from './common/middleware/enhanced-logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { Post } from './posts/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역에서 사용 가능
      load: [databaseConfig, appConfig],
      envFilePath: '.env',
    }),  
    
    // TypeORM 비동기 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type:'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities:[Post],
        synchronize: configService.get<string>('app.nodeEnv') === 'development',
        logging: configService.get<string>('app.nodeEnv') === 'development',
      }),
      inject: [ConfigService],
    }),
    TasksModule, PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer:MiddlewareConsumer) {
    consumer
      .apply(EnhancedLoggerMiddleware)
      .forRoutes('*') // 모든 라우트에 적용
  }
}
