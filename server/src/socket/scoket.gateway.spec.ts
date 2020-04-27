import {Test, TestingModule} from '@nestjs/testing'
import {SocketGateway} from './socket.controller'

describe('Socket Controller', () => {
  let controller: SocketGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocketGateway]
    }).compile()

    controller = module.get<SocketGateway>(SocketGateway)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
