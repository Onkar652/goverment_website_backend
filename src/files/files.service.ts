import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FirebaseService } from 'src/firebase/firebase.service';


@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(file: Express.Multer.File, createFileDto: CreateFileDto) {
    let filePath: string | undefined = undefined;
    let publicUrl: string | undefined = undefined;

    if(file){
      const uploadFileResult = await this.firebaseService.uploadFile(file, 'files');
      filePath = uploadFileResult.filePath;
      publicUrl = uploadFileResult.publicUrl;
    }
    const newFile = this.fileRepository.create({
      name: file.originalname,
      file_path: filePath,
      file_type: file.mimetype,
      file_size: file.size,
      description: createFileDto.description,
      filepublic_url: publicUrl,
    });

    return await this.fileRepository.save(newFile);
  }

  async findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  async findOne(id: number) {
    return this.fileRepository.findOneBy({ id });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    await this.fileRepository.update(id, updateFileDto);
    return this.findOne(id);
  }

 async remove(id: number) {
  const fileRecord = await this.findOne(id);
  if (!fileRecord) {
    throw new NotFoundException(`File #${id} not found`);
  }
  if (fileRecord.file_path) {
    await this.firebaseService.deleteFile(fileRecord.file_path);
  }
  await this.fileRepository.delete(id);
  return { message: `File #${id} deleted` };
}

}

