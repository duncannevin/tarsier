import {Injectable} from '@nestjs/common'
import * as config from 'config'

const serverConf: { host: string, name: string, port: string } = config.get('server')

@Injectable()
export class ServerConfig {
  HOST: string = serverConf.host
  NAME: string = serverConf.name
  PORT = Number(serverConf.port)
}
