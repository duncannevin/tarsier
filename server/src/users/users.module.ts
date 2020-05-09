import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UsersService} from './users.service'
import {UsersController} from './users.controller'
import {UserEntity} from './user.entity'
import {ConfigModule} from '../config/config.module'
import {LoggerModule} from '../logger/logger.module'
import {JwtStrategy} from './jwt.strategy'
import {JwtModule} from '@nestjs/jwt'
import {AuthConfig} from '../config/auth/auth.config'

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([UserEntity], 'users'),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: AuthConfig) => ({
        secret: config.SECRET
      }),
      inject: [AuthConfig]
    })
  ],
  exports: [TypeOrmModule, UsersService, JwtModule],
  providers: [UsersService, JwtStrategy],
  controllers: [UsersController]
})
export class UsersModule {
}
