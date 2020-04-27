import { Module } from '@nestjs/common';
import { ServerConfig } from './server/server.config';

@Module({
  providers: [ServerConfig]
})
export class ConfigModule {}
