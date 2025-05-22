import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { Survey } from './entities/survey.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

   @Post()
  @UseInterceptors(FileInterceptor('image')) // 'image' is the FormData key for the file
  async createSurveyWithImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSurveyDto: CreateSurveyDto,
  ): Promise<Survey> {
    const { filePath, publicUrl } = await this.surveyService.uploadFileToFirebase(file, 'surveys');

    createSurveyDto.file_path = filePath;
    createSurveyDto.imag_url = publicUrl;

    return this.surveyService.create(createSurveyDto);
  }

  @Get()
  findAll(): Promise<Survey[]> {
    return this.surveyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Survey> {
    return this.surveyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSurveyDto: UpdateSurveyDto,
  ): Promise<Survey> {
    return this.surveyService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.surveyService.remove(id);
  }

  //new endpoint testiong uploading iamge
   @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.surveyService.uploadImageToFirebase(id, file);
  }
}
