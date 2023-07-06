import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const TUNNEL_FORWARD_PORT = configService.get<number>('TUNNEL_FORWARD_PORT');
  await app.listen(3000);
}
bootstrap();
