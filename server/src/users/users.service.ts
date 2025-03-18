import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { UserEntity } from './users.entity';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}


  // ПУБЛИЧНЫЕ
  // Получение конкретного пользователя по УНИКАЛЬНОМУ ИМЕНИ
  async getByUsername(name: string): Promise<UserEntity | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        name: name
      },
      omit: {
        id: true,
        passwordHash: true
      }
    });

    return foundUser;
  }


  // Получение даты последнего посещения пользователя
  async lastSeen(name: string): Promise<Date | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        name: name
      },
      select: {
        lastSeen: true
      }
    });

    if (!user) {
      return null;
    }

    return user.lastSeen;
  }


  // Обновление ПАРОЛЯ пользователя
  async updatePassword(name: string, passwordHash: string): Promise<Boolean> {
    const updatedUser = await this.prisma.user.update({
      where: {
        name: name
      },
      data: {
        passwordHash: passwordHash
      }
    });

    return !!updatedUser;
  }


  // Обновление ОТОБРАЖАЕМОГО ИМЕНИ пользователя
  async updateDisplayName(name: string, displayName: string): Promise<boolean> {
    const updatedUser = await this.prisma.user.update({
      where: {
        name: name
      },
      data: {
        displayName: displayName
      }
    });

    return !!updatedUser.displayName;
  }


  // Проверка существования пользователя по имени / проверка того, не занято ли имя (для регистрации)
  async checkUserExistence(name: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        name: name
      }
    });

    return !!user;
  }


  // --- ПРИВАТНЫЕ --- 
  // Создание пользователя
  async createUser(name: string, passwordHash: string): Promise<UserEntity> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: name,
        passwordHash: passwordHash
      },
      omit: {
        id: true,
        passwordHash: true
      }
    });

    return createdUser;
  }


  // Удаление пользователя
  async removeUser(name: string): Promise<boolean> {
    const removedUser = await this.prisma.user.delete({
      where: {
        name: name
      }
    });

    return !!removedUser;
  }


  // Проверка введенного пароля на соответствие паролю в базе данных
  // async checkPassword(name: string, password: string): Promise<boolean> {
  //   const user = await this.prisma.user.findUnique({
  //     where: {
  //       name: name
  //     },
  //     select: {
  //       passwordHash: true
  //     }
  //   });
    
  //   if (!user) {
  //     return false;
  //   }

  //   return await compare(password, user.passwordHash);
  // }

}