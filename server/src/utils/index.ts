import {Observable} from 'rxjs'
import {INestApplication, Logger} from '@nestjs/common'

export const handleError = (logger: Logger) => <T>(err: any, caught: Observable<T>): Observable<T> => {
  logger.error(`A critical error: ${JSON.stringify(err, null, 2)}`)
  return caught
}
