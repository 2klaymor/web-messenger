import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, CheckUserPasswordDto, UpdateUserDisplayNameDto } from './users.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // Создание пользователя
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(
      createUserDto.name, 
      createUserDto.password
    );

    return createdUser;
  }


  // Получение конкретного пользователя по УНИКАЛЬНОМУ ИМЕНИ
  @Get(':name')
  async getByUsername(@Param('name') name: string) {
    return await this.usersService.getByUsername(name);
  }


  // Проверка существования пользователя / не занято ли имя
  @Get(':name/exists')
  async checkUserExistence(@Param('name') name: string) {
    const userExists = await this.usersService.checkUserExistence(name);

    return userExists;
  }


  // Проверка введенного ПАРОЛЯ на соответствие ПАРОЛЮ в базе данных
  @Get(':name/check-password')
  async checkPassword(
    @Param('name') name: string, 
    @Body() checkUserPasswordDto: CheckUserPasswordDto
  ) {
    const passwordIsRight = await this.usersService.checkPassword(
      name, 
      checkUserPasswordDto.password
    );

    return passwordIsRight;
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


  // Удаление пользователя
  @Delete(':name')
  async remove(@Param('name') name: string) {
    const userRemoved = await this.usersService.removeUser(name);

    return userRemoved;
  }

  
  // // --- КОНТАКТЫ
  // // Получение контактов пользователя
  // @Get(':id/contacts')
  // async getContacts(@Param('name') name: string) {
  //   const contacts = await this.usersService.getContacts(name);

  //   return contacts;
  // }

  // // Добавление пользователя в контакты
  // @Post(':id/contacts')
  // async addUserToContacts(
  //   @Param('id') id: string, 
  //   @Body() addContactDto: AddContactDto
  // ) {
  //   const addedUser = await this.usersService.addUserToContacts(
  //     +id, 
  //     addContactDto.targetUserId,
  //     addContactDto.displayName
  //   );

  //   return addedUser;
  // }

  // // Удаление пользователя из контактов
  // @Delete(':id/contacts')
  // async removeUserFromContacts(
  //   @Param('id') id: string,
  //   @Body() removeContactDto: RemoveContactDto
  // ) {
  //   const removedUser = await this.usersService.removeUserFromContacts(
  //     +id,
  //     removeContactDto.targetUserId
  //   );

  //   return removedUser;
  // }
}
