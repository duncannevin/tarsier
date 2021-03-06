import {Injectable, Logger, Scope} from '@nestjs/common'
import * as fs from 'fs'
import {bindCallback} from 'rxjs'
import {TarsierLoggerImpl} from './tarsier.logger.impl'

@Injectable({scope: Scope.TRANSIENT})
export class TarsierLogger extends Logger implements TarsierLoggerImpl {
  private readonly logLocation = '/var/log/tarsier.log'

  error(message: string) {
    this.doLog(message)
      .subscribe(() => super.error(message, this.context))
  }

  warn(message: any): void {
    this.doLog(message)
      .subscribe(() => super.warn(message, this.context))
  }

  debug(message: any): void {
    this.doLog(message)
      .subscribe(() => super.debug(message, this.context))
  }

  private doLog(msg: any) {
    const writeFile = bindCallback(fs.appendFile)
    msg = `${new Date()} [${this.context}] ${msg}\r\n`
    return writeFile(this.logLocation, msg)
  }
}
