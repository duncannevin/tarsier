import {Test, TestingModule} from '@nestjs/testing'
import {SocketGateway} from './socket.gateway'
import {LoggerModule} from '../logger/logger.module'

describe('Socket Controller', () => {
  let controller: SocketGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [SocketGateway]
    }).compile()

    controller = module.get<SocketGateway>(SocketGateway)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
