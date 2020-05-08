import {Injectable} from '@nestjs/common'
import * as config from 'config'

const serverConf: { secret: string } = config.get('auth')

@Injectable()
export class AuthConfig {
  SECRET = serverConf.secret
}
