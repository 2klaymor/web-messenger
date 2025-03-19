import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'name'  // Поле в теле запроса, которое будет приходить на /login,
                             // использую name а не стандартное username, чтобы сохранить
                             // идентичность с полями в БД
    })
  }

  async validate(name: string, password: string) {
    const user = await this.authService.validateUser(name, password);

    if (!user) {  // Кидаем ошибку здесь, а не в AuthService, потому что мы будем вешать Guard
                  // на контроллеры вне модуля Auth, чтобы не импортировать его везде.
      throw new UnauthorizedException('Неправильный логин или пароль');
    }

    return user;
  }
}