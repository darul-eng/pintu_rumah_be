import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UnitStatus } from '@prisma/client';

interface SitemapUnitPayload {
  id: string;
  projectId: string;
  blockNumber: string;
  status: UnitStatus;
  type: string;
  price: number;
  color: string;
  posX?: number | null;
  posY?: number | null;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UnitGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sitemap:join')
  handleJoinProject(
    @MessageBody() projectId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    if (!projectId) {
      return;
    }
    client.join(projectId);
  }

  broadcastUnitUpdate(unit: {
    id: string;
    projectId: string;
    blockNumber: string;
    status: UnitStatus;
    type: string;
    price: number;
    posX?: number | null;
    posY?: number | null;
  }): void {
    const payload: SitemapUnitPayload = {
      id: unit.id,
      projectId: unit.projectId,
      blockNumber: unit.blockNumber,
      status: unit.status,
      type: unit.type,
      price: unit.price,
      color: this.getStatusColor(unit.status),
      posX: unit.posX ?? null,
      posY: unit.posY ?? null,
    };

    // Broadcast hanya ke client yang sedang melihat proyek terkait
    this.server.to(unit.projectId).emit('sitemap:update', payload);
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
