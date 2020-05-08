import {Injectable} from '@nestjs/common'
import * as config from 'config'

@Injectable()
export class ServerConfig {
  private serverConf: { host: string, name: string, port: string } = config.get('server')

  HOST: string = this.serverConf.host
  NAME: string = this.serverConf.name
  PORT = Number(this.serverConf.port)
}
