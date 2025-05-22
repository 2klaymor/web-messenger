import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

import { JwtPayload } from 'src/common/types/jwt-payload';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: (req: Request) => req.cookies['refreshToken'],
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_REFRESH_SECRET'),
    })
  }

  validate(payload: JwtPayload) {
    const user = this.usersService.getByUsername(payload.name);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}