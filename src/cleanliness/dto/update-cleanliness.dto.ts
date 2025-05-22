import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateCleanlinessDto {
  @IsString()
  @IsOptional()  // The activity field is optional for updates
  title?: string;

  @IsString()
  @IsOptional()  // The description field is optional for updates
  description?: string;

  @IsDateString()
  @IsOptional()  // The date field is optional for updates
  date?: string;

  @IsString()
  @IsOptional()  // The location field is optional for updates
  location?: string;


  @IsString()
  @IsOptional()  // The file_path field is optional for updates (for image path updates)
  file_path?: string;
}
