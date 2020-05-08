import {Injectable} from '@nestjs/common'
import * as config from 'config'
import {MongoUsersConfig} from './mongo.users.config'

@Injectable()
export class MongoConfig {
  private mongoConfig: {
    port: string,
    username: string,
    password: string,
    users: any
  } = config.get('mongo')

  PORT = Number(this.mongoConfig.port)
  USERNAME: string = this.mongoConfig.username
  PASSWORD: string = this.mongoConfig.password
  USERS: MongoUsersConfig = new MongoUsersConfig(this.mongoConfig.users)
}
