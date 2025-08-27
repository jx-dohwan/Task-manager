import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe를 전역으로 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO에 정의되지 않은 속성은 자동으로 제거
    forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 들어오면 에러 발생
    transform: true, // 요청 데이터를 DTO 타입으로 자동 변환
  }));

  await app.listen(3000);
}
bootstrap();
