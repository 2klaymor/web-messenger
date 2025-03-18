import { Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response, 
    @Body() registerUserDto: RegisterUserDto
  ) {
    return await this.authService.register(
      res, 
      registerUserDto.name, 
      registerUserDto.password
    );
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    
  }
}
