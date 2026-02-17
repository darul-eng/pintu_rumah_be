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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectQueryDto } from './dto/project-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new project (Admin only)' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects with pagination and search' })
  @ApiResponse({ status: 200, description: 'List of projects' })
  findAll(@Query() query: ProjectQueryDto) {
    return this.projectService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID with units' })
  @ApiResponse({ status: 200, description: 'Project details with units' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Get(':id/stats')
  @ApiOperation({ summary: 'Get unit statistics for a project' })
  @ApiResponse({ status: 200, description: 'Unit statistics by status' })
  getStats(@Param('id') id: string) {
    return this.projectService.getStats(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update project (Admin only)' })
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete project (Admin only)' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
