import { DynamicModule } from '@nestjs/common';
import {
  TypeOrmModule as OrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as path from 'path';
import { DataSourceOptions, DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
  initializeTransactionalContext,
  addTransactionalDataSource,
} from 'typeorm-transactional';
import { Post } from './posts/entities/post.entity';

export class TypeOrmModule {
  private static instance?: DynamicModule;

  static forRoot(): DynamicModule {
    if (!this.instance) {
      initializeTransactionalContext();

      this.instance = OrmModule.forRootAsync({
        useFactory: async (
        ): Promise<TypeOrmModuleOptions> => {

          const options: DataSourceOptions = {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: 'redis-practice',
            username: 'test',
            password: 'test',
            entities: [Post],
            namingStrategy: new SnakeNamingStrategy(),
            synchronize: true, // 테스트용 새로 다시 만들기 때문에 실제 서버에서는 사용하면 안됨
            logging: false,
          };

          return options;
        },
        async dataSourceFactory(options?: DataSourceOptions) {
          if (!options) throw new Error('Invalid options passed');

          return addTransactionalDataSource(new DataSource(options));
        },
      });
    }

    return this.instance;
  }
}