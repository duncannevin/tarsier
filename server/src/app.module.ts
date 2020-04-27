import {Module} from '@nestjs/common'
import {SocketModule} from './socket/socket.module'
import {LoggerModule} from './logger/logger.module'
import { ConfigModule } from './config/config.module';

@Module({
  imports: [SocketModule, LoggerModule, ConfigModule],
  controllers: [],
  providers: []
})
export class AppModule {
}
