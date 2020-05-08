import {Injectable} from '@nestjs/common'
import * as config from 'config'
import {MongoUsersConfig} from './mongo.users.config'

const mongoConfig: {
  port: string,
  username: string,
  password: string,
  users: any
} = config.get('mongo')

@Injectable()
export class MongoConfig {
  PORT = Number(mongoConfig.port)
  USERNAME: string = mongoConfig.username
  PASSWORD: string = mongoConfig.password
  USERS: MongoUsersConfig = new MongoUsersConfig(mongoConfig.users)
}
