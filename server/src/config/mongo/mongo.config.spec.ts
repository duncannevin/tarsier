import { Test, TestingModule } from '@nestjs/testing';
import { MongoConfig } from './mongo.service';

describe('MongoService', () => {
  let service: MongoConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoConfig],
    }).compile();

    service = module.get<MongoConfig>(MongoConfig);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
