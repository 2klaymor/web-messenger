import { Module, forwardRef } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatsModule } from 'src/chats/chats.module';
import { ChatsService } from 'src/chats/chats.service';

@Module({
  imports: [
    PrismaModule,
    // если вам действительно нужен ChatsService внутри MessagesService,
    // иначе этот импорт можно убрать
    forwardRef(() => ChatsModule),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {
}
