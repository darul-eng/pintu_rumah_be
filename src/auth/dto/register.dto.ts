import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Budi Santoso' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '08123456789', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
