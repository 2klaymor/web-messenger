import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RouterModule.register([
      {
        path: 'api/v1',
        children: [AuthModule, ChatsModule, ContactsModule, MessagesModule, UsersModule]
      }
    ]),
    AuthModule,
    ChatsModule,
    ContactsModule,
    MessagesModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
