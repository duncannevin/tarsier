import {Module} from '@nestjs/common'
import {ServerConfig} from './server/server.config'
import { MongoConfig } from './mongo/mongo.config';
import { AuthConfig } from './auth/auth.config';

@Module({
  providers: [ServerConfig, MongoConfig, AuthConfig],
  exports: [ServerConfig, MongoConfig, AuthConfig]
})
export class ConfigModule {
}
