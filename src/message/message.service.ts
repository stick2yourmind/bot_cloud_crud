import { Injectable, ServiceUnavailableException, NotFoundException } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateMessageDto, EditMessageDto } from './dto';

@Injectable()
export class MessageService {
  constructor(private firebase: FirebaseService) {}

  async createMessage(dto: CreateMessageDto) {
    try {
      const res = await this.firebase.messageCollection.add(dto);

      return { id: res.id, ...dto };
    } catch (error) {
      console.log('🚀 ~ file: message.service.ts:14 ~ MessageService ~ createMessage ~ error:', error);
      throw new ServiceUnavailableException();
    }
  }

  async getAllMessages() {
    try {
      const snapshot = await this.firebase.messageCollection.get();
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return messages;
    } catch (error) {
      console.log('🚀 ~ file: message.service.ts:23 ~ MessageService ~ getAllMessages ~ error:', error);
      throw new ServiceUnavailableException();
    }
  }

  async getMessage(id: string) {
    try {
      const doc = await this.firebase.messageCollection.doc(id).get();
      if (!doc.exists) throw new NotFoundException();

      return { id, ...doc.data() };
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }

  async deleteMessage(id: string) {
    try {
      await this.firebase.messageCollection.doc(id).delete({ exists: true });
      return { id };
    } catch (error) {
      if (error?.code === 5) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }

  async updateMessage(id: string, dto: EditMessageDto) {
    try {
      await this.firebase.messageCollection.doc(id).update({ message: dto.message });
      return { id, ...dto };
    } catch (error) {
      if (error?.code === 5) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }
}
