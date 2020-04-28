import { Injectable } from '@nestjs/common';
import {InitializeDto} from './dto/initialize.dto'

@Injectable()
export class SocketService {
  initializeEnvironment(initializeDto: InitializeDto) {
    return `>>> ${initializeDto.language}`
  }
}
