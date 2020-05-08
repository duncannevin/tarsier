import {ExtractJwt, Strategy} from 'passport-jwt'
import {PassportStrategy} from '@nestjs/passport'
import {Injectable} from '@nestjs/common'
import {AuthConfig} from '../config/auth/auth.config'
import {TarsierLogger} from '../logger/tarsier.logger'
import {User} from '../dto/user.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authConfig: AuthConfig,
    private logger: TarsierLogger
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.SECRET
    })
    logger.setContext('JwtStrategy')
  }

  async validate(payload: any): Promise<User> {
    this.logger.log('Validate Payload: ', payload)
    return {
      id: payload.id,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName
    }
  }
}
