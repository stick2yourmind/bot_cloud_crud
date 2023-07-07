import {
  Injectable,
  Inject,
  OnModuleInit,
  ServiceUnavailableException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from 'src/firebase/firebase.service';
import { EnvironmentVariables } from 'src/interface/env.interface';
import { CreateMessageDto, EditMessageDto } from 'src/message/dto';
import { TUNNEL_KEY_NAME } from 'src/tunnel/tunnel.config';
import { telegramApi } from 'src/utils/telegramApi.util';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService implements OnModuleInit {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(TUNNEL_KEY_NAME) private proxyUrl: string,
    private firebase: FirebaseService,
  ) {}
  async onModuleInit() {
    const bot = new Telegraf(this.configService.get('BOT_TOKEN'));
    await bot.createWebhook({
      domain: this.proxyUrl,
      path: '/bot',
    });
  }

  async createMessage(dto: CreateMessageDto) {
    try {
      const res = await this.firebase.createMessage(dto);
      return res;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async getAllMessages(chatId: string) {
    try {
      const messages = await this.firebase.getAllMessages();
      await telegramApi.reply({ chatId, text: JSON.stringify(messages) });
      return messages;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async getMessage(id: string) {
    try {
      const message = await this.firebase.getMessage(id);
      return message;
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }

  async deleteMessage(id: string) {
    try {
      const res = await this.firebase.deleteMessage(id);
      return res;
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }

  async updateMessage(id: string, dto: EditMessageDto) {
    try {
      const res = await this.firebase.updateMessage(id, dto);
      return res;
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }
}
