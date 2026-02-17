import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { UnitStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateUnitDto } from './create-unit.dto';

export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['projectId'] as const),
) {
  @ApiPropertyOptional({ enum: UnitStatus })
  @IsOptional()
  @IsEnum(UnitStatus)
  status?: UnitStatus;
}
