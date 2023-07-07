import { Injectable, ServiceUnavailableException, NotFoundException } from '@nestjs/common';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { cert } from 'firebase-admin/app';
import { serviceAccount } from 'src/config/firebase.config';
import { CreateMessageDto, EditMessageDto } from 'src/message/dto';

@Injectable()
export class FirebaseService {
  firestore: admin.firestore.Firestore;
  messageCollection: admin.firestore.CollectionReference<admin.firestore.DocumentData>;
  constructor() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: cert(JSON.parse(JSON.stringify(serviceAccount))),
      });

      this.firestore = getFirestore();
      this.messageCollection = this.firestore.collection('messages');
    }
  }

  async createMessage(dto: CreateMessageDto) {
    try {
      const res = await this.messageCollection.add(dto);

      return { id: res.id, ...dto };
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async getAllMessages() {
    try {
      const snapshot = await this.messageCollection.get();
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return messages;
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }

  async getMessage(id: string) {
    try {
      const doc = await this.messageCollection.doc(id).get();
      if (!doc.exists) throw new NotFoundException();
      return { id, ...doc.data() };
    } catch (error) {
      if (error instanceof NotFoundException) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }

  async deleteMessage(id: string) {
    try {
      await this.messageCollection.doc(id).delete({ exists: true });
      return { id };
    } catch (error) {
      if (error?.code === 5) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }

  async updateMessage(id: string, dto: EditMessageDto) {
    try {
      await this.messageCollection.doc(id).update({ message: dto.message });
      return { id, ...dto };
    } catch (error) {
      if (error?.code === 5) throw new NotFoundException();
      throw new ServiceUnavailableException();
    }
  }
}
