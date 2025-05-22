import { Test, TestingModule } from '@nestjs/testing';
import { CleanlinessService } from './cleanliness.service';

describe('CleanlinessService', () => {
  let service: CleanlinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleanlinessService],
    }).compile();

    service = module.get<CleanlinessService>(CleanlinessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
