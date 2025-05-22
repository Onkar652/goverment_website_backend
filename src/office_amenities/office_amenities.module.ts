import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeAmenity } from './entities/office_amenity.entity';
import { OfficeAmenitiesController } from './office_amenities.controller';
import { OfficeAmenitiesService } from './office_amenities.service';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeAmenity])],
  controllers: [OfficeAmenitiesController],
  providers: [OfficeAmenitiesService],
})
export class OfficeAmenitiesModule {}
