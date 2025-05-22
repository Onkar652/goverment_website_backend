import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    private readonly firebaseService: FirebaseService,
  ) {}

  // Wrapper for firebase upload
  async uploadFileToFirebase(file: Express.Multer.File, folder: string) {
    return this.firebaseService.uploadFile(file, folder);
  }

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const newSurvey = this.surveyRepository.create(createSurveyDto);
    return this.surveyRepository.save(newSurvey);
  }

  async findAll(): Promise<Survey[]> {
    return this.surveyRepository.find();
  }

  async findOne(id: string): Promise<Survey> {
    const survey = await this.surveyRepository.findOneBy({ id });
    if (!survey) {
      throw new Error(`Survey with ID ${id} not found.`);
    }
    return survey;
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<Survey> {
    await this.surveyRepository.update(id, updateSurveyDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const survey = await this.findOne(id);
    if (survey.file_path) {
      await this.firebaseService.deleteFile(survey.file_path);
    }
    await this.surveyRepository.delete(id);
    return { message: `Survey with ID ${id} and its image deleted successfully.` };
  }

  async uploadImageToFirebase(id: string, file: Express.Multer.File): Promise<Survey> {
    const survey = await this.findOne(id);

    const { filePath, publicUrl } = await this.firebaseService.uploadFile(file, 'surveys');

    survey.file_path = filePath;
    survey.imag_url = publicUrl;

    return this.surveyRepository.save(survey);
  }
}
