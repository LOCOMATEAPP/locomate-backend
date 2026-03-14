"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminMallRepository = void 0;
const database_1 = require("../../../config/database");
class AdminMallRepository {
    async createMall(data) {
        return await database_1.prisma.mall.create({ data });
    }
    async updateMall(id, data) {
        return await database_1.prisma.mall.update({
            where: { id },
            data,
        });
    }
    async deleteMall(id) {
        await database_1.prisma.mall.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async findMalls(skip, take) {
        const where = { deletedAt: null };
        const [malls, total] = await Promise.all([
            database_1.prisma.mall.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            database_1.prisma.mall.count({ where }),
        ]);
        return { malls, total };
    }
    async findById(id) {
        return await database_1.prisma.mall.findFirst({
            where: { id, deletedAt: null },
        });
    }
    async createFloor(data) {
        return await database_1.prisma.floor.create({ data });
    }
    async updateFloor(id, data) {
        return await database_1.prisma.floor.update({
            where: { id },
            data,
        });
    }
    async deleteFloor(id) {
        await database_1.prisma.floor.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async findFloors(mallId) {
        return await database_1.prisma.floor.findMany({
            where: { mallId, deletedAt: null },
            orderBy: { floorNumber: 'asc' },
        });
    }
}
exports.AdminMallRepository = AdminMallRepository;
//# sourceMappingURL=repository.js.map