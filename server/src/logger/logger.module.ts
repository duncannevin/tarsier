import { Module } from '@nestjs/common';
import { TarsierLogger } from './tarsier.logger';

@Module({
  providers: [TarsierLogger],
  exports: [TarsierLogger],
})
export class LoggerModule {}
