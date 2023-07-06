import { ConfigService } from '@nestjs/config';
import ngrok from 'ngrok';
import { TUNNEL_KEY_NAME } from 'src/tunnel/tunnel.config';

export const tunnelProviders = [
  {
    inject: [ConfigService],
    provide: TUNNEL_KEY_NAME,
    useFactory: async (configService: ConfigService) => {
      const url = await ngrok.connect({
        authtoken: configService.get('TUNNEL_TOKEN'),
        addr: configService.get('TUNNEL_FORWARD_PORT'),
      });
      console.log('🚀 ~ file: tunnel.providers.ts:14 ~ useFactory: ~ url:', url);
      return url;
    },
  },
];
