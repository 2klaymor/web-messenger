import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatsModule } from 'src/chats/chats.module';
import { ChatsService } from 'src/chats/chats.service';

@Module({
  imports: [PrismaModule, ChatsModule],
  controllers: [MessagesController],
  providers: [MessagesService, ChatsService],
})
export class MessagesModule {}
