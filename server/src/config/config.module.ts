import { Module } from '@nestjs/common';
import { ServerConfig } from './server/server.config';

@Module({
  providers: [ServerConfig],
  exports: [ServerConfig]
})
export class ConfigModule {}
