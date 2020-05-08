import {Module} from '@nestjs/common'
import {ServerConfig} from './server/server.config'
import { MongoConfig } from './mongo/mongo.config';

@Module({
  providers: [ServerConfig, MongoConfig],
  exports: [ServerConfig, MongoConfig]
})
export class ConfigModule {
}
