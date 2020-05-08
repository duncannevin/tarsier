import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {TarsierLogger} from './logger/tarsier.logger'
import {from, Observable} from 'rxjs'
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators'
import {ServerConfig} from './config/server/server.config'
import {handleError} from './utils'
import {initializeDB} from './initialize.db'
import {MongoConfig} from './config/mongo/mongo.config'

function bootstrap() {
  const logger = new TarsierLogger()
  logger.setContext('bootstrap')

  initializeDB(new MongoConfig())
    .pipe(
      catchError(handleError(logger)),
      switchMap(() => {
        return from(NestFactory.create(AppModule))
      }),
      map(app => {
        return {
          app,
          serverConfig: app.get('ServerConfig') as ServerConfig
        }
      }),
      switchMap(({app, serverConfig}) => {
        return from(app.listen(serverConfig.PORT))
          .pipe(map(() => ({app, serverConfig})))
      })
    ).subscribe(({serverConfig}) => logger.log(`${serverConfig.NAME} listening on port ${serverConfig.PORT}`))
}

bootstrap()
