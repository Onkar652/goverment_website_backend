import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CleanlinessActivity } from './entities/cleanliness.entity';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateCleanlinessDto } from './dto/create-cleanliness.dto';
import { UpdateCleanlinessDto } from './dto/update-cleanliness.dto';
import { Express } from 'express';

@Injectable()
export class CleanlinessService {
  constructor(
    @InjectRepository(CleanlinessActivity)
    private readonly cleanlinessRepository: Repository<CleanlinessActivity>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(createCleanlinessDto: CreateCleanlinessDto, file?: Express.Multer.File) {
  let filePath: string | undefined = undefined;
  let publicUrl: string | undefined = undefined;

  if (file) {
    const uploadResult = await this.firebaseService.uploadFile(file, 'uploads');
    filePath = uploadResult.filePath;
    publicUrl = uploadResult.publicUrl;
  }

  const cleanliness = this.cleanlinessRepository.create({
    ...createCleanlinessDto,
    file_path: filePath,
    imageUrl: publicUrl,
  });

  return this.cleanlinessRepository.save(cleanliness);
}


  async findAll(): Promise<CleanlinessActivity[]> {
    return this.cleanlinessRepository.find();
  }

  async findOne(id: number): Promise<CleanlinessActivity> {
    const record = await this.cleanlinessRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Cleanliness record with ID ${id} not found`);
    }
    return record;
  }

  async remove(id: number): Promise<{ message: string }> {
    const record = await this.findOne(id);

    if (record.file_path) {
      try {
        await this.firebaseService.deleteFile(record.file_path);
      } catch (error) {
        console.error(`Failed to delete Firebase file: ${record.file_path}`, error);
        throw new InternalServerErrorException('Error deleting file from Firebase');
      }
    }

    await this.cleanlinessRepository.remove(record);
    return { message: `Cleanliness record ${id} and its file have been deleted.` };
  }

 }

