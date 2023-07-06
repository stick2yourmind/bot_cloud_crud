import { Module } from '@nestjs/common';
import { tunnelProviders } from './tunnel.providers';

@Module({
  providers: [...tunnelProviders],
  exports: [...tunnelProviders],
})
export class TunnelModule {}
