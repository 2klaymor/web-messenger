import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser'
import { join } from 'path';
import * as express from 'express';
import * as cors from 'cors';

import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/api/v1/avatars',
    cors({ origin: 'http://localhost:3000', credentials: true }),
    express.static(join(__dirname, '..', 'data', 'upload', 'avatars'))
  );

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const configService = app.get(ConfigService);

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
