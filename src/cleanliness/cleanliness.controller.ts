import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CleanlinessService } from './cleanliness.service';
import { CreateCleanlinessDto } from './dto/create-cleanliness.dto';

@Controller('cleanliness')
export class CleanlinessController {
  constructor(private readonly cleanlinessService: CleanlinessService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createCleanlinessDto: CreateCleanlinessDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.cleanlinessService.create(createCleanlinessDto, file);
  }

  @Delete(':id')
  async deleteCleanlinessRecord(@Param('id') id: string) {
    return this.cleanlinessService.remove(+id);
  }

  @Get(':id')
  async getCleanlinessRecord(@Param('id') id: string) {
    return this.cleanlinessService.findOne(+id);
  }

  @Get()
  async findAll() {
    return this.cleanlinessService.findAll();
  }
}
