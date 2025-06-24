import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ChatsService } from 'src/chats/chats.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService, 
    private readonly chatsService: ChatsService
  ) {}

  
  // Получение истории сообщений чата
  @UseGuards(JwtAccessGuard)
  @Get(':chatId')
  async getChatMessages(
    @Param('chatId') chatId: number,
    @CurrentUser('name') name: string
  ) {
    const userInChat = await this.chatsService.isChatMember(name, chatId);

    if (!userInChat) {
      return false;
    }

    const messages = await this.messagesService.getMessages(chatId);

    return messages;
  }
}
