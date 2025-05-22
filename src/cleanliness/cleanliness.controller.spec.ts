import { Test, TestingModule } from '@nestjs/testing';
import { CleanlinessController } from './cleanliness.controller';
import { CleanlinessService } from './cleanliness.service';

describe('CleanlinessController', () => {
  let controller: CleanlinessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CleanlinessController],
      providers: [CleanlinessService],
    }).compile();

    controller = module.get<CleanlinessController>(CleanlinessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
