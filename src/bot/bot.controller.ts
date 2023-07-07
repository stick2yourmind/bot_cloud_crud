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
    console.log('🚀 ~ file: message.controller.ts:11 ~ Get');
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
    console.log('🚀 ~ file: bot.controller.ts:23 ~ BotController ~ id:', id);
    console.log('🚀 ~ file: bot.controller.ts:13 ~ GET ID');
    await telegramApi.reply({ chatId, text: text !== '' ? text : '.' });
    console.log('OK');
    return 'OK';
  }

  @Post('')
  async createMessage(@Req() req: Request, @Chat('chatId') chatId: string, @Chat('text') text: string) {
    console.log('🚀 ~ file: bot.controller.ts:13 ~ POST');
    await telegramApi.reply({ chatId, text: text !== '' ? text : '.' });
    console.log('OK');
    return 'OK';
  }

  @Put('')
  async updateMessage(@Req() req: Request, @Chat('chatId') chatId: string, @Chat('text') text: string) {
    console.log('🚀 ~ file: bot.controller.ts:13 ~ PUT');
    await telegramApi.reply({ chatId, text: text !== '' ? text : '.' });
    console.log('OK');
    return 'OK';
  }

  @Delete('')
  async deleteMessage(@Req() req: Request, @Chat('chatId') chatId: string, @Chat('text') text: string) {
    console.log('🚀 ~ file: bot.controller.ts:13 ~ Delete');
    await telegramApi.reply({ chatId, text: text !== '' ? text : '.' });
    console.log('OK');
    return 'OK';
  }
}
