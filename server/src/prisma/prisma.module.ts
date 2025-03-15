import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Экспортируем сервис, чтобы другие модули могли его использовать
})
export class PrismaModule {}