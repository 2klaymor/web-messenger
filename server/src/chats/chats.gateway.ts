import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { WsJwtAccessGuard } from '../auth/guards/ws-jwt-access.guard';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedSocket } from 'src/common/types/authenticated-socket';

// @WebSocketGateway({
//   cors: {
//     origin: ['http://localhost:3000'],
//     credentials: true,
//   }
// })
// export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;
//   private messagesService: MessagesService;
//   // private onlineUsers = new Map<string, string>();
//
//

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  }
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messagesService: MessagesService) {
  }

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket сервер инициализирован.');
  }


  // Обработка подключения сокета 
  // @UseGuards(WsJwtAccessGuard)
  handleConnection(client: Socket) {
    // const user = client.user

    // this.onlineUsers.set(user.name, client.id);

    console.log(`Клиент подключился: ${client.id}`);

    // this.notifyContactOnlineStatus(user.name, true);
  }


  // Обработка отключения сокета
  // @UseGuards(WsJwtAccessGuard)
  handleDisconnect(client: Socket) {
    // const disconnectedUser = [...this.onlineUsers.entries()]
    //   .find(([_, socketId]) => socketId === client.id);

    // if (disconnectedUser) {
    //   const [userName] = disconnectedUser;
    //   this.onlineUsers.delete(userName);
    console.log(`Клиент отключился: ${client.id}`);

      // Уведомить контактов о оффлайне
      // this.notifyContactOnlineStatus(userName, false);
    // }
  }


  // Обработка подключения к чату
  // @UseGuards(WsJwtAccessGuard)
  @SubscribeMessage('join-chat')
  handleJoinChat(
    @ConnectedSocket() client: Socket, 
    @MessageBody('chatId') chatId: number
  ) {

    // const user = client;

    // console.log(user);

    client.join(`chat-${chatId}`);

    console.log(`${client.id} присоединился к chat-${chatId}`);

    // console.log(`${client} присоединился к chat-${chatId}`);
  }


  // Обработка отправки сообщения
  // @UseGuards(WsJwtAccessGuard)
  @SubscribeMessage('send-message')
  async handleSendMessage(
      @ConnectedSocket() client: Socket,
      @MessageBody() data: { chatId: number; content: string, senderName: string }
  ) {
    console.log("📩 получено от клиента:", data); // ← добавь это

    const message = await this.messagesService.create(
        data.chatId,
        data.content,
        data.senderName
    );

    this.server.to(`chat-${data.chatId}`).emit('new-message', message);
  }


  // Получение текущих онлайн пользователей
  // @UseGuards(WsJwtAccessGuard)
  // @SubscribeMessage('get-online-users')
  // handleGetOnlineUsers() {}
  

  // Оповещение об изменении статуса контакта онлайн для всех пользователей
  // private notifyContactOnlineStatus(name: string, isOnline: boolean) {
  //   this.server.emit('user-status-changed', { name, isOnline });
  // }
}