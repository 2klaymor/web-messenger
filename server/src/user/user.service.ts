import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

import { PrismaService } from '../prisma/prisma.service';
import { ContactUserEntity, UserEntity } from './user.entitiy';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // CRUD Операции
  // Создание пользователя
  async create(name: string, password: string): Promise<UserEntity> {
    const passwordHash = await hash(password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        name: name,
        passwordHash: passwordHash
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        createdAt: true,
        lastSeen: true
      }
    });

    return createdUser;
  }

  // Получение всех пользователей (если они есть, иначе null)
  async findAll(): Promise<UserEntity[] | null> {
    const foundUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        displayName: true,
        createdAt: true,
        lastSeen: true
      }
    });

    return foundUsers;
  }

  // Получение конкретного пользователя по АЙДИ (если он есть, иначе null)
  async findById(id: number): Promise<UserEntity | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        createdAt: true,
        lastSeen: true
      }
    });
    
    return foundUser;
  }

  // Получение конкретного пользователя по ИМЕНИ (если он есть, иначе null)
  async findByUsername(name: string): Promise<UserEntity | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        name: name
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        createdAt: true,
        lastSeen: true
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
  async updatePassword(id: number, password: string): Promise<Boolean> {
    const passwordHash = await hash(password, 10);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        passwordHash: passwordHash
      }
    });

    return !!updatedUser;
  }

  // Обновление ОТОБРАЖАЕМОГО ИМЕНИ пользователя
  async updateDisplayName(id: number, displayName: string): Promise<boolean> {
    const updatedUser = await this.prisma.user.update({
      where: {
        id: id
      },
      data: {
        displayName: displayName
      }
    });

    return !!updatedUser.displayName;
  }

  // Удаление пользователя
  async remove(id: number): Promise<boolean> {
    const removedUser = await this.prisma.user.delete({
      where: {
        id: id
      }
    });

    return !!removedUser;
  }

  // Всопомогательные операции
  // Проверка существования пользователя по имени / проверка того, не занято ли имя (для регистрации)
  async userExists(name: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        name: name
      }
    });

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

  // TODO: Поменять схему так, чтобы не нужно было каждый раз находить id пользователя,
  //       чтобы добавить его в контакты, потому что name для каждого пользователя уникален
  //       и его можно использовать для идентификации target-пользователя userRelation.

  // async targetUserIsRelated(targetUserName: string) {
  //   const targetUser = await this.findByUsername(targetUserName);

  //   if (!targetUser) {
  //     return null;
  //   }

  //   const relationExists = await this.prisma.userRelation.findUnique({})
  // }
  
  // Добавь ДРУГОГО пользователя в контакты
  // async addUserToContacts(id: number, targetUserName: string, displayName: string): Promise<ContactUserEntity | null> {
    // const relationExists = await this.prisma.userRelation.findUnique({
    //   where: {
    //     userId_targetUserId: {
    //       userId: id,
    //       targetUserId: targetUserId
    //     }
    //   },
    //   select: { id: true }
    // });

    // if (relationExists) {
    //   return null;
    // }

    // const addedUser = await this.prisma.userRelation.create({
    //   data: {
    //     userId: id,
    //     targetUserId: targetUserId,
    //     displayName: displayName
    //   },
    //   select: {
    //     targetUserId: true,
    //     displayName: true
    //   }
    // });

    // return addedUser;
  // }

  async removeUserFromContacts() {
    
  }

  async blockUser() {

  }

  async findContacts() {
    
  }
}
