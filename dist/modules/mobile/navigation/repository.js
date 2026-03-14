"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationRepository = void 0;
const database_1 = require("../../../config/database");
class NavigationRepository {
    async findStoreById(id) {
        return await database_1.prisma.store.findFirst({
            where: {
                id,
                isActive: true,
                deletedAt: null,
            },
        });
    }
    async findStoresByMallId(mallId) {
        return await database_1.prisma.store.findMany({
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
    async saveRouteHistory(userId, storeId, distance, duration) {
        return await database_1.prisma.routeHistory.create({
            data: {
                userId,
                storeId,
                distance,
                duration,
            },
        });
    }
    async findHistory(userId, skip, take) {
        const where = { userId };
        const [history, total] = await Promise.all([
            database_1.prisma.routeHistory.findMany({
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
            database_1.prisma.routeHistory.count({ where }),
        ]);
        return { history, total };
    }
}
exports.NavigationRepository = NavigationRepository;
//# sourceMappingURL=repository.js.map