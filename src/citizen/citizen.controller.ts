import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, Res, HttpException, HttpStatus } from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync } from 'fs';

@Controller('citizens')
export class CitizenController {
  constructor(private readonly citizenService: CitizenService) {}

  // Create a citizen
  @Post()
  async create(@Body() createCitizenDto: CreateCitizenDto) {
    return this.citizenService.create(createCitizenDto);
  }

  // Get all citizens
  @Get()
  async findAll() {
    return this.citizenService.findAll();
  }

  // Get citizen by ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.citizenService.findOne(id);
  }

  // Update citizen by ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCitizenDto: UpdateCitizenDto) {
    return this.citizenService.update(id, updateCitizenDto);
  }

  // Remove citizen by ID
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.citizenService.remove(id);
  }

  // Upload file
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Where to store the files
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`; // Generate a unique filename
        cb(null, filename);
      }
    })
  }))
  async uploadFile(@UploadedFile() file) {
    return {
      message: 'File uploaded successfully!',
      filePath: `uploads/${file.filename}`,
      fileId: file.filename,  // Return the unique file ID (filename) here
    };
  }

  // Download file by ID (filename)
  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res) {
    const filePath = join(__dirname, '..', 'uploads', id); // Construct the file path

    // Check if the file exists before attempting to download
    if (!existsSync(filePath)) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }

    // Send the file to the client
    return res.sendFile(filePath); 
  }
}
