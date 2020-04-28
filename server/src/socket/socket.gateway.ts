import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import {Server} from 'socket.io'
import {TarsierLogger} from '../logger/tarsier.logger'
import {InitializeDto} from './dto/initialize.dto'
import {UseFilters, UsePipes} from '@nestjs/common'
import {SocketService} from './socket.service'
import {InitializeValidationPipe} from './pipe/initialize.validation.pipe'
import {WsExceptionFilter} from './filter/ws.exception.filter'

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server

  constructor(
    private logger: TarsierLogger,
    private socketService: SocketService
  ) {
    logger.setContext('SocketGateway')
  }

  @UseFilters(new WsExceptionFilter())
  @SubscribeMessage('initialize-environment')
  @UsePipes(new InitializeValidationPipe())
  initializeEnvironment(
    @MessageBody() initializeDto: InitializeDto
  ) {
    this.logger.log(`Initialize Environment Triggered: ${JSON.stringify(initializeDto.language)}`)

    return this.socketService.initializeEnvironment(initializeDto)
  }
}
