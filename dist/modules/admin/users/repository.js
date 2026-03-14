"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserRepository = void 0;
const database_1 = require("../../../config/database");
class AdminUserRepository {
    async findUsers(skip, take) {
        const [users, total] = await Promise.all([
            database_1.prisma.user.findMany({
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
            database_1.prisma.user.count(),
        ]);
        return { users, total };
    }
    async findById(id) {
        return await database_1.prisma.user.findUnique({
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
    async blockUser(id) {
        return await database_1.prisma.user.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async unblockUser(id) {
        return await database_1.prisma.user.update({
            where: { id },
            data: { isActive: true },
        });
    }
    async getUserActivity(userId) {
        const [claims, routes, savedItems, parkingSessions] = await Promise.all([
            database_1.prisma.rewardClaim.findMany({
                where: { userId },
                include: { offer: true },
                orderBy: { claimedAt: 'desc' },
                take: 10,
            }),
            database_1.prisma.routeHistory.findMany({
                where: { userId },
                include: { store: true },
                orderBy: { createdAt: 'desc' },
                take: 10,
            }),
            database_1.prisma.savedItem.findMany({
                where: { userId },
                include: { store: true, offer: true },
                orderBy: { createdAt: 'desc' },
                take: 10,
            }),
            database_1.prisma.parkingSession.findMany({
                where: { userId },
                orderBy: { startTime: 'desc' },
                take: 10,
            }),
        ]);
        return { claims, routes, savedItems, parkingSessions };
    }
}
exports.AdminUserRepository = AdminUserRepository;
//# sourceMappingURL=repository.js.map