import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  // @UseGuards(JwtAccessGuard)
  // @Get()
  // async getChats(@CurrentUser('name') name: string) {
  //   const chats = await this.chatsService.getChats(name);

  //   return chats;
  // }

  // @UseGuards(JwtAccessGuard)
  // @Post()
  // async createChat(
  //   @CurrentUser('name') name: string,
  //   @Body()
  // ) {
    
  // }
}
