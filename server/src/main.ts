import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser'
import { join } from 'path';
import * as express from 'express';

import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/avatars', express.static(join(__dirname, '..', 'data', 'uploads', 'avatars')));

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const configService = app.get(ConfigService);

  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
