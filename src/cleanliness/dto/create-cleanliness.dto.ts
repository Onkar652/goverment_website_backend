import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateCleanlinessDto {
  @IsString()
  activity: string;

  @IsString()
  description: string;

  @IsDateString()
  activity_date: string;  // Assuming the `date` field stores a date in string format (ISO 8601)

  @IsString()
  @IsOptional()  // This field is optional
  location?: string;

  @IsString()
  @IsOptional()  // This field is optional
  file_path: string;
  imageUrl: string;
}
