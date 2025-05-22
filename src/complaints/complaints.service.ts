import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complaint } from './entities/complaint.entity';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';  // Assuming you have this DTO

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintsRepository: Repository<Complaint>,
  ) {}

  // Create a complaint
  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    const complaint = this.complaintsRepository.create(createComplaintDto); // Create new instance
    return this.complaintsRepository.save(complaint); // Save it to DB
  }

  // Fetch all complaints
  async findAll(): Promise<Complaint[]> {
    return this.complaintsRepository.find(); // Fetch all complaints
  }

  // Fetch one complaint by ID
  async findOne(id: string): Promise<Complaint> {
    const complaint = await this.complaintsRepository.findOne({ where: { id } });
    if (!complaint) {
      throw new NotFoundException(`Complaint with ID ${id} not found`); // Using NotFoundException
    }
    return complaint;
  }

  // Update a complaint
  async update(id: string, updateComplaintDto: UpdateComplaintDto): Promise<Complaint> {
    const complaint = await this.findOne(id); // Ensure the complaint exists
    await this.complaintsRepository.update(id, updateComplaintDto);
    return this.findOne(id); // Return updated complaint
  }

  // Remove a complaint
  async remove(id: string): Promise<void> {
    const complaint = await this.findOne(id); // Ensure the complaint exists
    await this.complaintsRepository.delete(id);
  }
}
