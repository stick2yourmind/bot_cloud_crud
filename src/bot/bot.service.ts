import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/interface/env.interface';
import { TUNNEL_KEY_NAME } from 'src/tunnel/tunnel.config';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService implements OnModuleInit {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(TUNNEL_KEY_NAME) private proxyUrl: string,
  ) {
    console.log('🚀 ~ file: bot.service.ts:7 ~ BotService ~ constructor ~ proxyUrl:', proxyUrl);
  }
  async onModuleInit() {
    const bot = new Telegraf(this.configService.get('BOT_TOKEN'));
    await bot.createWebhook({
      domain: this.proxyUrl,
      path: '/bot',
    });
  }
}
