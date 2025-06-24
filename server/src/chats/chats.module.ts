import {Module, forwardRef} from '@nestjs/common';
import {PrismaModule} from 'src/prisma/prisma.module';
import {MessagesModule} from 'src/messages/messages.module';

import {ChatsGateway} from './chats.gateway';
import {ChatsService} from './chats.service';
import {ChatsController} from './chats.controller';

@Module({
    imports: [
        PrismaModule,
        forwardRef(() => MessagesModule),      // ← импортируем MessagesModule
    ],
    providers: [ChatsService, ChatsGateway],
    controllers: [ChatsController],
    exports: [ChatsService],                // (опционально, если MessagesService его инжектит)
})
export class ChatsModule {
}