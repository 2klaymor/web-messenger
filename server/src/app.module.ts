import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, ChatsModule, MessagesModule, ContactsModule, AuthModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [UsersModule, ChatsModule, ContactsModule, MessagesModule]
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
