import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class ProjectQueryDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Search by name or location' })
  @IsOptional()
  @IsString()
  search?: string;
}
