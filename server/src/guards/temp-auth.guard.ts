import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Observable} from 'rxjs'
import {TarsierLogger} from '../logger/tarsier.logger'

@Injectable()
export class TempAuthGuard implements CanActivate {
  constructor(
    private logger: TarsierLogger
  ) {
    logger.setContext('TempAutGuard')
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log(context.getHandler())
    return true
  }
}
