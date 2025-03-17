import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query, Request } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto, CheckUserPasswordDto, UpdateUserDisplayNameDto, AddContactDto, RemoveContactDto } from './user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // Создание пользователя
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.create(
      createUserDto.name, 
      createUserDto.password
    );

    return createdUser;
  }

  // Получение всех пользователей ( С ПАГИНАЦИЕЙ ЧЕРЕЗ КУРСОР, 
  //                             необходимо хранить ID последнего
  //                           найденого пользователя, и передавать
  //                            его в в этот метод чтобы продолжать
  //                                <<листать>> пользователей )
  //    https://www.prisma.io/docs/orm/prisma-client/queries/pagination#cursor-based-pagination
  //
  @Get()
  async getAll(
    @Query('start-from') startFrom?: string,
    @Query('limit') limit?: string
  ) {

    console.log(`startFrom: ${startFrom},\nlimit: ${limit}`);
    console.log(startFrom ? +startFrom : 0);
    console.log(limit ? +limit : 20);

    const foundUsers = await this.userService.getAll(
      startFrom ? +startFrom : 0,
      limit ? +limit : 20
    );

    return foundUsers;
  }


  // // Получение конкретного пользователя по УНИКАЛЬНОМУ ИМЕНИ
  // @Get()
  // async getByUsername(@Query('name') name: string) {
  //   const foundUser = await this.userService.getByUsername(name); 

  //   return foundUser;
  // }


  // Проверка на то, не занято ли УНИКАЛЬНОЕ ИМЯ
  @Get('check-username/:name')
  async checkUsername(@Param('name') name: string) {
    const checkUsername = await this.userService.checkUsername(name);

    return checkUsername;
  }


  // Получение конкретного пользователя по АЙДИ или УНИКАЛЬНОМУ ИМЕНИ
  @Get(':id')
  async getByIdOrUsername(@Param('id') idOrUsername: string) {
    if (!isNaN(Number(idOrUsername))) {                         // <-- #FIXME такое надо менять и делать через pipe-ы/другие валидаторы параметров    
      return await this.userService.getById(+idOrUsername);     //            очень плохо, но пока работает.
    } else {
      return await this.userService.getByUsername(idOrUsername);
    }
  }


  // Проверка введенного ПАРОЛЯ на соответствие ПАРОЛЮ в базе данных
  @Get(':id/check-password')
  async checkPassword(
    @Param('id') id: string, 
    @Body() checkUserPasswordDto: CheckUserPasswordDto
  ) {
    const passwordIsRight = await this.userService.checkPassword(
      +id, 
      checkUserPasswordDto.password
    );

    return passwordIsRight;
  }


  // Получение ДАТЫ СОЗДАНИЯ пользователя
  @Get(':id/created-at')
  async createdAt(@Param('id') id: string) {
    const createdAt = await this.userService.createdAt(+id);

    return createdAt;
  }


  // Получение ДАТЫ ПОСЛЕДНЕГО ПОСЕЩЕНИЯ пользователя
  @Get(':id/last-seen')
  async lastSeen(@Param('id') id: string) {
    const lastSeen = await this.userService.lastSeen(+id);

    return lastSeen;
  }
  

  // Обновление ПАРОЛЯ пользователя
  @Patch(':id/password')
  async updatePassword(
    @Param('id') id: string, 
    @Body() checkUserPasswordDto: CheckUserPasswordDto
  ) {
    const passwordUpdated = await this.userService.updatePassword(
      +id, 
      checkUserPasswordDto.password
    );

    return passwordUpdated;
  }


  // Обновление ОТОБРАЖАЕМОГО ИМЕНИ
  @Patch(':id/display-name')
  async updateDisplayName(
    @Param('id') id: string, 
    @Body() updateUserdisplayNameDto: UpdateUserDisplayNameDto
  ) {
    const displayNameUpdated = await this.userService.updateDisplayName(
      +id, 
      updateUserdisplayNameDto.displayName
    );

    return displayNameUpdated;
  }


  // Удаление пользователя
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userRemoved = await this.userService.remove(+id);

    return userRemoved;
  }

  
  // --- КОНТАКТЫ
  // Получение контактов пользователя
  @Get(':id/contacts')
  async getContacts(@Param('id') id: string) {
    const contacts = await this.userService.getContacts(+id);

    return contacts;
  }

  // Добавление пользователя в контакты
  @Post(':id/contacts')
  async addUserToContacts(
    @Param('id') id: string, 
    @Body() addContactDto: AddContactDto
  ) {
    const addedUser = await this.userService.addUserToContacts(
      +id, 
      addContactDto.targetUserId,
      addContactDto.displayName
    );

    return addedUser;
  }

  // Удаление пользователя из контактов
  @Delete(':id/contacts')
  async removeUserFromContacts(
    @Param('id') id: string,
    @Body() removeContactDto: RemoveContactDto
  ) {
    const removedUser = await this.userService.removeUserFromContacts(
      +id,
      removeContactDto.targetUserId
    );

    return removedUser;
  }
}
