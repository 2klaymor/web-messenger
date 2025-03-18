import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { Response } from 'express';

import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}


  // Регистрация пользователя
  async register(res: Response, name: string, password: string) {
    const userExists = await this.usersService.checkUserExistence(name);

    if (userExists) {
      return null;
    }

    const createdUser = await this.usersService.createUser(
      name, 
      await hash(password, 10)
    );

    return await this.generateTokens(res, createdUser.name);
  }


  // --- ПРИВАТНЫЕ ---
  // Генерация токенов
  async generateTokens(res: Response,  name: string) {
    const accessToken = await this.jwtService.signAsync({ name }, {
      secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES'),
    });

    const refreshToken = await this.jwtService.signAsync({ name }, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES'),
    });
    
    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true
    });

    return accessToken;
  }
}
