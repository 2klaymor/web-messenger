import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

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

  async createChat(name: string, targetName: string) {
    const createdChat = await this.prisma.chat.create({
      data: {
        members: {
          create: [
            { userName: name },
            { userName: targetName },
          ]
        }
      }
    })
  }
}
