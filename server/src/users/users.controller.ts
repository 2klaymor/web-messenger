import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFile} from '@nestjs/common';

import { UsersService } from './users.service';
import { UpdateUserBioDto, UpdateUserDisplayNameDto, UpdateUserPasswordDto } from './users.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';


@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService, 
    private configService: ConfigService
  ) {}

  
  // Получение пользователей по запросу
  @UseGuards(JwtAccessGuard)
  @Get('search')
  async findUsersByQuery(@Query('query') query: string, @CurrentUser('name') currentUserName: string) {
    const foundUsers = this.usersService.findUsersByQuery(query, currentUserName);

    return foundUsers;
  }


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
  @UseGuards(JwtAccessGuard)
  @Patch('password')
  async updatePassword(
    @CurrentUser('name') name: string, 
    @Body() updateUserPasswordDto: UpdateUserPasswordDto
  ) {
    const passwordUpdated = await this.usersService.updatePassword(
      name, 
      updateUserPasswordDto.oldPassword,
      updateUserPasswordDto.password
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


  // Обновление БИОГРАФИИ пользователя
  @UseGuards(JwtAccessGuard)
  @Patch('bio')
  async updateBio(
    @CurrentUser('name') name: string, 
    @Body() updateUserBioDto: UpdateUserBioDto
  ) {
    const bioUpdated = await this.usersService.updateBio(
      name, 
      updateUserBioDto.bio
    );

    return bioUpdated;
  }


  // Обновление аватара пользователя
  @UseGuards(JwtAccessGuard)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @CurrentUser('name') name: string, 
    @UploadedFile() file: Express.Multer.File
  ) {
    const avatarUpdated = await this.usersService.updateAvatar(name, file.filename);

    return avatarUpdated;
  }


  
  // Удаление пользователя
  @UseGuards(JwtAccessGuard)
  @Delete()
  async removeUser(
    @CurrentUser('name') name: string
  ) {
    const removedUser = await this.usersService.removeUser(name);

    return removedUser;
  }

}
