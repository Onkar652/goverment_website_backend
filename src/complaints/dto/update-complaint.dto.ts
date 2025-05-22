// src/complaints/dto/update-complaint.dto.ts
import { IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateComplaintDto {
  @IsOptional()
  @IsPhoneNumber()
  phone_ne?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  problem?: string;  
}
