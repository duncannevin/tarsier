import {Injectable} from '@nestjs/common'
import * as config from 'config'

@Injectable()
export class AuthConfig {
  private serverConf: { secret: string } = config.get('auth')

  SECRET = this.serverConf.secret
}
