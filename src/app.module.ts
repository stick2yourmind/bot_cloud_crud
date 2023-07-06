import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TunnelModule } from './tunnel/tunnel.module';
import { BotService } from './bot/bot.service';
import { BotController } from './bot/bot.controller';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TunnelModule,
    BotModule,
  ],
  controllers: [AppController, BotController],
  providers: [AppService, BotService],
})
export class AppModule {}
