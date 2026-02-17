import { ApiPropertyOptional } from '@nestjs/swagger';
import { UnitStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class UnitQueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filter by project ID' })
  @IsOptional()
  @IsString()
  projectId?: string;

  @ApiPropertyOptional({ enum: UnitStatus, description: 'Filter by status' })
  @IsOptional()
  @IsEnum(UnitStatus)
  status?: UnitStatus;

  @ApiPropertyOptional({ description: 'Filter by unit type' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Search by block number' })
  @IsOptional()
  @IsString()
  search?: string;
}
