import { Injectable } from '@nestjs/common';
import {InitializeEnvDto} from '../dto/initialize-env.dto'

@Injectable()
export class EnvironmentService {
  initializeEnvironment({ language, socket }: InitializeEnvDto) {
    const clientId = socket.handshake.headers['client-id']
    socket.emit('events', `${clientId}: ${language} <<>> ${socket.id}`)
  }
}
