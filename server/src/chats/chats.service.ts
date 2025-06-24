import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  // async getChats(name: string) {
  //   const chats = await this.prisma.chat.findMany({
  //     where: {
  //       members: {
  //         some: {
  //           : name,
  //         },
  //       },
  //     },
  //   });
  // }
}
