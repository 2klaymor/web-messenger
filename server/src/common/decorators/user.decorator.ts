import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express'


// Получение текущего пользователя из Request-а, после успешной аутентификации с помощью Guard-а / стратегии
export const CurrentUser = createParamDecorator((key: keyof User | undefined, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();

  const user = req.user as User;

  return key ? user[key] : user;
});