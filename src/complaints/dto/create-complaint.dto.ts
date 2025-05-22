import { IsString, IsPhoneNumber, IsNotEmpty } from 'class-validator';

// src/complaints/dto/create-complaint.dto.ts
export class CreateComplaintDto {
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_ne: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  problem: string;  // Ensure 'problem' is correctly named here
}
