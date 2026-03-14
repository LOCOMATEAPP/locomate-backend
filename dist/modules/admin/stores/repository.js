"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminStoreRepository = void 0;
const database_1 = require("../../../config/database");
class AdminStoreRepository {
    async createStore(data) {
        return await database_1.prisma.store.create({
            data,
            include: {
                mall: true,
                floor: true,
            },
        });
    }
    async updateStore(id, data) {
        return await database_1.prisma.store.update({
            where: { id },
            data,
            include: {
                mall: true,
                floor: true,
            },
        });
    }
    async deleteStore(id) {
        await database_1.prisma.store.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async findStores(mallId, skip, take) {
        const where = {
            deletedAt: null,
            ...(mallId && { mallId }),
        };
        const [stores, total] = await Promise.all([
            database_1.prisma.store.findMany({
                where,
                skip,
                take,
                include: {
                    mall: true,
                    floor: true,
                },
                orderBy: { createdAt: 'desc' },
            }),
            database_1.prisma.store.count({ where }),
        ]);
        return { stores, total };
    }
    async findById(id) {
        return await database_1.prisma.store.findFirst({
            where: { id, deletedAt: null },
            include: {
                mall: true,
                floor: true,
            },
        });
    }
}
exports.AdminStoreRepository = AdminStoreRepository;
//# sourceMappingURL=repository.js.map