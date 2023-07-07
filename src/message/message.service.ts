import { Injectable, ServiceUnavailableException, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateMessageDto, EditMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private firebase: FirebaseService) {}

  async createMessage(dto: CreateMessageDto) {
    try {
      const res = await this.firebase.createMessage(dto);
      return res;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async getAllMessages() {
    try {
      const messages = await this.firebase.getAllMessages();
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
