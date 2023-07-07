import { TunnelModule } from 'src/tunnel/tunnel.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BotMiddleware } from './bot.middleware';

@Module({
  imports: [TunnelModule],
})
export class BotModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotMiddleware).forRoutes('*');
  }
}
