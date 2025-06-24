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

@WebSocketGateway(
  3002, 
  { cors: { 
    origin: ['http://localhost:3000'],
    credentials: true,
  },
  namespace: '/'
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket сервер инициализирован.');
  }

  handleConnection(client: Socket) {
    console.log('Клиент подключился:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Клиент отключился:', client.id);
  }

  @UseGuards(WsJwtAccessGuard)
  @SubscribeMessage('join-chat')
  handleJoinChat(
    @ConnectedSocket() client: AuthenticatedSocket, 
    @MessageBody() chatId: number
  ) {
    const user = client.user;

    client.join(`chat-${chatId}`);

    console.log(`${user.name} joined chat-${chatId}`);
  }

  @UseGuards(WsJwtAccessGuard)
  @SubscribeMessage('send-message')
  async handleSendMessage(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { chatId: number; content: string }
  ) {
    const user = client.user;

    const message = 'test';

    // const message = await this.messagesService.create({
    //   chatId: data.chatId,
    //   content: data.content,
    //   senderName: user.name,
    // });

    this.server.to(`chat-${data.chatId}`).emit('new-message', message);
  }
}