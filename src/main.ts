import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService: ConfigService = new ConfigService();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = configService.getOrThrow('PORT');
  await app.listen(port);
  logger.log(`Application listening on port: ${port}`);
}
bootstrap();
