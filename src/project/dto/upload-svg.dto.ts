import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UploadSvgDto {
  @ApiPropertyOptional({
    description: 'Default price for new units',
    example: 500000000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  defaultPrice?: number;

  @ApiPropertyOptional({
    description: 'Default type for new units',
    example: 'Type 36',
  })
  @IsOptional()
  @IsString()
  defaultType?: string;
}

export class SvgSyncResultDto {
  @ApiProperty({ description: 'Total IDs found in SVG' })
  totalIdsFound: number;

  @ApiProperty({ description: 'Number of new units created' })
  unitsCreated: number;

  @ApiProperty({ description: 'Number of existing units (already in DB)' })
  unitsExisting: number;

  @ApiProperty({ description: 'Number of orphan units (in DB but not in SVG)' })
  unitsOrphan: number;

  @ApiProperty({ description: 'List of new block numbers created' })
  createdBlockNumbers: string[];

  @ApiProperty({ description: 'List of orphan block numbers (not in new SVG)' })
  orphanBlockNumbers: string[];
}

export class UploadSvgResponseDto {
  @ApiProperty({ description: 'Success message' })
  message: string;

  @ApiProperty({ description: 'Project ID' })
  projectId: string;

  @ApiProperty({ description: 'Sync result details' })
  syncResult: SvgSyncResultDto;
}
