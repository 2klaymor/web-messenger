import { Controller, Post, Body, Res, UseGuards, Get} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from './auth.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalGuard } from './guards/local.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}
  

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


  // Получение информации о текущем пользователе
  @UseGuards(JwtAccessGuard)
  @Get('me')
  async me(@CurrentUser('name') name: string) {
    return this.usersService.getByUsername(name);
  }


  // Логин, генерирует токены если пользователь прошел аутентификацию,
  // иначе локальная стратегия сама кинет ошибку Unauthorized,
  // за аутентификацию отвечает стратегия а не AuthService.
  @UseGuards(LocalGuard)
  @Post('login')                                          // Тут с помощью специального декоратора можем вытащить user-а и его поля.
  async login(@Res({ passthrough: true }) res: Response,  @CurrentUser('name') name: string) {
    return await this.authService.generateTokens(res, name);
  }


  // Обновление access токена по refresh токену
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Res({ passthrough: true }) res: Response,  @CurrentUser('name') name: string) {
    return await this.authService.generateTokens(res, name);
  }
}
