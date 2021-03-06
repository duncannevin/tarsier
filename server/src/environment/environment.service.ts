import {Injectable} from '@nestjs/common'
import {Environment} from './environment'
import {EventEnum} from '../enum/event.enum'
import {JoinEnvDto} from '../dto/join-env.dto'
import {WsException} from '@nestjs/websockets'
import {TarsierSocket} from '../socket/interface/TarsierSocket.interface'

@Injectable()
export class EnvironmentService {
  private environments = new Map<string, Environment>()

  initializeEnvironment({socket}: { socket: TarsierSocket }) {
    const clientId = socket.user.id
    const environment = new Environment(clientId)

    this.environments[environment.id] = environment

    socket.emit(EventEnum.ENVIRONMENT, environment)
  }

  joinEnvironment({environmentId, socket}: JoinEnvDto) {
    const clientId = socket.handshake.headers['client-id']
    const environment: Environment = this.environments[environmentId]

    if (!environment) {
      throw new WsException('not exists')
    }

    environment.addAllowedClient(clientId)

    socket.emit(EventEnum.ENVIRONMENT, environment)
  }

  environmentExists(environmentId: string) {
    return this.environments.hasOwnProperty(environmentId)
  }
}
