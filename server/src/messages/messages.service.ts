import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  
  // Создание сообщения
  async create(chatId: number, content: string, senderName: string) {
    const createdMessage = await this.prisma.message.create({
      data: {
        chatId: chatId,
        content: content,
        senderName: senderName
      }
    });

    return createdMessage;
  }


  // Получение сообщений чата
  async getMessages(chatId: number) {
    const messages = await this.prisma.message.findMany({
      where: {
        chatId: chatId
      }
    });

    return messages;
  }
}
