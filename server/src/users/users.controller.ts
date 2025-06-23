import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';

import { UsersService } from './users.service';
import { CheckUserPasswordDto, UpdateUserDisplayNameDto } from './users.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // Получение конкретного пользователя по УНИКАЛЬНОМУ ИМЕНИ
  @Get(':name')
  async getByUsername(@Param('name') name: string) {
    return await this.usersService.getByUsername(name);
  }


  // Получение ДАТЫ ПОСЛЕДНЕГО ПОСЕЩЕНИЯ пользователя
  @Get(':name/last-seen')
  async lastSeen(@Param('name') name: string) {
    const lastSeen = await this.usersService.lastSeen(name);

    return lastSeen;
  }


  // Получение пользователей по запросу
  @UseGuards(JwtAccessGuard)
  @Get('search')
  async findUsersByQuery(@Query('query') query: string, @CurrentUser('name') currentUserName: string) {
    const foundUsers = this.usersService.findUsersByQuery(query, currentUserName);

    return foundUsers;
  }
  

  // Обновление ПАРОЛЯ пользователя
  @UseGuards(JwtAccessGuard)
  @Patch('password')
  async updatePassword(
    @CurrentUser('name') name: string, 
    @Body() checkUserPasswordDto: CheckUserPasswordDto
  ) {
    const passwordUpdated = await this.usersService.updatePassword(
      name, 
      checkUserPasswordDto.password
    );

    return passwordUpdated;
  }


  // Обновление ОТОБРАЖАЕМОГО ИМЕНИ
  @UseGuards(JwtAccessGuard)
  @Patch('display-name')
  async updateDisplayName(
    @CurrentUser('name') name: string, 
    @Body() updateUserdisplayNameDto: UpdateUserDisplayNameDto
  ) {
    const displayNameUpdated = await this.usersService.updateDisplayName(
      name, 
      updateUserdisplayNameDto.displayName
    );

    return displayNameUpdated;
  }
}
