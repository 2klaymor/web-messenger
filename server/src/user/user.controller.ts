import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CheckUserPasswordDto, UpdateUserDisplayNameDto, GetAllUsersDto } from './user.dto';


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
  async getAll(@Body() getAllUsersDto: GetAllUsersDto) {
    if (!getAllUsersDto.startFrom) getAllUsersDto.startFrom = 0;
    if (!getAllUsersDto.limit) getAllUsersDto.limit = 20;

    const foundUsers = await this.userService.getAll(
      getAllUsersDto.startFrom,
      getAllUsersDto.limit
    );

    return foundUsers;
  }


  // Получение конкретного пользователя по УНИКАЛЬНОМУ ИМЕНИ
  @Get()
  async getByUsername(@Query('name') name: string) {
    const foundUser = await this.userService.getByUsername(name); 

    return foundUser;
  }


  // Проверка на то, не занято ли УНИКАЛЬНОЕ ИМЯ
  @Get('check-username')
  async checkUsername(@Query('name') name: string) {
    const checkUsername = await this.userService.checkUsername(name);

    return checkUsername;
  }


  // Получение конкретного пользователя по АЙДИ
  @Get(':id')
  async getById(@Param('id') id: string) {
    const foundUser = await this.userService.getById(+id);

    return foundUser;
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
}
