import { Controller, Get, Param, Delete, Post, Put, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto, EditMessageDto } from './dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('')
  getAllMessage() {
    console.log('🚀 ~ file: message.controller.ts:11 ~ Get');
    return this.messageService.getAllMessages();
  }
  @Get(':id')
  getMessage(@Param('id') messageId: string) {
    return this.messageService.getMessage(messageId);
  }

  @Post()
  createMessage(@Body() dto: CreateMessageDto) {
    console.log('🚀 ~ file: message.controller.ts:11 ~ Post');
    return this.messageService.createMessage(dto);
  }

  @Delete(':id')
  deleteMessage(@Param('id') messageId: string) {
    return this.messageService.deleteMessage(messageId);
  }

  @Put(':id')
  edit(@Body() dto: EditMessageDto, @Param('id') messageId: string) {
    return this.messageService.updateMessage(messageId, dto);
  }
}
