import { HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { telegramBaseUrl } from 'src/config/telegram.config';

export type replyProps = {
  chatId: string;
  text: string;
};

class TelegramApi {
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: telegramBaseUrl,
    });
  }

  async reply({ chatId, text }: replyProps) {
    try {
      await this.axiosInstance({
        method: 'get',
        url: 'sendMessage',
        params: {
          chat_id: chatId,
          text,
        },
      });
    } catch (error) {
      throw new HttpException('Reply message could not be sent to user', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}

export const telegramApi = new TelegramApi();
