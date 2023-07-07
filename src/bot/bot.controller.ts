import { BotService } from './bot.service';
import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Chat } from 'src/decorator/chat.decorator';
import { FirebaseService } from 'src/firebase/firebase.service';
import { telegramApi } from 'src/utils/telegramApi.util';

@Controller('bot')
export class BotController {
  constructor(private firebase: FirebaseService, private botService: BotService) {}
  @Get('')
  async getMessages(@Req() req: Request, @Chat('chatId') chatId: string, @Chat('text') text: string) {
    await this.botService.getAllMessages(chatId);
    return 'OK';
  }

  @Get(':id')
  async getMessage(
    @Param('id') id: string,
    @Req() req: Request,
    @Chat('chatId') chatId: string,
    @Chat('text') text: string,
  ) {
    await telegramApi.reply({ chatId, text: text !== '' ? text : '.' });
    return 'OK';
  }

  @Post('')
  async createMessage(@Req() req: Request, @Chat('chatId') chatId: string, @Chat('text') text: string) {
    await telegramApi.reply({ chatId, text: text !== '' ? text : '.' });
    return 'OK';
  }

  @Put('')
  async updateMessage(@Req() req: Request, @Chat('chatId') chatId: string, @Chat('text') text: string) {
    await telegramApi.reply({ chatId, text: text !== '' ? text : '.' });
    return 'OK';
  }

  @Delete('')
  async deleteMessage(@Req() req: Request, @Chat('chatId') chatId: string, @Chat('text') text: string) {
    await telegramApi.reply({ chatId, text: text !== '' ? text : '.' });
    return 'OK';
  }
}
