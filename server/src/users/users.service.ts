import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

// import { UserEntity } from './users.entity';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}


  // ПУБЛИЧНЫЕ
  // Получение конкретного пользователя по УНИКАЛЬНОМУ ИМЕНИ
  async getByUsername(name: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        name: name
      }
    });

    return foundUser;
  }


  // Получение даты последнего посещения пользователя
  async lastSeen(name: string) {
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
  async updatePassword(name: string, passwordHash: string) {
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
  async updateDisplayName(name: string, displayName: string) {
    const updatedUser = await this.prisma.user.update({
      where: {
        name: name
      },
      data: {
        displayName: displayName
      }
    });

    return !!updatedUser;
  }


  // Проверка существования пользователя по имени / проверка того, не занято ли УНИКАЛЬНОЕ ИМЯ (для регистрации)
  async checkUserExistence(name: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        name: name
      }
    });

    return !!user;
  }


  // --- ПРИВАТНЫЕ --- 
  // Создание пользователя
  async createUser(name: string, passwordHash: string) {
    const createdUser = await this.prisma.user.create({
      data: {
        name: name,
        passwordHash: passwordHash
      }
    });

    return createdUser;
  }


  // Удаление пользователя
  async removeUser(name: string) {
    const removedUser = await this.prisma.user.delete({
      where: {
        name: name
      }
    });

    return removedUser;
  }
}