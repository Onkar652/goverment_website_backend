import { Test, TestingModule } from '@nestjs/testing';
import { OfficeAmenitiesService } from './office_amenities.service';

describe('OfficeAmenitiesService', () => {
  let service: OfficeAmenitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfficeAmenitiesService],
    }).compile();

    service = module.get<OfficeAmenitiesService>(OfficeAmenitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
