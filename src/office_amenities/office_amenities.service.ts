import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficeAmenity } from './entities/office_amenity.entity';
import { CreateOfficeAmenityDto } from './dto/create-office_amenity.dto';
import { UpdateOfficeAmenityDto } from './dto/update-office_amenity.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class OfficeAmenitiesService {
  constructor(
    @InjectRepository(OfficeAmenity)
    private officeAmenityRepository: Repository<OfficeAmenity>,
  ) {}

  // Create a new office amenity
  async create(createOfficeAmenityDto: CreateOfficeAmenityDto): Promise<OfficeAmenity> {
    const officeAmenity = this.officeAmenityRepository.create(createOfficeAmenityDto);
    return await this.officeAmenityRepository.save(officeAmenity);
  }

  // Get all office amenities
  async findAll(): Promise<OfficeAmenity[]> {
    return await this.officeAmenityRepository.find();
  }

  // Get one office amenity by id
  async findOne(id: string): Promise<OfficeAmenity | null> {
    return await this.officeAmenityRepository.findOne({ where: { id } });
  }

  // Update an office amenity by id
  async update(id: string, updateOfficeAmenityDto: UpdateOfficeAmenityDto): Promise<OfficeAmenity> {
    const updatedOfficeAmenity = await this.officeAmenityRepository.preload({
      id,
      ...updateOfficeAmenityDto,
    });
    if (!updatedOfficeAmenity) {
      throw new NotFoundException(`OfficeAmenity with id ${id} not found`);
    }
    return this.officeAmenityRepository.save(updatedOfficeAmenity);
  }

  // Delete an office amenity by id
  async remove(id: string): Promise<void> {
    const result = await this.officeAmenityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`OfficeAmenity with id ${id} not found`);
    }
  }
}
