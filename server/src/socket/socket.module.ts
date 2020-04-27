import {Module} from '@nestjs/common'
import {SocketGateway} from './socket.gateway'
import {LoggerModule} from '../logger/logger.module'

@Module({
  imports: [LoggerModule],
  providers: [SocketGateway]
})
export class SocketModule {
}
