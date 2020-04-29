import {Module} from '@nestjs/common'
import {SocketModule} from './socket/socket.module'
import {LoggerModule} from './logger/logger.module'
import { ConfigModule } from './config/config.module';
import { EnvironmentModule } from './environment/environment.module';
import {EnvironmentService} from './environment/environment.service'

@Module({
  imports: [SocketModule, LoggerModule, ConfigModule, EnvironmentModule],
  controllers: [],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class AppModule {
}
