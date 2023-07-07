import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { cert } from 'firebase-admin/app';
import { serviceAccount } from 'src/config/firebase.config';

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
}
