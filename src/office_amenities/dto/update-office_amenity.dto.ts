import { IsString, IsOptional, Matches } from 'class-validator';

export class UpdateOfficeAmenityDto {
  @IsString()
  @IsOptional()
  readonly hospital_name?: string;

  @IsString()
  @IsOptional()
  readonly equipment?: string;

  @IsString()
  @IsOptional()
  readonly location?: string;

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
