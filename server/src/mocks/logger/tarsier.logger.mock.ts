import {TarsierLoggerImpl} from '../../logger/tarsier.logger.impl'
import * as fs from 'fs'

class MockLogger {
  context: string

  setContext(context: string) {
    this.context = context
  }

  debug(msg: string) {
  }

  error(msg: string) {
  }

  warn(msg: string) {
  }
}

export class TarsierLoggerMock extends MockLogger implements TarsierLoggerImpl {
  private readonly logLocation = '/var/log/tarsier.log'

  debug(message: string): void {
    this.doLog()
      .then(() => (super.debug(message)))
  }

  error(message: string): void {
    this.doLog()
      .then(() => (super.error(message)))
  }

  warn(message: string): void {
    this.doLog()
      .then(() => (super.error(message)))
  }

  private doLog() {
    return new Promise((resolve) => {
      fs.appendFile(this.logLocation, '', resolve)
    })
  }
}
