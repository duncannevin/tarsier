import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {JwtModule} from '@nestjs/jwt'
import {UsersService} from './users.service'
import {UsersController} from './users.controller'
import {UserEntity} from './user.entity'
import {ConfigModule} from '../config/config.module'
import {ServerConfig} from '../config/server/server.config'
import {LoggerModule} from '../logger/logger.module'
import {JwtStrategy} from './jwt.strategy'
import {AuthConfig} from '../config/auth/auth.config'

const authConfig = new AuthConfig()

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([UserEntity], 'users'),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (serverConfig: ServerConfig) => ({
        secret: authConfig.SECRET
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
