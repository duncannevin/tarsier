import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import { Observable } from 'rxjs';

@Injectable()
export class TempAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context.getHandler())
    return true;
  }
}
