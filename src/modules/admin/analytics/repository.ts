import { prisma } from '../../../config/database';

export class AnalyticsRepository {
  async getTotalUsers(): Promise<number> {
    return await prisma.user.count({
      where: { isActive: true },
    });
  }

  async getActiveUsers(days: number = 30): Promise<number> {
    const date = new Date();
    date.setDate(date.getDate() - days);

    return await prisma.user.count({
      where: {
        isActive: true,
        updatedAt: { gte: date },
      },
    });
  }

  async getTotalStores(): Promise<number> {
    return await prisma.store.count({
      where: { isActive: true, deletedAt: null },
    });
  }

  async getActiveOffers(): Promise<number> {
    const now = new Date();
    return await prisma.offer.count({
      where: {
        isActive: true,
        deletedAt: null,
        startDate: { lte: now },
        endDate: { gte: now },
      },
    });
  }

  async getTotalClaims(): Promise<number> {
    return await prisma.rewardClaim.count();
  }

  async getRedeemedClaims(): Promise<number> {
    return await prisma.rewardClaim.count({
      where: { isRedeemed: true },
    });
  }

  async getParkingStats() {
    const [totalSessions, activeSessions, totalRevenue] = await Promise.all([
      prisma.parkingSession.count(),
      prisma.parkingSession.count({
        where: { endTime: null },
      }),
      prisma.parkingSession.aggregate({
        _sum: { charges: true },
        where: { charges: { not: null } },
      }),
    ]);

    return {
      totalSessions,
      activeSessions,
      totalRevenue: totalRevenue._sum.charges || 0,
    };
  }

  async getDailyStats(startDate: Date, endDate: Date) {
    const users = await prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: true,
    });

    const claims = await prisma.rewardClaim.groupBy({
      by: ['claimedAt'],
      where: {
        claimedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: true,
    });

    return { users, claims };
  }

  async getTopStores(limit: number = 10) {
    return await prisma.store.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      include: {
        _count: {
          select: {
            routeHistory: true,
            savedItems: true,
          },
        },
      },
      orderBy: {
        routeHistory: {
          _count: 'desc',
        },
      },
      take: limit,
    });
  }

  async getTopOffers(limit: number = 10) {
    return await prisma.offer.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      include: {
        store: true,
        _count: {
          select: {
            rewardClaims: true,
          },
        },
      },
      orderBy: {
        claimCount: 'desc',
      },
      take: limit,
    });
  }
}
