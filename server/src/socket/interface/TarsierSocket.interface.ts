import {Socket} from 'socket.io'
import {User} from '../../dto/user.dto'

export interface TarsierSocket extends Socket {
  user: User
}

