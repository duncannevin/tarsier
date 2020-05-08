import {MiddlewareConsumer, Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {SocketModule} from './socket/socket.module'
import {LoggerModule} from './logger/logger.module'
import {ConfigModule} from './config/config.module'
import {UsersModule} from './users/users.module'
import {LoggerMiddleware} from './middleware/requestLogger.middleware'
import {EnvironmentModule} from './environment/environment.module'
import {EnvironmentService} from './environment/environment.service'

@Module({
  imports: [
    EnvironmentModule,
    SocketModule,
    LoggerModule,
    ConfigModule,
    UsersModule,
    // TODO: Move the common attributes to a shared constant once we start adding more databases
    // The TypeORM Module does not support multiple connections in ormconfig.json yet
    // Will need to define them all here for now :(
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: 27017,
      username: 'tarsier',
      password: 'tarsier',
      synchronize: true,
      name: 'users',
      database: 'tarsier_users',
      entities: ['dist/users/**/*.entity{.ts,.js}']
    })
  ],
    controllers: [],
    providers: [EnvironmentService],
    exports: [EnvironmentService]
  })
  export class AppModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware)
        .forRoutes('/');
    }
  }
