import {Injectable, NestMiddleware} from '@nestjs/common'
import {Request, Response} from 'express'
import {TarsierLogger} from '../logger/tarsier.logger'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private logger: TarsierLogger
  ) {
    logger.setContext('LoggerMiddleware')
  }

  use(req: Request, res: Response, next: Function) {
    this.logger.log(req.params)
    next()
  }
}
