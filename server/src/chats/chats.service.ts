import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  
  // Получение чатов текущего пользователя
  async getChats(name: string) {
    const chats = await this.prisma.chat.findMany({
      where: {
        members: {
          some: {
            userName: name,
          },
        }
      },
      include: {
        members: {
          include: {
            user: true
          }
        },
        messages: {
          orderBy: { id: 'desc' },
          take: 1
        }
      },
    });

    return chats;
  }

  // Создание чата с конкретным пользователем (если он существует уже, возвращает чат)
  async createChat(name: string, targetName: string) {
    const chatExists = await this.prisma.chat.findFirst({
      where: {
        members: {
          every: {
            userName: {
              in: [name, targetName]
            }
          }
        }
      }
    });

    if (chatExists) {
      return chatExists;
    }

    const createdChat = await this.prisma.chat.create({
      data: {
        members: {
          create: [
            { userName: name },
            { userName: targetName },
          ]
        }
      }
    });

    return createdChat;
  }


  // Удаление чата по именам пользователей
  async removeChat(name: string, targetName: string) {
    const chatForDeletion = await this.prisma.chat.findFirst({
      where: {
        members: {
          every: {
            userName: {
              in: [name, targetName]
            }
          }
        }
      },
      select: {
        id: true
      }
    });

    if (!chatForDeletion) {
      return false;
    }

    const deletedChat = await this.prisma.chat.delete({
      where: {
        id: chatForDeletion.id
      }
    });
  }


  // Проверка принадлежности пользователя к чату
  async isChatMember(name: string, chatId: number) {
    const member = await this.prisma.chatUser.findUnique({
      where: {
        userChat: {
          chatId: chatId,
          userName: name,
        },
      },
    });
  
    return !!member;
  }
}
