import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, CheckUserPasswordDto, UpdateUserDisplayNameDto } from './users.dto';


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
  

  // Обновление ПАРОЛЯ пользователя
  @Patch(':name/password')
  async updatePassword(
    @Param('name') name: string, 
    @Body() checkUserPasswordDto: CheckUserPasswordDto
  ) {
    const passwordUpdated = await this.usersService.updatePassword(
      name, 
      checkUserPasswordDto.password
    );

    return passwordUpdated;
  }


  // Обновление ОТОБРАЖАЕМОГО ИМЕНИ
  @Patch(':name/display-name')
  async updateDisplayName(
    @Param('name') name: string, 
    @Body() updateUserdisplayNameDto: UpdateUserDisplayNameDto
  ) {
    const displayNameUpdated = await this.usersService.updateDisplayName(
      name, 
      updateUserdisplayNameDto.displayName
    );

    return displayNameUpdated;
  }
}
