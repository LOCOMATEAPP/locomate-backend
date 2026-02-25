import { prisma } from '../../../config/database';
import { Mall, Floor } from '@prisma/client';

export class AdminMallRepository {
  async createMall(data: any): Promise<Mall> {
    return await prisma.mall.create({ data });
  }

  async updateMall(id: string, data: any): Promise<Mall> {
    return await prisma.mall.update({
      where: { id },
      data,
    });
  }

  async deleteMall(id: string): Promise<void> {
    await prisma.mall.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findMalls(skip?: number, take?: number) {
    const where = { deletedAt: null };

    const [malls, total] = await Promise.all([
      prisma.mall.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mall.count({ where }),
    ]);

    return { malls, total };
  }

  async findById(id: string): Promise<Mall | null> {
    return await prisma.mall.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async createFloor(data: any): Promise<Floor> {
    return await prisma.floor.create({ data });
  }

  async updateFloor(id: string, data: any): Promise<Floor> {
    return await prisma.floor.update({
      where: { id },
      data,
    });
  }

  async deleteFloor(id: string): Promise<void> {
    await prisma.floor.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findFloors(mallId: string) {
    return await prisma.floor.findMany({
      where: { mallId, deletedAt: null },
      orderBy: { floorNumber: 'asc' },
    });
  }
}
