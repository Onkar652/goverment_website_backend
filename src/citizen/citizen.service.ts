import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from './entities/citizen.entity';  
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { join } from 'path';
import { existsSync } from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CitizenService {
  constructor(
    @InjectRepository(Upload) 
    private citizenRepository: Repository<Upload>, 
  ) {}

  // Create a new citizen
  async create(createCitizenDto: CreateCitizenDto): Promise<Upload> {
    const citizen = this.citizenRepository.create(createCitizenDto);
    return await this.citizenRepository.save(citizen);
  }

  // Get all citizens
  async findAll(): Promise<Upload[]> {
    return await this.citizenRepository.find();
  }

  // Get a citizen by ID
  async findOne(id: number): Promise<Upload> {
    const citizen = await this.citizenRepository.findOne({ where: { id } });
    if (!citizen) {
      throw new HttpException(`Citizen with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
    return citizen;
  }

  // Update a citizen by ID
  async update(id: number, updateCitizenDto: UpdateCitizenDto): Promise<Upload> {
    await this.citizenRepository.update(id, updateCitizenDto);
    return this.findOne(id);
  }

  // Remove a citizen by ID
  async remove(id: number): Promise<void> {
    await this.citizenRepository.delete(id);
  }

  // Method to handle file download by citizen ID
  async downloadFile(id: number): Promise<string | null> {
    const citizen = await this.findOne(id);
    
    // Assuming `filePath` stores the file name or path relative to the server directory
    const filePath = join(__dirname, '..', 'uploads', String(citizen.filePath));

    if (existsSync(filePath)) {
      return filePath; // File found, return path to send in controller
    } else {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND); // Send a proper HTTP 404 error
    }
  }
}
