import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GLOBAL_PREFIX } from './core/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix
  app.setGlobalPrefix(GLOBAL_PREFIX);
  // handle all inputValidation Globally
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
