import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import {Server, Socket} from 'socket.io'
import {TarsierLogger} from '../logger/tarsier.logger'
import {Headers, UseFilters, UsePipes} from '@nestjs/common'
import {InitializeValidationPipe} from './pipe/initialize.validation.pipe'
import {WsExceptionFilter} from './filter/ws.exception.filter'
import {InitializeEnvDto} from '../dto/initialize-env.dto'
import {EnvironmentService} from '../environment/environment.service'

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private environmentService: EnvironmentService,
    private logger: TarsierLogger
  ) {
    logger.setContext('SocketGateway')
  }

  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage('initialize-environment')
  @UsePipes(new InitializeValidationPipe())
  async initializeEnvironment(
    @MessageBody() initializeDto: InitializeEnvDto,
    @ConnectedSocket() socket: Socket
  ) {
    this.logger.log(`[socketId-${socket.id}] Initialize Environment Triggered: ${JSON.stringify(initializeDto.language)}`)
    initializeDto.socket = socket
    this.environmentService.initializeEnvironment(initializeDto)
    // no return here, environment service will emit
  }

  afterInit(
    @ConnectedSocket() socket: Socket
  ) {
    this.logger.log(this.makeSocketLog('Init', socket));
  }

  handleDisconnect(
    @ConnectedSocket() socket: Socket
  ) {
    this.logger.log(this.makeSocketLog('Socket disconnect', socket));
  }

  handleConnection(
    @ConnectedSocket() socket: Socket,
    ..._: any[]
  ) {
    this.logger.log(this.makeSocketLog('Socket connected', socket));
  }

  private makeSocketLog(msg: string, socket: Socket) {
    let msgBase = `[socketId-${socket.id}] ${msg}`

    return prependClientId(msgBase, socket)

    function prependClientId(msg: string, socket: Socket) {
      return (socket.hasOwnProperty('handshake') && socket.handshake.hasOwnProperty('headers') ?
        `[clientId-${socket.handshake.headers['client-id']}]` :
        '') + msg
    }
  }
}
