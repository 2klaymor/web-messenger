import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CreateChatDto, RemoveChatDto } from './chats.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}


  // Получение чатов текущего пользователя
  @UseGuards(JwtAccessGuard)
  @Get()
  async getChats(@CurrentUser('name') name: string) {
    const chats = await this.chatsService.getChats(name);

    return chats;
  }


  // Создание чата
  @UseGuards(JwtAccessGuard)
  @Post()
  async createOrGetChat(
    @CurrentUser('name') name: string,
    @Body() createChatDto: CreateChatDto
  ) {
    const createdChat = await this.chatsService.createChat(name, createChatDto.targetName);
 
    return createdChat;
  }


  // Удаление чата
  @UseGuards(JwtAccessGuard)
  @Delete()
  async removeChat(
    @CurrentUser('name') name: string,
    @Body() removeChatDto: RemoveChatDto
  ) {
    const removedChat = await this.chatsService.removeChat(
      name,
      removeChatDto.targetName
    );

    return removedChat;
  }
}
