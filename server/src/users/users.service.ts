import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

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
      },
      omit: {
        passwordHash: true
      }
    });

    return foundUser;
  }


  // Поиск пользователя по частичному имени
  async findUsersByQuery(query: string, currentUserName: string) {
    if (!query) {
      return [];
    }

    const normalizedQuery = `%${query.toLowerCase()}%`;

    return this.prisma.$queryRawUnsafe<
      Array<{ id: number; name: string; displayName: string | null, lastSeen: Date | null }>
    >(
      `
      SELECT id, name, displayName
      FROM users
      WHERE name != ? AND LOWER(name) LIKE ?
      ORDER BY name ASC
      `,
      currentUserName,
      normalizedQuery
    );
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
  async updatePassword(name: string, password: string) {
    const passwordHash = await hash(password, await genSalt());

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


  // Получение пользователя с паролем (ТОЛЬКО НА СТОРОНЕ СЕРВЕРА)
  async getUserPassword(name: string) {
    const foundUserPassword = await this.prisma.user.findUnique({
      where: {
        name: name
      },
      select: {
        passwordHash: true
      }
    });

    return foundUserPassword;
  }


  // Удаление пользователя
  async removeUser(name: string) {
    const removedUser = await this.prisma.user.delete({
      where: {
        name: name
      },
      omit: {
        passwordHash: true
      }
    });

    return removedUser;
  }
}