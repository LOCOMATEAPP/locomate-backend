import { prisma } from '../../../config/database';
import { Store } from '@prisma/client';

export class AdminStoreRepository {
  async createStore(data: any): Promise<Store> {
    return await prisma.store.create({
      data,
      include: {
        mall: true,
        floor: true,
      },
    });
  }

  async updateStore(id: string, data: any): Promise<Store> {
    return await prisma.store.update({
      where: { id },
      data,
      include: {
        mall: true,
        floor: true,
      },
    });
  }

  async deleteStore(id: string): Promise<void> {
    await prisma.store.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findStores(mallId?: string, skip?: number, take?: number) {
    const where = {
      deletedAt: null,
      ...(mallId && { mallId }),
    };

    const [stores, total] = await Promise.all([
      prisma.store.findMany({
        where,
        skip,
        take,
        include: {
          mall: true,
          floor: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.store.count({ where }),
    ]);

    return { stores, total };
  }

  async findById(id: string): Promise<Store | null> {
    return await prisma.store.findFirst({
      where: { id, deletedAt: null },
      include: {
        mall: true,
        floor: true,
      },
    });
  }
}
