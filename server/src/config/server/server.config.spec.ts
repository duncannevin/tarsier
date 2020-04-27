import { Test, TestingModule } from '@nestjs/testing';
import { Server.ConfigService } from './server.config.service';

describe('Server.ConfigService', () => {
  let service: Server.ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Server.ConfigService],
    }).compile();

    service = module.get<Server.ConfigService>(Server.ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
