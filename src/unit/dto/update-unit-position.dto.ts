import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class UpdateUnitPositionDto {
  @ApiProperty({
    description: 'Normalized X coordinate on sitemap image (0.0 - 1.0)',
    example: 0.45,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  posX!: number;

  @ApiProperty({
    description: 'Normalized Y coordinate on sitemap image (0.0 - 1.0)',
    example: 0.72,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  posY!: number;
}
