import {Module} from '@nestjs/common'
import {SocketGateway} from './socket.gateway'
import {LoggerModule} from '../logger/logger.module'
import { SocketService } from './socket.service';

@Module({
  imports: [LoggerModule],
  providers: [SocketGateway, SocketService]
})
export class SocketModule {
}
