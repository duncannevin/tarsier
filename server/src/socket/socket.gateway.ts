import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import {Client, Server, Socket} from 'socket.io'
import {TarsierLogger} from '../logger/tarsier.logger'
import {Req, UseFilters, UseGuards, UsePipes} from '@nestjs/common'
import {InitializeValidationPipe} from './pipe/initialize.validation.pipe'
import {WsExceptionFilter} from './filter/ws.exception.filter'
import {EnvironmentService} from '../environment/environment.service'
import {EventEnum} from '../enum/event.enum'
import {JoinEnvDto} from '../dto/join-env.dto'
import {EnvExistsPipe} from './pipe/env.exists.pipe'
import {WsAuthGuard} from '../guards/ws-auth.guard'
import {TarsierSocket} from './interface/TarsierSocket.interface'

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

  @UseGuards(WsAuthGuard)
  @UseFilters(WsExceptionFilter)
  @SubscribeMessage(EventEnum.INITIALIZE_ENVIRONMENT)
  @UsePipes(InitializeValidationPipe)
  initializeEnvironment(
    @ConnectedSocket() socket: TarsierSocket
  ) {
    this.logger.log(this.makeSocketLog('Initialize Environment', socket))
    this.environmentService.initializeEnvironment({socket})
    // no return here, environment service will emit
  }

  @UseGuards(WsAuthGuard)
  @UseFilters(WsExceptionFilter)
  @SubscribeMessage(EventEnum.JOIN_ENVIRONMENT)
  @UsePipes(EnvExistsPipe)
  joinEnvironment(
    @MessageBody() joinEnvDto: JoinEnvDto,
    @ConnectedSocket() socket: TarsierSocket
  ) {
    this.logger.log(this.makeSocketLog('Join Environment', socket))
    joinEnvDto.socket = socket
    this.environmentService.joinEnvironment(joinEnvDto)
    // no return here, environment service will emit
  }

  afterInit(
    @ConnectedSocket() socket: Socket
  ) {
    this.logger.log(this.makeSocketLog('Init', socket))
  }

  handleDisconnect(
    @ConnectedSocket() socket: Socket
  ) {
    this.logger.log(this.makeSocketLog('Socket disconnect', socket))
  }

  handleConnection(
    @ConnectedSocket() socket: Socket,
    ..._: any[]
  ) {
    this.logger.log(this.makeSocketLog('Socket connected', socket))
  }

  private makeSocketLog(msg: string, socket: Socket) {
    const msgBase = `[socketId-${socket.id}] ${msg}`

    return prependClientId(msgBase, socket)

    function prependClientId(msg: string, socket: Socket) {
      return (socket.hasOwnProperty('handshake') && socket.handshake.hasOwnProperty('headers') ?
        `[clientId-${socket.handshake.headers['client-id']}]` :
        '') + msg
    }
  }
}
