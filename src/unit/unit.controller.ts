import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnitStatus } from '@prisma/client';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitQueryDto } from './dto/unit-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('units')
@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new unit (Admin only)' })
  @ApiResponse({ status: 201, description: 'Unit created successfully' })
  @ApiResponse({ status: 400, description: 'Block number already exists' })
  create(@Body() dto: CreateUnitDto) {
    return this.unitService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all units with filters and pagination' })
  @ApiResponse({ status: 200, description: 'List of units' })
  findAll(@Query() query: UnitQueryDto) {
    return this.unitService.findAll(query);
  }

  @Get('sitemap/:projectId')
  @ApiOperation({ summary: 'Get sitemap data for a project' })
  @ApiResponse({ status: 200, description: 'Sitemap unit data with colors' })
  getSitemapData(@Param('projectId') projectId: string) {
    return this.unitService.getSitemapData(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unit by ID with details' })
  @ApiResponse({ status: 200, description: 'Unit details' })
  @ApiResponse({ status: 404, description: 'Unit not found' })
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update unit (Admin only)' })
  @ApiResponse({ status: 200, description: 'Unit updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateUnitDto) {
    return this.unitService.update(id, dto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MARKETING', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update unit status (Marketing/Admin)' })
  @ApiResponse({ status: 200, description: 'Unit status updated' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: UnitStatus,
  ) {
    return this.unitService.updateStatus(id, status);
  }

  @Patch(':id/position')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MARKETING', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Update unit coordinates for sitemap (normalized 0.0 - 1.0, Marketing/Admin)',
  })
  @ApiResponse({ status: 200, description: 'Unit position updated' })
  updatePosition(
    @Param('id') id: string,
    @Body() dto: import('./dto/update-unit-position.dto').UpdateUnitPositionDto,
  ) {
    return this.unitService.updatePosition(id, dto);
  }

  @Patch(':id/position/clear')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MARKETING', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Clear unit coordinates on sitemap (Marketing/Admin)' })
  @ApiResponse({ status: 200, description: 'Unit position cleared' })
  clearPosition(@Param('id') id: string) {
    return this.unitService.clearPosition(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete unit (Admin only)' })
  @ApiResponse({ status: 200, description: 'Unit deleted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot delete unit with leads' })
  remove(@Param('id') id: string) {
    return this.unitService.remove(id);
  }
}
