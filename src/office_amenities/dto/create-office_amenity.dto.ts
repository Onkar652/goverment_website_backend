import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class CreateOfficeAmenityDto {
  @IsString()
  @IsNotEmpty()
  readonly hospital_name: string;

  @IsString()
  @IsNotEmpty()
  readonly equipment: string;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsString()
  @IsOptional()
  @Matches(/^\+?[0-9]{1,3}[-\s]?[0-9]{6,12}$/, {
    message: 'Invalid phone number format',
  })
  readonly contact_number?: string;

  @IsString()
  @IsOptional()
  readonly additional_info?: string;
}
