import {Socket} from 'socket.io'
import {IsString} from 'class-validator'

export class JoinEnvDto {
  @IsString()
  environmentId: string
  socket?: Socket
}
