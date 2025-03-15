import { Controller, Get, Post, Body, Patch, Put, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDisplayNameDto } from './dto/update-user-displayname.dto';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // CRUD Операции
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // Получение всех пользователей
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  // Получение конкретного пользователя по АЙДИ
  @Get('id/:id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(+id);
  }

  // Получение конкретного пользователя по ИМЕНИ
  @Get('name/:name')
  async findByUsername(@Param('name') name: string) {
    return await this.userService.findByUsername(name); 
  }

  // Обновление пользователя (целиком)
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return await this.userService.update(+id, updateUserDto);
  // }

  @Patch('id/:id/password')
  async updatePassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return await this.userService.updatePassword(+id, updateUserPasswordDto);
  }

  @Patch('id/:id/displayname')
  async updateDisplayName(@Param('id') id: string, @Body() updateUserDisplayNameDto: UpdateUserDisplayNameDto) {
    return await this.userService.updateDisplayName(+id, updateUserDisplayNameDto);
  }

  // Удаление пользователя
  @Delete('id/:id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  // Вспомогательные методы
  // Проверка существования пользователя по имени
  @Get('exists')
  async userExists(@Query('name') name: string) {
    return await this.userService.userExists(name);
  }

  // Проверка введенного пароля на соответствие паролю в базе данных
  @Get('name/:name/compare-password')
  async comparePassword(@Param('name') name: string, @Body() userDto: UserDto) {
    return await this.userService.comparePassword(name, userDto.password);
  }

  // Получение даты создания пользователя
  @Get('name/:name/created-at')
  async createdAt(@Param('name') name: string) {
    return await this.userService.createdAt(name);
  }
}
