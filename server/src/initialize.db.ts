import { exec } from 'child_process'
import {MongoConfig} from './config/mongo/mongo.config'
import {bindCallback, Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

export function initializeDB({USERNAME, PASSWORD, USERS}: MongoConfig) {
  if (process.env.NODE_ENV === 'development') {
    const {DATABASE} = USERS
    const initCmd = `mongo --nodb --quiet --eval "var DATABASE='${DATABASE}', USERNAME='${USERNAME}', PASSWORD='${PASSWORD}'" db_scripts/init.js`
    const e = bindCallback(exec)
    return e(initCmd)
      .pipe(tap(console.log))
  }

  return new Observable<any>()
}
