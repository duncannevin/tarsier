import { TarsierLoggerMock } from './tarsier.logger.mock';
import {ModuleMetadata, Provider} from '@nestjs/common/interfaces'

export class LoggerModuleMock implements ModuleMetadata {
  providers: Provider[] = [TarsierLoggerMock]
  exports: Provider[] = [TarsierLoggerMock]
}
