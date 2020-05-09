import {IsString} from 'class-validator'
import {TarsierSocket} from '../socket/interface/TarsierSocket.interface'

export class JoinEnvDto {
  @IsString()
  environmentId: string
  socket?: TarsierSocket
}
