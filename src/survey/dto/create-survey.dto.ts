import { IsOptional, IsString } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  location: string;

  @IsString()
  hospital_name: string;

  @IsString()
  handled_problems: string;

  @IsOptional()
  @IsString()
  imag_url?: string;

  @IsOptional()
  @IsString()
  file_path?: string;
}
