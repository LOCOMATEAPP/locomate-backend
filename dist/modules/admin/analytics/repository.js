"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRepository = void 0;
const database_1 = require("../../../config/database");
class AnalyticsRepository {
    async getTotalUsers() {
        return await database_1.prisma.user.count({
            where: { isActive: true },
        });
    }
    async getActiveUsers(days = 30) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return await database_1.prisma.user.count({
            where: {
                isActive: true,
                updatedAt: { gte: date },
            },
        });
    }
    async getTotalStores() {
        return await database_1.prisma.store.count({
            where: { isActive: true, deletedAt: null },
        });
    }
    async getActiveOffers() {
        const now = new Date();
        return await database_1.prisma.offer.count({
            where: {
                isActive: true,
                deletedAt: null,
                startDate: { lte: now },
                endDate: { gte: now },
            },
        });
    }
    async getTotalClaims() {
        return await database_1.prisma.rewardClaim.count();
    }
    async getRedeemedClaims() {
        return await database_1.prisma.rewardClaim.count({
            where: { isRedeemed: true },
        });
    }
    async getParkingStats() {
        const [totalSessions, activeSessions, totalRevenue] = await Promise.all([
            database_1.prisma.parkingSession.count(),
            database_1.prisma.parkingSession.count({
                where: { endTime: null },
            }),
            database_1.prisma.parkingSession.aggregate({
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
    async getDailyStats(startDate, endDate) {
        const users = await database_1.prisma.user.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            _count: true,
        });
        const claims = await database_1.prisma.rewardClaim.groupBy({
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
    async getTopStores(limit = 10) {
        return await database_1.prisma.store.findMany({
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
    async getTopOffers(limit = 10) {
        return await database_1.prisma.offer.findMany({
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
exports.AnalyticsRepository = AnalyticsRepository;
//# sourceMappingURL=repository.js.map