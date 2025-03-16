import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { AttachmentModule } from './attachment/attachment.module';
import { ContactModule } from './contact/contact.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [UserModule, ChatModule, MessageModule, AttachmentModule, ContactModule,
    RouterModule.register([
      {
        path: 'api/v1',
        children: [UserModule, ChatModule, MessageModule, AttachmentModule, ContactModule]
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
