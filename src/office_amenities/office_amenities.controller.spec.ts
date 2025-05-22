import { Test, TestingModule } from '@nestjs/testing';
import { OfficeAmenitiesController } from './office_amenities.controller';
import { OfficeAmenitiesService } from './office_amenities.service';

describe('OfficeAmenitiesController', () => {
  let controller: OfficeAmenitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeAmenitiesController],
      providers: [OfficeAmenitiesService],
    }).compile();

    controller = module.get<OfficeAmenitiesController>(OfficeAmenitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
