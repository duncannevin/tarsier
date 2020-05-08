import {MiddlewareConsumer, Module, OnModuleInit} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {SocketModule} from './socket/socket.module'
import {LoggerModule} from './logger/logger.module'
import {ConfigModule} from './config/config.module'
import {UsersModule} from './users/users.module'
import {LoggerMiddleware} from './middleware/requestLogger.middleware'
import {EnvironmentModule} from './environment/environment.module'
import {EnvironmentService} from './environment/environment.service'
import {MongoConfig} from './config/mongo/mongo.config'

const mongoConfig: MongoConfig = new MongoConfig()

@Module({
  imports: [
    EnvironmentModule,
    SocketModule,
    LoggerModule,
    ConfigModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: mongoConfig.PORT,
      username: mongoConfig.USERNAME,
      password: mongoConfig.PASSWORD,
      synchronize: true,
      name: mongoConfig.USERS.NAME,
      database: mongoConfig.USERS.DATABASE,
      entities: mongoConfig.USERS.ENTITIES
    })
  ],
  controllers: [],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes('/')
  }
}
