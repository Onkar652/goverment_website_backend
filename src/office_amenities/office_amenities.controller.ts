import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OfficeAmenitiesService } from './office_amenities.service';
import { CreateOfficeAmenityDto } from './dto/create-office_amenity.dto';
import { UpdateOfficeAmenityDto } from './dto/update-office_amenity.dto';
import { OfficeAmenity } from './entities/office_amenity.entity';

@Controller('office-amenities')
export class OfficeAmenitiesController {
  constructor(private readonly officeAmenitiesService: OfficeAmenitiesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createOfficeAmenityDto: CreateOfficeAmenityDto) {
    return this.officeAmenitiesService.create(createOfficeAmenityDto);
  }

  @Get()
  findAll(): Promise<OfficeAmenity[]> {
    return this.officeAmenitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OfficeAmenity> {
    const officeAmenity = await this.officeAmenitiesService.findOne(id);
    if (!officeAmenity) {
      throw new Error(`OfficeAmenity with id ${id} not found`);
    }
    return officeAmenity;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfficeAmenityDto: UpdateOfficeAmenityDto) {
    return this.officeAmenitiesService.update(id, updateOfficeAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.officeAmenitiesService.remove(id);
  }
}
