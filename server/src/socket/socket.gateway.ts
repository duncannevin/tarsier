import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse
} from '@nestjs/websockets'
import {Server} from 'socket.io'
import {from, Observable} from 'rxjs'
import {delay, map} from 'rxjs/operators'
import {TarsierLogger} from '../logger/tarsier.logger'
import {InitializeDto} from './dto/initialize.dto'
import {UsePipes} from '@nestjs/common'
import {WsValidationPipe} from './pipe/ws.validation.pipe'

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private logger: TarsierLogger
  ) {
    logger.setContext('SocketGateway')
  }

  @SubscribeMessage('initialize-environment')
  @UsePipes(new WsValidationPipe())
  initializeEnvironment(@MessageBody() initializeDto: InitializeDto) {
    this.logger.log(`Initialize Environment Triggered: ${JSON.stringify(initializeDto)}`)

    return initializeDto
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<string>> {
    this.logger.log(`Events received a message ${data}`)
    return from([1, 2, 3]).pipe(
      delay(500),
      map(item => ({ event: 'events', data: `${item}: ${data}` }))
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    this.logger.log(`Identity received a message ${data}`)
    return data;
  }
}
