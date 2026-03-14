"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MallRepository = void 0;
const database_1 = require("../../../config/database");
class MallRepository {
    async findMalls(city, skip, take) {
        const where = {
            isActive: true,
            deletedAt: null,
            ...(city && { city }),
        };
        const [malls, total] = await Promise.all([
            database_1.prisma.mall.findMany({
                where,
                skip,
                take,
                orderBy: { name: 'asc' },
            }),
            database_1.prisma.mall.count({ where }),
        ]);
        return { malls, total };
    }
    async findById(id) {
        return await database_1.prisma.mall.findFirst({
            where: {
                id,
                isActive: true,
                deletedAt: null,
            },
        });
    }
    async findFloorsByMallId(mallId) {
        return await database_1.prisma.floor.findMany({
            where: {
                mallId,
                isActive: true,
                deletedAt: null,
            },
            orderBy: { floorNumber: 'asc' },
        });
    }
    async findStoresByMallId(mallId, floorId) {
        return await database_1.prisma.store.findMany({
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
    async searchStores(mallId, query) {
        return await database_1.prisma.store.findMany({
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
    async findStoreById(id) {
        return await database_1.prisma.store.findFirst({
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
exports.MallRepository = MallRepository;
//# sourceMappingURL=repository.js.map