import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {JwtModule} from '@nestjs/jwt'
import {UsersService} from './users.service'
import {UsersController} from './users.controller'
import {User} from './user.entity'
import {ConfigModule} from '../config/config.module'
import {ServerConfig} from '../config/server/server.config'
import {LoggerModule} from '../logger/logger.module'
import {JwtStrategy} from './jwt.strategy'
import {jwtConstants} from '../constants/jwt.constants'

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([User], 'users'),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (serverConfig: ServerConfig) => ({
        secret: jwtConstants.secret
      }),
      inject: [ServerConfig]
    }),
    ConfigModule
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {
}
