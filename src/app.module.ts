import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TunnelModule } from './tunnel/tunnel.module';
import { BotService } from './bot/bot.service';
import { BotController } from './bot/bot.controller';
import { BotModule } from './bot/bot.module';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TunnelModule,
    BotModule,
    FirebaseModule,
    MessageModule,
  ],
  controllers: [AppController, BotController, MessageController],
  providers: [AppService, BotService, FirebaseService, MessageService],
})
export class AppModule {}
