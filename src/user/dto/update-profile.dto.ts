import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Budi Santoso', required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ example: '08123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
