import {Observable} from 'rxjs'
import {INestApplication, Logger} from '@nestjs/common'

export const handleError = (logger: Logger) => (err: any, caught: Observable<INestApplication>): Observable<INestApplication> => {
  logger.error(`A critical error: ${JSON.stringify(err, null, 2)}`)
  return caught
}
