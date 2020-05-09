import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import {AuthConfig} from '../config/auth/auth.config'
import {TarsierLogger} from '../logger/tarsier.logger'
import {User} from '../dto/user.dto'
import {Socket} from 'socket.io'
import {WsException} from '@nestjs/websockets'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authConfig: AuthConfig,
    private logger: TarsierLogger,
    private readonly jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.SECRET
    })
    logger.setContext('JwtStrategy')
  }

  async validate(payload: any): Promise<User> {
    this.logger.log(`validate: ${JSON.stringify(payload)}`)
    return new User(payload)
  }

  async validateWS(client: Socket): Promise<User> {
    try {
      const authHeader: string = client.handshake.headers.authorization
      const authToken = authHeader.substring(7, authHeader.length)
      const jwtPayload: User = await this.jwtService.verifyAsync(authToken)
      return await this.validate(jwtPayload)
    } catch (e) {
      this.logger.error(`WS validation failed: ${e.message}`)
      throw new WsException(e.message)
    }
  }
}
