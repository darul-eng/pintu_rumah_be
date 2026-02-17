import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UnitStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateUnitDto {
  @ApiProperty({ example: 'uuid-project-id' })
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @ApiProperty({ example: 'A-01' })
  @IsNotEmpty()
  @IsString()
  blockNumber: string;

  @ApiProperty({ example: 450000000 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Type 36/72' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiPropertyOptional({ enum: UnitStatus, default: UnitStatus.AVAILABLE })
  @IsOptional()
  @IsEnum(UnitStatus)
  status?: UnitStatus;
}
