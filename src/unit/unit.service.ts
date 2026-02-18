import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UnitGateway } from './unit.gateway';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitQueryDto } from './dto/unit-query.dto';
import { PaginatedResult } from '../common/dto/pagination.dto';
import { Unit, UnitStatus } from '@prisma/client';

@Injectable()
export class UnitService {
  constructor(
    private prisma: PrismaService,
    private unitGateway: UnitGateway,
  ) {}

  async create(dto: CreateUnitDto): Promise<Unit> {
    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id: dto.projectId },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${dto.projectId} not found`);
    }

    // Check if block number already exists in project
    const existingUnit = await this.prisma.unit.findFirst({
      where: {
        projectId: dto.projectId,
        blockNumber: dto.blockNumber,
      },
    });

    if (existingUnit) {
      throw new BadRequestException(
        `Unit with block number ${dto.blockNumber} already exists in this project`,
      );
    }

    const unit = await this.prisma.unit.create({
      data: dto,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    this.unitGateway.broadcastUnitUpdate(unit);
    return unit;
  }

  async findAll(query: UnitQueryDto): Promise<PaginatedResult<Unit>> {
    const { page = 1, limit = 10, projectId, status, type, search } = query;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (projectId) {
      where.projectId = projectId;
    }

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = { contains: type, mode: 'insensitive' };
    }

    if (search) {
      where.blockNumber = { contains: search, mode: 'insensitive' };
    }

    const [data, total] = await Promise.all([
      this.prisma.unit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { blockNumber: 'asc' },
        include: {
          project: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      this.prisma.unit.count({ where }),
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

  async findOne(id: string): Promise<Unit> {
    const unit = await this.prisma.unit.findUnique({
      where: { id },
      include: {
        project: true,
        leads: {
          include: {
            buyer: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!unit) {
      throw new NotFoundException(`Unit with ID ${id} not found`);
    }

    return unit;
  }

  async update(id: string, dto: UpdateUnitDto): Promise<Unit> {
    await this.findOne(id);

    const unit = await this.prisma.unit.update({
      where: { id },
      data: dto,
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    this.unitGateway.broadcastUnitUpdate(unit);
    return unit;
  }

  async updateStatus(id: string, status: UnitStatus): Promise<Unit> {
    await this.findOne(id);

    const unit = await this.prisma.unit.update({
      where: { id },
      data: { status },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    this.unitGateway.broadcastUnitUpdate(unit);
    return unit;
  }

  async remove(id: string): Promise<void> {
    const unit = await this.findOne(id);

    // Check if unit has leads
    const hasLeads = await this.prisma.lead.count({
      where: { unitId: id },
    });

    if (hasLeads > 0) {
      throw new BadRequestException(
        'Cannot delete unit with existing leads. Remove leads first.',
      );
    }

    await this.prisma.unit.delete({
      where: { id },
    });
  }

  async getByProject(projectId: string): Promise<Unit[]> {
    return this.prisma.unit.findMany({
      where: { projectId },
      orderBy: { blockNumber: 'asc' },
    });
  }

  async getSitemapData(projectId: string) {
    const units = await this.prisma.unit.findMany({
      where: { projectId },
      select: {
        id: true,
        blockNumber: true,
        status: true,
        type: true,
        price: true,
        posX: true,
        posY: true,
      },
    });

    return units.map((unit) => ({
      ...unit,
      color: this.getStatusColor(unit.status),
    }));
  }

  async updatePosition(
    id: string,
    coords: { posX: number; posY: number },
  ): Promise<Unit> {
    await this.findOne(id);

    const unit = await this.prisma.unit.update({
      where: { id },
      data: {
        posX: coords.posX,
        posY: coords.posY,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    this.unitGateway.broadcastUnitUpdate(unit);
    return unit;
  }

  async clearPosition(id: string): Promise<Unit> {
    await this.findOne(id);

    const unit = await this.prisma.unit.update({
      where: { id },
      data: {
        posX: null,
        posY: null,
      },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    this.unitGateway.broadcastUnitUpdate(unit);
    return unit;
  }

  private getStatusColor(status: UnitStatus): string {
    switch (status) {
      case 'AVAILABLE':
        return '#22C55E'; // green
      case 'BOOKED':
        return '#F59E0B'; // amber
      case 'SOLD':
        return '#EF4444'; // red
      default:
        return '#9CA3AF'; // gray
    }
  }
}
