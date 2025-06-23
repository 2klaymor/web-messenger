import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AvatarUploadConfig } from './upload/avatar-upload.config';


@Module({
  imports: [PrismaModule, MulterModule.registerAsync({
    useClass: AvatarUploadConfig
  })],
  controllers: [UsersController],
  providers: [UsersService, AvatarUploadConfig],
  exports: [UsersService]
})
export class UsersModule {}
