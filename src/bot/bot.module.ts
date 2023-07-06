import { TunnelModule } from 'src/tunnel/tunnel.module';
import { Module } from '@nestjs/common';
// import { BotMiddleware } from './bot.middleware';

@Module({
  imports: [TunnelModule],
})
export class BotModule {}
