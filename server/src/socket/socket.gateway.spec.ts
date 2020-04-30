import {Test, TestingModule} from '@nestjs/testing'
import {SocketGateway} from './socket.gateway'
import {SocketService} from './socket.service'
import {LoggerModule} from '../logger/logger.module'

describe('Socket Controller', () => {
  let service: SocketGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [SocketGateway, SocketService]
    }).compile()

    service = module.get<SocketGateway>(SocketGateway)
  })

  afterEach(() => {
    service = null
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
