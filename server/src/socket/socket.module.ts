import {Module} from '@nestjs/common'
import {SocketGateway} from './socket.gateway'
import {LoggerModule} from '../logger/logger.module'
import {EnvironmentModule} from '../environment/environment.module'
import {EnvironmentService} from '../environment/environment.service'

@Module({
  imports: [LoggerModule, EnvironmentModule],
  providers: [SocketGateway, EnvironmentService]
})
export class SocketModule {
}
