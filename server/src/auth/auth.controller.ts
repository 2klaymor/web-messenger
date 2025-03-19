import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/user.decorator';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  // Регистрация
  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response, // <-- passthrough нужен Nest-у в работе с response-обьектом, без него
    @Body() registerUserDto: RegisterUserDto   // мы просто заберем этот response в жизненном цикле response-request,
  ) {                                          // а так мы возьмем "на время" response и вернем обратно всей абстракции Nest-а
    return await this.authService.register(
      res, 
      registerUserDto.name, 
      registerUserDto.password
    );
  }


  // Логин, генерирует токены если пользователь прошел аутентификацию,
  // иначе локальная стратегия сама кинет ошибку Unauthorized,
  // за аутентификацию отвечает стратегия а не AuthService.
  @UseGuards(AuthGuard('local'))
  @Post('login')                                          // Тут с помощью специального декоратора можем вытащить user-а и его поля.
  async login(@Res({ passthrough: true }) res: Response,  @CurrentUser('name') name: string) {
    return await this.authService.generateTokens(res, name);
  }
}
