import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  // parametre des class validator car ca marchait pas
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}
bootstrap();
