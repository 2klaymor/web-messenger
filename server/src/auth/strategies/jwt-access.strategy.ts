import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from 'src/common/types/jwt-payload';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
      private readonly configService: ConfigService,
      private readonly usersService: UsersService
    ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET'),
      })
    }

  async validate(payload: JwtPayload) {
      const user = await this.usersService.getByUsername(payload.name);
  
      if (!user) {
        throw new UnauthorizedException();
      }
  
      return user;
    }
}