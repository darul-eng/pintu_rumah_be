import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectQueryDto } from './dto/project-query.dto';
import { PaginatedResult } from '../common/dto/pagination.dto';
import { Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data: dto,
    });
  }

  async findAll(query: ProjectQueryDto): Promise<PaginatedResult<Project>> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { location: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { units: true },
          },
        },
      }),
      this.prisma.project.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        units: {
          orderBy: { blockNumber: 'asc' },
        },
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    await this.findOne(id);

    return this.prisma.project.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.project.delete({
      where: { id },
    });
  }

  async getStats(id: string) {
    await this.findOne(id);

    const stats = await this.prisma.unit.groupBy({
      by: ['status'],
      where: { projectId: id },
      _count: true,
    });

    return stats.reduce(
      (acc, item) => {
        acc[item.status.toLowerCase()] = item._count;
        return acc;
      },
      { available: 0, booked: 0, sold: 0 } as Record<string, number>,
    );
  }
}
