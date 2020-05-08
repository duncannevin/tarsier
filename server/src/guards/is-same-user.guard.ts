import {CanActivate, ExecutionContext} from '@nestjs/common'
import {Observable} from 'rxjs'
import {User} from '../dto/user.dto'

export class IsSameUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const user: User = request.user as User
    const {id} = request.params
    return user.id === id
  }
}
