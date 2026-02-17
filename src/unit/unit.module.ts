import { Module } from '@nestjs/common';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { UnitGateway } from './unit.gateway';

@Module({
  controllers: [UnitController],
  providers: [UnitService, UnitGateway],
  exports: [UnitService, UnitGateway],
})
export class UnitModule {}
