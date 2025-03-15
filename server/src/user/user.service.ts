import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

import { Prisma, User } from '@prisma/client';
import { hash, compare } from 'bcryptjs';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDisplayNameDto } from './dto/update-user-displayname.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // CRUD Операции
  // Создание пользователя
  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await hash(createUserDto.password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        passwordHash: passwordHash
      }
    });

    return createdUser;
  }

  // Получение всех пользователей (если они есть, иначе null)
  async findAll(): Promise<User[] | null> {
    const foundUsers = await this.prisma.user.findMany();

    return foundUsers;
  }

  // Получение конкретного пользователя по АЙДИ (если он есть, иначе null)
  async findById(id: number): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    });
    
    return foundUser;
  }

  // Получение конкретного пользователя по ИМЕНИ (если он есть, иначе null)
  async findByUsername(name: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        name: name
      }
    });

    return foundUser;
  }

  // Обновление пользователя (целиком)
  // СУПЕР ОСТОРОЖНО С ЭТИМ !!! ОПАСНО
  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   const updateData: any = {};

  //   updateData.displayName = updateUserDto.name ?? null;
  //   updateData.passwordHash = updateUserDto.password ? await hash(updateUserDto.password, 10) : Prisma.skip;

  //   const updatedUser = await this.prisma.user.update({
  //     where: {
  //       id: id
  //     },
  //     data: updateData
  //   });

  //   return updatedUser;
  // }

  // Обновление ПАРОЛЯ пользователя
  async updatePassword(id: number, updateUserPasswordDto: UpdateUserPasswordDto): Promise<User | null> {
    const passwordHash = await hash(updateUserPasswordDto.password, 10);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        passwordHash: passwordHash
      }
    });

    return updatedUser;
  }

  // Обновление ОТОБРАЖАЕМОГО ИМЕНИ пользователя
  async updateDisplayName(id: number, updateUserDisplayNameDto: UpdateUserDisplayNameDto): Promise<User | null> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        displayName: updateUserDisplayNameDto.displayName
      }
    });

    return updatedUser;
  }

  // Удаление пользователя
  async remove(id: number): Promise<User | null> {
    const deletedUser = await this.prisma.user.delete({
      where: {
        id: id
      }
    });

    return deletedUser;
  }

  // Всопомогательные операции
  // Проверка существования пользователя по имени / проверка того, не занято ли имя (для регистрации)
  async userExists(name: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        name: name
      }
    })

    return !!user;
  }

  // Проверка введенного пароля на соответствие паролю в базе данных
  async comparePassword(name: string, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        name: name
      },
      select: {
        passwordHash: true
      }
    });
    
    if (!user) {
      return false;
    }

    return await compare(password, user.passwordHash);
  }
  
  // Получение даты создания пользователя
  async createdAt(name: string): Promise<Date | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        name: name
      },
      select: {
        createdAt: true
      }
    })

    if (!user) {
      return null;
    }

    return user.createdAt;
  }
}
