import { HttpException, HttpStatus, NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BotMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const isCommand = req.body?.message?.entities?.some((entity) => entity.type === 'bot_command');
    console.log('🚀 ~ file: bot.middleware.ts:9 ~ BotMiddleware ~ use ~ req.body:', JSON.stringify(req.body));
    console.log('🚀 ~ file: bot.middleware.ts:10 ~ BotMiddleware ~ use ~ isCommand:', isCommand);
    if (!isCommand) throw new HttpException('Processed', HttpStatus.OK);
    const [command, ...textArr] = req.body?.message?.text.split(' ');
    const text = textArr.join(' ');
    console.log('🚀 ~ file: bot.middleware.ts:11 ~ BotMiddleware ~ use ~ req.method:', req.method);
    console.log('🚀 ~ file: bot.middleware.ts:11 ~ BotMiddleware ~ use ~ command:', command);
    console.log('🚀 ~ file: bot.middleware.ts:13 ~ BotMiddleware ~ use ~ text:', text);
    switch (command) {
      case '/get':
        req.method = 'GET';
        break;
      case '/post':
        req.method = 'POST';
        break;
      case '/put':
        req.method = 'PUT';
        break;
      case '/delete':
        req.method = 'DELETE';
        break;
      default:
        throw new HttpException('Commands available: /get /post /put /delete', HttpStatus.OK);
    }

    req.body.command = command;
    req.body.text = text;
    req.body.chatId = req.body.message.chat.id;

    next();
  }
}
