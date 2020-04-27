import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse} from '@nestjs/websockets'
import {Server} from 'socket.io'
import {from, Observable} from 'rxjs'
import {delay, map} from 'rxjs/operators'
import {TarsierLogger} from '../logger/tarsier.logger'

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private logger: TarsierLogger
  ) {
    logger.setContext('SocketGateway')
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    this.logger.log(`Events received a message ${data}`)
    return from([1, 2, 3]).pipe(
      delay(500),
      map(item => ({ event: 'events', data: item }))
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.logger.log(`Identity received a message ${data}`)
    return data;
  }
}
