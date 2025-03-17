import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [UserModule, ChatModule, MessageModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [UserModule, ChatModule, MessageModule]
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
