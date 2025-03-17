import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

import { PrismaService } from '../prisma/prisma.service';
import { ContactUserEntity, UserEntity } from './user.entitiy';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Создание пользователя
  async create(name: string, password: string): Promise<UserEntity> {
    const passwordHash = await hash(password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        name: name,
        passwordHash: passwordHash
      },
      omit: {
        passwordHash: true
      }
    });

    return createdUser;
  }


  // Получение всех пользователей (если они есть, иначе null)
  async getAll(startFrom: number, limit:number): Promise<UserEntity[]> {
    const foundUsers = await this.prisma.user.findMany({
      skip: startFrom,  // С какого ID начать поиск, пропустив его
      take: limit,      // Сколько взять
      omit: {
        passwordHash: true
      },
      orderBy: {
        id: "asc"
      }
    });

    return foundUsers;
  }


  // Получение конкретного пользователя по АЙДИ (если он есть, иначе null)
  // Быстрее, чем поиск по уникальному имени, на клиенте стоит реализовать
  // единоразового поиска по имени необходимого(-ых) пользователя(-ей)
  // и работать с их ID
  async getById(id: number): Promise<UserEntity | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      omit: {
        passwordHash: true
      }
    });
    
    return foundUser;
  }


  // Получение конкретного пользователя по УНИКАЛЬНОМУ ИМЕНИ (если он есть, иначе null)
  async getByUsername(name: string): Promise<UserEntity | null> {
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
  async checkUsername(name: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        name: name
      }
    });

    return !!user;
  }


  // Проверка введенного пароля на соответствие паролю в базе данных
  async checkPassword(id: number, password: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
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
  async createdAt(id: number): Promise<Date | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
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
  async lastSeen(id: number): Promise<Date | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
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


  // --- КОНТАКТЫ ---
  // Получение контактов пользователя с указанным АЙДИ
  async getContacts(id: number) {
    const foundContacts = await this.prisma.userRelation.findMany({
      where: {
        userId: id
      },
      omit: {
        id: true,
        userId: true
      }
    });

    return foundContacts;
  }

  async getContactById(id: number, targetUserId: number) {
    const foundContact = await this.prisma.userRelation.findUnique({
      where: {
        userId_targetUserId: {
          userId: id,
          targetUserId: targetUserId
        }
      },
      omit: {
        id: true,
        userId: true
      }
    });

    return foundContact;
  }


  // Добавление пользователя в контакты (если такой пользователь существует, иначе null)
  async addUserToContacts(
    id: number, 
    targetUserId: number, 
    displayName: string | null
  ): Promise<ContactUserEntity | null> {
    if (+id === +targetUserId) {  // <-- Проверка на попытку добавить самого себя
      return null;
    }

    if (!! await this.getContactById(id, targetUserId)) {  // <-- Проверка на попытку добавить пользователя, который уже есть в контактах
      return null;
    }

    const addedUser = await this.prisma.userRelation.create({
      data: {
        userId: id,
        targetUserId: targetUserId,
        displayName: displayName,
      },
      omit: {
        id: true,
        userId: true
      }
    });

    return addedUser;
  }


  // Удаление пользователя из контактов
  async removeUserFromContacts(id: number, targetUserId: number) {
    if (+id === +targetUserId) {  // <-- Проверка на попытку удалить самого себя
      return null;
    }

    if (! await this.getContactById(id, targetUserId)) {  // <-- Проверка на попытку удалить пользователя, которого нет в контактах
      return null;
    }

    const removedUser = await this.prisma.userRelation.delete({
      where: {
        userId_targetUserId: {
          userId: id,
          targetUserId: targetUserId
        }
      },
      select: {
        target: {
          omit: {
            passwordHash: true
          }
        }
      }
    });

    return removedUser;
  }


  // // Блокировка пользователя
  // async blockUser(id: number, targetUserId: number) {
  //   const blockedUser = await this.prisma.userRelation.upsert({
  //     where: {
  //       userId_targetUserId: {
  //         userId: id,
  //         targetUserId: targetUserId
  //       }
  //     },
  //     create: {
  //       userId: id,
  //       targetUserId: targetUserId,
  //       isBlocked: true
  //     },
  //     update: {
  //       isBlocked: true
  //     },
  //     select: {
  //       target: {
  //         omit: {
  //           passwordHash: true
  //         }
  //       }
  //     }
  //   });

  //   return blockedUser;
  // }


  // Разблокировка пользователя
  // async unblockUser(id: number, targetUserId: number) {
  //   const userInContacts = await this.prisma.userRelation.findUnique({
  //     where: {
  //       userId_targetUserId: {
  //         userId: id,
  //         targetUserId: targetUserId
  //       }
  //     }
  //   });

  //   if (!userInContacts) {
      
  //   }

    // const unblockedUser = await this.prisma.userRelation.update({
    //   where: {
    //     userId: id,
    //     targetUserId: targetUserId
    //   },
    //   update: {
    //     isBlocked: false
    //   }
    // })
  // }
}
