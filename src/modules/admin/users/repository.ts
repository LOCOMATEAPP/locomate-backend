import { prisma } from '../../../config/database';
import { User } from '@prisma/client';

export class AdminUserRepository {
  async findUsers(skip?: number, take?: number) {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        include: {
          _count: {
            select: {
              rewardClaims: true,
              savedItems: true,
              routeHistory: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    return { users, total };
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            rewardClaims: true,
            savedItems: true,
            routeHistory: true,
            parkingSessions: true,
          },
        },
      },
    });
  }

  async blockUser(id: string): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async unblockUser(id: string): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
  }

  async getUserActivity(userId: string) {
    const [claims, routes, savedItems, parkingSessions] = await Promise.all([
      prisma.rewardClaim.findMany({
        where: { userId },
        include: { offer: true },
        orderBy: { claimedAt: 'desc' },
        take: 10,
      }),
      prisma.routeHistory.findMany({
        where: { userId },
        include: { store: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.savedItem.findMany({
        where: { userId },
        include: { store: true, offer: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      prisma.parkingSession.findMany({
        where: { userId },
        orderBy: { startTime: 'desc' },
        take: 10,
      }),
    ]);

    return { claims, routes, savedItems, parkingSessions };
  }
}
