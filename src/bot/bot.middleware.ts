import { HttpException, HttpStatus, NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BotMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const isCommand = req.body?.message?.entities?.some((entity) => entity.type === 'bot_command');
    if (!isCommand) throw new HttpException('Processed', HttpStatus.OK);
    const [command, ...textArr] = req.body?.message?.text.split(' ');
    const text = textArr.join(' ');
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
