import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'Perumahan Griya Asri' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Perumahan modern dengan fasilitas lengkap' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Jl. Raya Bogor KM 30, Depok' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiPropertyOptional({ example: '<svg>...</svg>' })
  @IsOptional()
  @IsString()
  svgSiteplan?: string;
}
