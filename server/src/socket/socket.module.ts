import {Module} from '@nestjs/common'
import {SocketGateway} from './socket.gateway'
import {LoggerModule} from '../logger/logger.module'
import {EnvironmentModule} from '../environment/environment.module'
import {EnvironmentService} from '../environment/environment.service'
import {JwtStrategy} from '../users/jwt.strategy'
import {UsersModule} from '../users/users.module'
import {ConfigModule} from '../config/config.module'
import {JwtModule} from '@nestjs/jwt'

@Module({
  imports: [
    LoggerModule,
    EnvironmentModule,
    UsersModule,
    ConfigModule
  ],
  providers: [SocketGateway, EnvironmentService, JwtStrategy, UsersModule, JwtModule]
})
export class SocketModule {
}
