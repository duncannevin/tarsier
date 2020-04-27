import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {TarsierLogger} from './logger/tarsier.logger'
import {from} from 'rxjs'
import {catchError, map, switchMap} from 'rxjs/operators'
import {ServerConfig} from './config/server/server.config'
import {handleError} from './utils'

function bootstrap() {
  const logger = new TarsierLogger()
  logger.setContext('bootstrap')

  from(NestFactory.create(AppModule))
    .pipe(
      catchError(handleError(logger)),
      map( app => {
        return {
          app,
          serverConfig: app.get('ServerConfig') as ServerConfig
        }
      }),
      switchMap(({ app, serverConfig }) => {
        return from(app.listen(serverConfig.PORT))
          .pipe(map(() => ({ app, serverConfig })))
      })
    ).subscribe(({ serverConfig }) => logger.log(`${serverConfig.NAME} listening on port ${serverConfig.PORT}`))
}

bootstrap()
