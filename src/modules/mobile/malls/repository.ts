import { prisma } from '../../../config/database';
import { Mall, Floor, Store } from '@prisma/client';

export class MallRepository {
  async findMalls(city?: string, skip?: number, take?: number) {
    const where = {
      isActive: true,
      deletedAt: null,
      ...(city && { city }),
    };

    const [malls, total] = await Promise.all([
      prisma.mall.findMany({
        where,
        skip,
        take,
        orderBy: { name: 'asc' },
      }),
      prisma.mall.count({ where }),
    ]);

    return { malls, total };
  }

  async findById(id: string): Promise<Mall | null> {
    return await prisma.mall.findFirst({
      where: {
        id,
        isActive: true,
        deletedAt: null,
      },
    });
  }

  async findFloorsByMallId(mallId: string): Promise<Floor[]> {
    return await prisma.floor.findMany({
      where: {
        mallId,
        isActive: true,
        deletedAt: null,
      },
      orderBy: { floorNumber: 'asc' },
    });
  }

  async findStoresByMallId(mallId: string, floorId?: string): Promise<Store[]> {
    return await prisma.store.findMany({
      where: {
        mallId,
        ...(floorId && { floorId }),
        isActive: true,
        deletedAt: null,
      },
      include: {
        floor: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async searchStores(mallId: string, query: string): Promise<Store[]> {
    return await prisma.store.findMany({
      where: {
        mallId,
        isActive: true,
        deletedAt: null,
        OR: [
          { name: { contains: query } },
          { category: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: {
        floor: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findStoreById(id: string): Promise<Store | null> {
    return await prisma.store.findFirst({
      where: {
        id,
        isActive: true,
        deletedAt: null,
      },
      include: {
        mall: true,
        floor: true,
      },
    });
  }
}
