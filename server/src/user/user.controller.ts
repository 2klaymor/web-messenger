import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserPasswordDto, UpdateUserDisplayNameDto } from './user.dto';


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

  // Получение всех пользователей
  @Get()
  async findAll() {
    const foundUsers = await this.userService.findAll();

    return foundUsers;
  }

  // Проверка существования пользователя по имени
  @Get('exists')
  async userExists(@Query('name') name: string) {
    const userExists = await this.userService.userExists(name);

    return userExists;
  }

  // Проверка введенного пароля на соответствие паролю в базе данных
  @Get('compare-password')
  async comparePassword(
    @Query('name') name: string, 
    @Body() userPasswordDto: UserPasswordDto
  ) {
    const passwordIsRight = await this.userService.comparePassword(name, userPasswordDto.password);

    return passwordIsRight;
  }

  // Получение даты создания пользователя
  @Get('created-at')
  async createdAt(@Query('name') name: string) {
    const createdAt = await this.userService.createdAt(name);

    return createdAt;
  }

  // Получение конкретного пользователя по ИМЕНИ
  @Get()
  async findByUsername(@Query('name') name: string) {
    const foundUser = await this.userService.findByUsername(name); 

    return foundUser;
  }

  // Получение конкретного пользователя по АЙДИ
  @Get(':id')
  async findById(@Param('id') id: string) {
    const foundUser = await this.userService.findById(+id);

    return foundUser;
  }

  // Обновление пароля пользователя
  @Patch(':id/password')
  async updatePassword(@Param('id') id: string, @Body() userPasswordDto: UserPasswordDto) {
    const passwordUpdated = await this.userService.updatePassword(+id, userPasswordDto.password);

    return passwordUpdated;
  }

  // Обновление отображаемого имени
  @Patch(':id/displayname')
  async updateDisplayName(@Param('id') id: string, @Body() updateUserDisplayNameDto: UpdateUserDisplayNameDto) {
    const displayNameUpdated = await this.userService.updateDisplayName(+id, updateUserDisplayNameDto.displayName);

    return displayNameUpdated;
  }

  // Удаление пользователя
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const userRemoved = await this.userService.remove(+id);

    return userRemoved;
  }
}
