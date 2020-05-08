import {Test, TestingModule} from '@nestjs/testing'
import {ServerConfig} from './server.config'
import * as config from 'config'

describe('Server.ConfigService', () => {
  let service: ServerConfig
  const mockConfigs = {host: 'localhost', port: '1111', name: 'therealtarsier'}
  let configSpy

  beforeEach(() => {
    configSpy = jest.spyOn(config, 'get')
    configSpy.mockImplementation(() => mockConfigs)
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerConfig]
    }).compile()

    service = module.get<ServerConfig>(ServerConfig)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should contain the correct values', () => {
    expect(service.HOST).toEqual(mockConfigs.host)
    expect(service.PORT).toEqual(Number(mockConfigs.port))
    expect(service.NAME).toEqual(mockConfigs.name)
  })

  it('should convert port to number', () => {
    expect(service.PORT).toBe(1111)
  })
})
