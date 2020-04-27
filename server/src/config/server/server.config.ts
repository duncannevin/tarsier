import { Injectable } from '@nestjs/common';
import {ServerConfigImpl} from './server.config.impl'
import * as config from 'config'

@Injectable()
export class ServerConfig implements ServerConfigImpl {
  private serverConf = config.get('server')

  HOST: string = this.serverConf.host
  NAME: string = this.serverConf.name
  PORT: number = Number(this.serverConf.port)
}
