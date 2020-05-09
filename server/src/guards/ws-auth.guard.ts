import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {JwtStrategy} from '../users/jwt.strategy'
import {WsException} from '@nestjs/websockets'
import {TarsierSocket} from '../socket/interface/TarsierSocket.interface'

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private readonly jwtStrategy: JwtStrategy
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: TarsierSocket = context.switchToWs().getClient<TarsierSocket>()
      client.user = await this.jwtStrategy.validateWS(client)
      return true
    } catch (e) {
      throw new WsException('')
    }
  }
}
