import { prisma } from '../../../config/database';
import { Store, RouteHistory } from '@prisma/client';

export class NavigationRepository {
  async findStoreById(id: string): Promise<Store | null> {
    return await prisma.store.findFirst({
      where: {
        id,
        isActive: true,
        deletedAt: null,
      },
    });
  }

  async findStoresByMallId(mallId: string): Promise<Array<{ id: string; coordinateX: number; coordinateY: number }>> {
    return await prisma.store.findMany({
      where: {
        mallId,
        isActive: true,
        deletedAt: null,
      },
      select: {
        id: true,
        coordinateX: true,
        coordinateY: true,
      },
    });
  }

  async saveRouteHistory(userId: string, storeId: string, distance: number, duration: number): Promise<RouteHistory> {
    return await prisma.routeHistory.create({
      data: {
        userId,
        storeId,
        distance,
        duration,
      },
    });
  }

  async findHistory(userId: string, skip?: number, take?: number) {
    const where = { userId };

    const [history, total] = await Promise.all([
      prisma.routeHistory.findMany({
        where,
        skip,
        take,
        include: {
          store: {
            select: {
              id: true,
              name: true,
              category: true,
              logo: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.routeHistory.count({ where }),
    ]);

    return { history, total };
  }
}
